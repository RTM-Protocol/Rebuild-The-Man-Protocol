import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Rebuild The Man - Mental Strength System",
  description: "14-day action-driven mental reconstruction protocol. No theory, no fluff. Just focused action to rebuild your mind and reclaim your drive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-tactical-black text-gray-100 antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
