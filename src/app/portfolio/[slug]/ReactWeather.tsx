import ReactWeather from "./ReactWeather.mdx";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <ReactWeather />
      <Link target="_blank" href="https://github.com/Hansan529/react-weather">
        <Image
          className="object-contain hover:opacity-75"
          src="/portfolio-img/React-weather.png"
          alt="react 날씨"
          width={1200}
          height={800}
          priority={true}
        />
      </Link>
    </>
  );
}
