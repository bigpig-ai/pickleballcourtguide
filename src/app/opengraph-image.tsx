import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Pickleball Court Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
            }}
          >
            📍
          </div>
          <div
            style={{
              fontSize: "48px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-1px",
            }}
          >
            Pickleball
            <span style={{ color: "#6ee7b7" }}>Guide</span>
          </div>
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "rgba(255,255,255,0.8)",
            maxWidth: "700px",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Find the Best Pickleball Courts Near You
        </div>
        <div
          style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.5)",
            marginTop: "16px",
          }}
        >
          pickleballcourtguide.com
        </div>
      </div>
    ),
    { ...size }
  );
}
