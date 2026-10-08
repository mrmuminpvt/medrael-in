import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Medrael AI — Be visible in the age of AI search",
  description:
    "Medrael AI analyzes your website and shows how prepared your business is for AI-powered search, recommendations, and discovery. Free analysis, no signup required.",
  applicationName: "Medrael AI",
  openGraph: {
    title: "Medrael AI — Be visible in the age of AI search",
    description:
      "Analyze your website and discover how prepared your business is for AI-powered search, recommendations, and discovery.",
    siteName: "Medrael AI",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
