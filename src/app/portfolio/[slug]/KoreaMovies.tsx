import KoreaMovies from "./KoreaMovies.mdx";
import Image from "next/image";
import Link from "next/link";
import src from "@/../public/portfolio-img/Korea-movies.png";

export default function Page() {
  return (
    <>
      <KoreaMovies />
      <Link target="_blank" href="https://github.com/Hansan529/korea-movies">
        <img
          className="object-contain hover:opacity-75"
          src="/portfolio-img/Korea-movies.png"
          alt="KMDB 활용"
          width={1200}
          height={800}
          // priority={true}
        />
      </Link>
    </>
  );
}
