import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Sora } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/pulse/site-shell";

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pulse-manila-2026.vercel.app"),
  title: {
    default: "Pulse Manila 2026",
    template: "%s | Pulse Manila 2026",
  },
  description:
    "Pulse is a mobile-first companion for the Kiwanis International Convention in Manila, built to make schedules, updates, and room information fast to access on the floor.",
  applicationName: "Pulse Manila 2026",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Pulse",
  },
  openGraph: {
    title: "Pulse Manila 2026",
    description:
      "Simple convention access for schedules, updates, rooms, and ASPAC highlights.",
    siteName: "Pulse Manila 2026",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pulse Manila 2026",
    description:
      "A practical convention companion for schedules, updates, and room lookup.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c7a60",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${sourceSans.variable} antialiased`}
      >
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
