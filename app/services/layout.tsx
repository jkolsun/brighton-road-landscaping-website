import type { Metadata } from "next";

export const metadata: Metadata = { title: "Landscaping & Hardscaping Services" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
