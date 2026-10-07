import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landscaping & Hardscape Projects",
  description: "Landscape design, paver patio, retaining wall and drainage projects by Brighton Road Landscaping across Montgomery County and the Main Line, PA.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
