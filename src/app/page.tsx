import Introduce from "@/components/Introduce";
import Portfolio from "@/components/Portfolio";
import type { Metadata } from "next";
import Information from "../components/Information";

export const metadata: Metadata = {
  title: "Hxan FrontEnd Blog",
  description: "프로젝트 및 개발 정보 홈페이지 입니다.",

  openGraph: {
    url: "https://hxan.net",
    type: "website",
    title: "Hxan Blog",
    description: "개발자 한산의 블로그",
    images: [
      {
        url: "https://hxan.net/meta/og-image.png",
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hxan Blog",
    description: "개발자 한산의 블로그",
    images: "https://hxan.net/meta/og-image.png",
  },
};

export default async function Home() {
  return (
    <>
      <Introduce />
      <Portfolio />
      <Information />
    </>
  );
}
