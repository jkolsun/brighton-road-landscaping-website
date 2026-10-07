import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Commercial Snow Removal, Main Line PA | Brighton Road" },
  description: "Commercial snow plowing, salting, de-icing and sidewalk clearing for HOAs and businesses in Plymouth Meeting, Montgomery County and the Main Line.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
