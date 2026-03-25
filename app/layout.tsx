import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-brand',
});

export const metadata: Metadata = {
  title: "Rebuild The Man Protocol - Mental Strength System",
  description: "14-day action-driven mental reconstruction protocol. No theory, no fluff. Just focused action to rebuild your mind and reclaim your drive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${plusJakartaSans.variable}`}>
      <body className="min-h-screen bg-tactical-black text-gray-100 antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
