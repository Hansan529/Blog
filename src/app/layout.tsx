import "./globals.css";
import { ReduxProvider } from "./redux/provider";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Providers from "./Providers";

export interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  generator: "Next.js",
  applicationName: "Next.js",
  creator: "Hansan",
  keywords: ["Dev Hxan", "NEXT.JS", "Typescript"],
  openGraph: {
    url: "https://hxan.net",
    type: "website",
    images: "/meta/og-image.png",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    images: "/meta/og-image.png",
  },
};

export default async function RootLayout({ children }: Props) {
  return (
    <html className="scroll-smooth">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          href="/meta/logo_32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/meta/logo_64.png"
          sizes="64x64"
        />
        <link
          rel="icon"
          type="image/png"
          href="/meta/logo_128.png"
          sizes="128x128"
        />
      </head>
      <body className="to-transpatrent bg-gradient-to-t from-[skyblue] to-[80px] font-sans text-black dark:bg-[#1e1e1e] dark:text-white">
        <ReduxProvider>
          <Providers>
            <Header />
            <main
              className="mx-auto w-9/10 space-y-[50px] py-10 duration-500 md:w-full md:py-20"
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
