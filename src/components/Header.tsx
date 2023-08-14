"use client";

import Link from "next/link";
import Image from "next/image";
import Darkmode from "./Darkmode";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 mb-[20px] w-full bg-[#eee] dark:bg-[#111] lg:mb-[40px] xl:mb-[100px]">
      <article className="container mx-auto flex h-[80px] w-[90%] items-center justify-between px-[20px] xl:h-[100px]">
        <h1>
          <Link href="/">
            <Image src="/meta/logo_128.png" alt="Logo" width={50} height={50} />
            <span className="sr-only">홈페이지 로고</span>
          </Link>
        </h1>
        <Darkmode />
      </article>
    </header>
  );
}
