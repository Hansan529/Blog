import Link from "next/link";
import Image from "next/image";

interface List {
  [key: string]: string[];
}

export default function Portfolio() {
  const list: List[] = [
    // { 블로그: "Blog (Dev)" },
    { "daily-ui": ["Daily UI 100 (Reference)", "ts"] },
    { "react-weather": ["React Weather (Dev)", "react"] },
    { wetube: ["Wetube (Dev)", "nodejs"] },
    { "applewallet-clone": ["Apple Wallet (Reference)", "js"] },
    { lgdisplay: ["LG Display (Referenece)", "js"] },
    { "wwf-clone": ["WWF (Clone)", "html"] },
    { "hollys-clone": ["Hollys (Clone)", "html"] },
    { "nxweb-clone": ["NXweb (Clone)", "html"] },
    { "northface-clone": ["NorethFace (Clone)", "html"] },
    { "subway-clone": ["Subway (Clone)", "html"] },
    { "kokoatalk-clone": ["KokoaTalk (Clone)", "html"] },
  ];

  return (
    <article
      className="xl:gridCenter container mx-auto w-8/10 space-y-[40px] 
      xl:w-full xl:gap-[30px] xl:space-y-0"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, auto)",
      }}
    >
      {list.map((key, index) => (
        <Link
          href={`/portfolio/${Object.keys(key)}`}
          key={index}
          className="block overflow-hidden rounded-xl bg-sky-200 shadow-[0_0_10px_1px_#fff] outline outline-offset-4 outline-sky-200 dark:bg-gray-700
            dark:outline-white xl:h-full xl:w-full"
        >
          <div className="relative">
            <div className="absolute left-[20px] top-1/2 -translate-y-1/2">
              <Image
                src={`/ico/language/${Object.values(key).flat()[1]}-icon.svg`}
                alt={Object.values(key).flat()[1]}
                width={30}
                height={30}
              />
            </div>
            <h2 className="p-[20px] text-center font-semibold">
              <span className="inline-block w-[75%] overflow-hidden text-ellipsis whitespace-nowrap align-middle">
                {Object.values(key).flat()[0]}
              </span>
            </h2>
          </div>
          <Image
            className="h-[200px] w-full rounded-t-xl bg-[#F1F0E8] object-contain dark:bg-white/20"
            src={`/portfolio-img/${Object.keys(key)}.png`}
            alt={String(Object.keys(key)[0])}
            width={300}
            height={200}
            priority={true}
          />
        </Link>
      ))}
    </article>
  );
}
