import Image from "next/image";

export default function Introduce() {
  const data = [
    "html",
    "css",
    "sass",
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
    <article className="container mx-auto mt-[80px] space-y-[30px] rounded-3xl bg-[#fff]/5 p-[50px] text-center leading-loose">
      <h2 className="bg-gradient-to-r from-[skyblue] from-10% to-[pink] to-90% bg-clip-text p-[10px] text-5xl font-extrabold capitalize text-transparent">
        hxan frontend blog
      </h2>
      <p>프론트엔드 개발자가 되기 위해서 다양한 언어를 공부중입니다</p>
      <p>현재 사용 가능한 언어 및 라이브러리, 툴은 다음과 같습니다</p>
      <div
        className="gridCenter my-[30px] justify-center gap-[20px]"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(75px, auto)" }}
      >
        {data.map((lang, index) => (
          <div
            key={index}
            className="w-full text-center uppercase"
            title={lang}
          >
            <Image
              className="mx-auto w-[90%]  px-[10px]"
              src={`/ico/language/${lang}-icon.svg`}
              alt={lang}
              width={75}
              height={75}
              priority={true}
            />
            <span className="text-[12px]">{lang}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
