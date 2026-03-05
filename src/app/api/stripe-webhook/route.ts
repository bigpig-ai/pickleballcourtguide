import { NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not configured");
  return new Stripe(key as string);
}

async function postToSlack(text: string) {
  const token = process.env.SLACK_BOT_TOKEN;
  const channel = process.env.SLACK_CHANNEL_ID; // e.g., C0AG0ALHMAT
  if (!token || !channel) {
    console.warn("Slack env not set, skipping Slack notification");
    return;
  }
  const resp = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ channel, text }),
  });
  const data = await resp.json();
  if (!data.ok) {
    console.error("Slack post failed", data);
  }
}

async function postToTelegram(text: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID; // e.g., 8523364675 (Vinay)
  if (!botToken || !chatId) {
    console.warn("Telegram env not set, skipping Telegram notification");
    return;
  }
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  const data = await resp.json();
  if (!data.ok) {
    console.error("Telegram post failed", data);
  }
}

export async function POST(request: Request) {
  const stripe = getStripe();
  const sig = request.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) {
    console.warn("Missing Stripe webhook signature or secret");
    return NextResponse.json({ received: true });
  }

  let event: Stripe.Event;
  try {
    const body = await request.text();
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err);
    return new NextResponse('Invalid signature', { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const plan = session.metadata?.plan || 'unknown';
        const courtName = session.metadata?.courtName || '';
        const courtCity = session.metadata?.courtCity || '';
        const email = session.customer_details?.email || session.metadata?.ownerEmail || '';
        const amount = (session.amount_total ?? 0) / 100;
        const text = `💸 Court claim completed (${plan}): ${courtName} — ${courtCity}. Customer: ${email}. Amount: $${amount.toFixed(2)}`;
        await Promise.all([postToSlack(text), postToTelegram(text)]);
        break;
      }
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const amount = (invoice.amount_paid ?? 0) / 100;
        const email = (invoice.customer_email as string) || '';
        const text = `✅ Subscription payment succeeded: $${amount.toFixed(2)} from ${email}`;
        await Promise.all([postToSlack(text), postToTelegram(text)]);
        break;
      }
      case 'customer.subscription.created': {
        const text = `🆕 New subscription created`;
        await Promise.all([postToSlack(text), postToTelegram(text)]);
        break;
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const amount = (invoice.amount_due ?? 0) / 100;
        const email = (invoice.customer_email as string) || '';
        const text = `⚠️ Payment failed: $${amount.toFixed(2)} from ${email}`;
        await Promise.all([postToSlack(text), postToTelegram(text)]);
        break;
      }
      default:
        // No-op for other events
        break;
    }
  } catch (err) {
    console.error('Error handling Stripe webhook event', event.type, err);
    return new NextResponse('Webhook handler error', { status: 500 });
  }

  return NextResponse.json({ received: true });
}
