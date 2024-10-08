import type { Metadata } from "next";
//import localFont from "next/font/local";
import "./globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";

import { Public_Sans } from "next/font/google";
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

const poppins = Public_Sans({
  weight: "400",
  subsets: ["latin"],
});

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${poppins.className}`}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
