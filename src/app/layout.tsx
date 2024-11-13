import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import LayoutClient from "./Layout.client";
import { getServerSession } from "next-auth";
import SessionProvider from "../providers/SessionProvider";


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
  title: "Exclusive",
  description: "Exclusive shop",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <>
          <SessionProvider session={session}>
            <LayoutClient>{children}</LayoutClient>
          </SessionProvider>
        </>
      </body>
    </html>
  );
}
