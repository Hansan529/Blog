import Link from "next/link";
import Image from "next/image";
import Darkmode from "./Darkmode";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 w-full bg-[#eee] dark:bg-[#111]">
      <article className="container mx-auto flex h-[80px] items-center justify-between px-[20px] xl:h-[100px]">
        <h1>
          <Link href="/">
            <Image src="/meta/logo_128.png" alt="Logo" width={50} height={50} />
            <span className="sr-only">홈페이지 로고</span>
          </Link>
        </h1>
        <Link href="/#project">프로젝트</Link>
        <Link href="/#info">정보글</Link>
        <div className="flex gap-2.5">
          <a href="https://github.com/Hansan529/Blog" target="_blank">
            <Image
              src="/ico/language/github-icon.svg"
              alt="소스코드"
              width={40}
              height={40}
            />
          </a>
          <Darkmode />
        </div>
      </article>
    </header>
  );
}
