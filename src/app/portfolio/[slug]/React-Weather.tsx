import 날씨 from "./React-Weather.mdx";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <article className="container mx-auto prose dark:prose-invert">
      <날씨 />
      <Link target="_blank" href='https://github.com/Hansan529/react-weather'>
      <Image
        className="object-contain hover:opacity-75"
        src="/portfolio-img/reactWeather.png"
        alt="react 날씨"
        width={1200}
        height={800}
        priority={true}
      />
      </Link>
    </article>
  );
}
