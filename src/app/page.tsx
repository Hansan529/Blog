import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import type { Metadata } from "next";
import Information from "../components/Information";
import Profile from "../components/Profile";

export const metadata: Metadata = {
  title: "Hxan FrontEnd Blog",
  description: "프로젝트 및 개발 정보 홈페이지 입니다.",
};

export default async function Home() {
  return (
    <>
      <Profile />
      <Skills />
      <Portfolio />
      <Information />
    </>
  );
}
