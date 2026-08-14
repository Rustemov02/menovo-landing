import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Menovo - Məkanınız üçün ən sürətli və sadə rəqəmsal QR menyu",
  description:
    "Mürəkkəb kassa proqramlarına son. Menyunuzu dərhal yaradın, istədiyiniz vaxt anında yeniləyin və dərhal istifadəyə verin — münasib rüblük ödənişlə.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="az"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
