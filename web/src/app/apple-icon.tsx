import { ImageResponse } from "next/og";

// iPhone/iPad-ikon (180×180) fra samme R som favicon.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#2F6FE0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="140" height="140" viewBox="0 0 64 64">
          <path
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="4.6"
            strokeLinejoin="miter"
            strokeLinecap="square"
            d="M19 47 V18 H39.5 a7 7 0 0 1 0 14 H26 M26 32 v9 h9 l7.5 6"
          />
        </svg>
      </div>
    ),
    size,
  );
}
