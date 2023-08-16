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
      <body className="to-transpatrent bg-gradient-to-t from-[skyblue] to-[80px] font-sans text-black dark:bg-[#1e1e1e] dark:text-white">
        <ReduxProvider>
          <Providers>
            <Header />
            <main
              className="mx-auto w-9/10 space-y-[50px] py-[80px] md:w-full"
              style={{ minHeight: "calc(100vh - 100px)" }}
            >
              {children}
            </main>
            {/* <footer className="fixed bottom-0 -z-50 flex h-[80px] w-full items-center bg-gradient-to-t from-[skyblue] to-transparent to-60%"></footer> */}
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
