import Image from "next/image";

export default function Introduce() {
  const data = [
    "html",
    "css",
    "sass",
    "tailwindcss",
    "js",
    "ts",
    "nextjs",
    "react",
    "redux",
    "nodejs",
    "express",
    "mongodb",
    "git",
    "github",
  ];
  return (
    <article
      className="container mx-auto w-[90%] rounded-3xl p-[30px] text-center dark:bg-[#fff]/5 
      md:w-full
      xl:p-[50px]"
    >
      <div className="mb-[30px] space-y-[30px] leading-loose md:mb-[50px] md:space-y-[20px] md:leading-normal">
        <h2
          className="break-words bg-gradient-to-r from-[skyblue] from-10% to-[pink] to-90% bg-clip-text p-[10px] text-4xl font-extrabold capitalize text-transparent 
          md:text-5xl
          xl:text-6xl"
        >
          hxan frontend blog
        </h2>
        <p className="md:text-md break-keep text-sm xl:text-xl">
          프론트엔드 개발자가 되기 위해서 다양한 언어를 공부중입니다
        </p>
        <p className="md:text-md break-keep text-sm xl:text-xl">
          현재 사용 가능한 언어 및 라이브러리, 툴은 다음과 같습니다
        </p>
      </div>
      <div
        className="gridCenter mb-[30px] justify-center gap-[20px]"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(75px, auto)" }}
      >
        {data.map((lang, index) => (
          <div
            key={index}
            className="w-full text-center uppercase"
            title={lang}
          >
            <Image
              className={`mx-auto w-[50px] px-[10px] drop-shadow-[0_0px_5px_rgba(255,255,255,0.3)] xl:w-[90%] ${
                lang === "express" ? "dark:invert" : ""
              }`}
              src={`/ico/language/${lang}-icon.svg`}
              alt={lang}
              width={75}
              height={75}
              priority={true}
            />
            <span className="text-[12px] md:text-sm">{lang}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
