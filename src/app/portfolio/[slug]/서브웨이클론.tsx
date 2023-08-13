import Link from "next/link";
import 서브웨이클론 from "./서브웨이클론.mdx";
import Image from "next/image";

export default function Page(){
    return (
      <>
        <서브웨이클론 />
        <Link
          target="_blank"
          href="https://github.com/Hansan529/tutorial/tree/main/HRD-step02_CSS/CSS_markup/subway"
        >
          <Image
            className="object-contain hover:opacity-75"
            src="/portfolio-img/서브웨이클론.png"
            alt="서브웨이 클론"
            width={1200}
            height={800}
            priority={true}
          />
        </Link>
      </>
    );
    
}