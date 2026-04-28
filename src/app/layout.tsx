import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAISON | Exceptional Properties",
  description: "A curated collection of the world's most extraordinary residences. Where architecture meets artistry.",
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "MAISON | Exceptional Properties",
    description: "A curated collection of the world's most extraordinary residences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfairDisplay.variable} ${inter.variable} antialiased`}
        style={{ backgroundColor: "#FFFFFF", color: "#1A1A1A" }}
      >
        {children}
      </body>
    </html>
  );
}
