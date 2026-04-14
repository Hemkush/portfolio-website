import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "AlphaDesk | Agentic Portfolio Intelligence",
  description:
    "AlphaDesk is an AI-powered portfolio manager workstation for market monitoring, research, risk review, and PM-ready reporting.",
};

export default function AlphaDeskProjectPage() {
  redirect("/alphadesk-showcase/index.html");
}
