import "./globals.css";
import { ReduxProvider } from "./redux/provider";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Providers from "./Providers";

export interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  generator: "Next.js",
  applicationName: "Next.js",
  creator: "Hansan",
  // colorScheme: "dark",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Hxan Portfolio",
    description: "포트폴리오 랜딩페이지",
    url: "https://hxan.net",
    siteName: "Hxan Developer Blog",
    images: "/images/og-image.png",
    locale: "ko_KR",
    type: "website",
  },
};

export default async function RootLayout({ children }: Props) {
  return (
    <html className="scroll-smooth">
      <body className="font-sans text-black dark:bg-[#1e1e1e] dark:text-white">
        <ReduxProvider>
          <Providers>
            <Header />
            <main className="space-y-[50px]">{children}</main>
            <footer className="flex h-[80px] items-center bg-gradient-to-t from-[skyblue] to-transparent to-60%"></footer>
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
