import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
// import Navbar from "@/components/Navbar_OLD";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StartupHub - Find Your Next Big Project",
  description: "Connect with innovative startups and find your next project or co-founder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.className} antialiased bg-white dark:bg-gray-950`}>
        <Providers>
          {/* <Navbar /> */}
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
