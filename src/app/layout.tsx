import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/lib/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RydeX - Premium Vehicle Booking App",
  description: "A premium vehicle booking app built with Next.js, Tailwind CSS, and TypeScript. It allows users to easily book vehicles for their transportation needs.",
  keywords: ["vehicle booking", "rydex", "car rental", "premium vehicles"],
  authors: [{ name: "RydeX Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><Provider>{children}</Provider></body>
    </html>
  );
}
