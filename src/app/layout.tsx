import "./globals.css";
import { ReduxProvider } from "./redux/provider";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

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
          <header className="sticky top-0 z-10 mb-[20px] w-full bg-gradient-to-b from-[lightblue]/80 to-transparent lg:mb-[40px] xl:mb-[100px]">
            <article className="container mx-auto flex h-[80px] w-[90%] items-center xl:h-[100px] xl:w-full">
              <h1>
                <Link href="/">
                  <Image
                    src="/meta/logo_128.png"
                    alt="Logo"
                    width={50}
                    height={50}
                  />
                  <span className="sr-only">홈페이지 로고</span>
                </Link>
              </h1>
            </article>
          </header>
          <main className="space-y-[50px]">{children}</main>
          <footer className="flex h-[80px] items-center bg-gradient-to-t from-[skyblue] to-transparent to-60%"></footer>
        </ReduxProvider>
      </body>
    </html>
  );
}
