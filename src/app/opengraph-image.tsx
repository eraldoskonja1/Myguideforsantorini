import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background:
            "linear-gradient(135deg, #003E6B 0%, #0077CC 55%, #00AAFF 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="38" height="38" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="22" r="20" stroke="white" strokeWidth="1.5" fill="none" strokeDasharray="100 20" />
              <ellipse cx="14" cy="26" rx="10" ry="7" fill="white" opacity="0.5" />
              <circle cx="10" cy="20" r="4" fill="#F5A623" />
              <rect x="19" y="18" width="4" height="8" fill="white" rx="0.5" />
              <path d="M19 18 Q21 14 23 18" fill="rgba(255,255,255,0.4)" />
              <rect x="26" y="16" width="8" height="10" fill="white" rx="0.5" />
              <path d="M26 16 Q30 10 34 16" fill="rgba(255,255,255,0.4)" />
              <path d="M10 36 Q24 28 38 36" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              color: "white",
              letterSpacing: -0.5,
            }}
          >
            MyGuide for Santorini
          </div>
        </div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.15,
            maxWidth: 880,
          }}
        >
          Discover Santorini with Local Experts
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            color: "rgba(255,255,255,0.82)",
            maxWidth: 760,
          }}
        >
          Private Tours · Airport Transfers · Taxi Services
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 18,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Your Journey, Our Passion
        </div>
      </div>
    ),
    { ...size }
  );
}
