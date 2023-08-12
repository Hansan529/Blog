import Link from "next/link";
import Image from "next/image";

interface List {
  [key: string]: string;
}

export default function Portfolio() {
  const list: List[] = [
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
    <div
      className="gridCenter container mx-auto gap-[30px]"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(350px, auto)" }}
    >
      {list.map((key, index) => (
        <>
          <Link
            href={`/portfolio/${Object.keys(key)}`}
            key={index}
            className="bg-gray-700 h-full w-full overflow-hidden rounded-xl border border-white"
          >
            <h2 className="p-[20px] text-center">{Object.values(key)}</h2>
            <Image
              className="h-[200px] w-full rounded-t-xl bg-white/20 object-contain"
              src={`/portfolio-img/${Object.keys(key)}.png`}
              alt={String(Object.values(key))}
              width={300}
              height={200}
              priority={true}
            />
          </Link>
        </>
      ))}
    </div>
  );
}
