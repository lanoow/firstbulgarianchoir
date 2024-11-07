import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const font = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "First Bulgarian Choir"
};

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }>
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const {
    children
  } = props;

  return (
    <html lang={locale}>
      <body className={`${font.className} antialiased`}>
        <NextTopLoader
          color="#000"
          showSpinner
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
