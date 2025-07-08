import type { Metadata } from "next";
import { Arimo, Merriweather } from "next/font/google";
import "./globals.css";

const arimo = Arimo({
  variable: "--font-arimo",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "One Day Forms",
  description: "App for forms that (was supposed to be) created in single day!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${arimo.variable} antialiased`}>{children}</body>
    </html>
  );
}
