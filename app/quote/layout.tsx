import type { Metadata } from "next";

export const metadata: Metadata = { title: "Request a Free Quote" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
