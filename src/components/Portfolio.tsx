import Link from "next/link";
import Image from "next/image";

interface List {
  [key: string]: string;
}

export default function Portfolio() {
  const list: List[] = [
    // { 블로그: "Blog (Dev)" },
    { "daily-ui": "Daily UI 100 (Reference)" },
    { "react-weather": "React Weather (Dev)" },
    { wetube: "Wetube (Dev)" },
    { "apple-wallet": "Apple Wallet (Reference)" },
    { "lg-display": "LG Display (Referenece)" },
    { wwf: "WWF (Clone)" },
    { hollys: "Hollys (Clone)" },
    { nxweb: "NXweb (Clone)" },
    { northface: "NorethFace (Clone)" },
    { 서브웨이클론: "Subway (Clone)" },
    { 카카오톡클론: "KokoaTalk (Clone)" },
  ];
  return (
    <article
      className="w-8/10 xl:gridCenter container mx-auto space-y-[40px] 
      xl:w-full xl:gap-[30px] xl:space-y-0"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, auto)",
      }}
    >
      {list.map((key, index) => (
        <>
          <Link
            href={`/portfolio/${Object.keys(key)}`}
            key={index}
            className="bg-sky-200 dark:bg-gray-700 outline-sky-200 block overflow-hidden rounded-xl shadow-[0_0_10px_1px_#fff] outline outline-offset-4
            dark:outline-white xl:h-full xl:w-full"
          >
            <h2 className="p-[20px] text-center font-semibold">
              {Object.values(key)}
            </h2>
            <Image
              className="h-[200px] w-full rounded-t-xl bg-[#F1F0E8] object-contain dark:bg-white/20"
              src={`/portfolio-img/${Object.keys(key)}.png`}
              alt={String(Object.values(key))}
              width={300}
              height={200}
              priority={true}
            />
          </Link>
        </>
      ))}
    </article>
  );
}
