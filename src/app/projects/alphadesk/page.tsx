import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AlphaDesk | Agentic Portfolio Intelligence",
  description:
    "AlphaDesk is an AI-powered portfolio manager workstation for market monitoring, research, risk review, and PM-ready reporting.",
};

export default function AlphaDeskProjectPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#050810" }}>
      <iframe
        src="/alphadesk-showcase/index.html"
        title="AlphaDesk Showcase"
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
          display: "block",
        }}
      />
    </main>
  );
}
