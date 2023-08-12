import "./globals.css";
import { ReduxProvider } from "./redux/provider";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  generator: "Next.js",
  applicationName: "Next.js",
  creator: "Hansan",
  colorScheme: "dark",
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
    <html>
      <body className="font-sans">
        <ReduxProvider>
          <header className="sticky top-0 mb-[100px] w-full bg-gradient-to-b from-[lightblue]/80 to-transparent">
            <section className="container mx-auto flex h-[100px] items-center">
              <h1 className="text-[0]">
                <Link href="/">
                  <Image
                    src="/meta/logo_128.png"
                    alt="Logo"
                    width={50}
                    height={50}
                  />
                  홈페이지 로고
                </Link>
              </h1>
            </section>
          </header>
          <main className="space-y-[50px]">{children}</main>
          <footer className="flex h-[80px] items-center bg-gradient-to-t from-[skyblue] to-transparent to-60%"></footer>
        </ReduxProvider>
      </body>
    </html>
  );
}
