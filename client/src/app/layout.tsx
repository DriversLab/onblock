import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClientProvider } from "@/lib/providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "OnBlock",
  description: "Onboarding people to Web 3 in Telegram and Ton Ecosystem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient`}
      >
        <ClientProvider>
        {children}
        </ClientProvider>
      </body>
    </html>
  );
}
