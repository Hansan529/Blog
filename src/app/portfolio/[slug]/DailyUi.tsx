import DailyUi from "./DailyUi.mdx";
import Link from "next/link";
import Image from "next/image";

export default function Page(){
    return (
      <>
        <DailyUi />
        <Link target="_blank" href="https://github.com/Hansan529/daily-ui-100">
          <Image
            className="object-contain hover:opacity-75"
            src="/portfolio-img/Daily-ui.png"
            alt="react 날씨"
            width={1200}
            height={800}
            priority={true}
          />
        </Link>
      </>
    );
}