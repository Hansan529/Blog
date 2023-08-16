"use client";

import Link from "next/link";
import Image from "next/image";
import Pagination from "./Pagination";
import { useState } from "react";

interface List {
  [key: string]: string[];
}

export default function Portfolio() {
  const totalPost: List[] = [
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
  const [limit, setLimit] = useState<number>(8);
  const [page, setPage] = useState<number>(0);
  const result = totalPost.slice(page * limit, (page + 1) * limit);
  const [layout, setLayout] = useState<string>("grid");

  const gridLayout = `${
    layout === "grid"
      ? "md:gridCenter md:grid-cols-[repeat(auto-fit,_minmax(250px,auto))] md:gap-[30px] xl:grid-cols-[repeat(auto-fit,_minmax(350px,auto))] xl:space-y-0"
      : ""
  } `;

  return (
    <>
      <article
        className={`
        container relative mx-auto w-8/10 space-y-[30px] space-y-reverse pt-[10px]
        md:space-y-0 md:pt-0
        xl:w-full
        ${gridLayout}`}
      >
        <ul className="absolute -top-[20px] right-0 m-0 flex -translate-y-1/2 items-center gap-[10px] md:-top-[30px]">
          <li>
            <select
              name="showPost"
              className="rounded-xl border-none bg-transparent focus:border-[skyblue]"
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              <option selected value="4">
                4개씩 보기
              </option>
              <option selected value="8">
                8개씩 보기
              </option>
              <option value="12">12개씩 보기</option>
              <option value="20">20개씩 보기</option>
            </select>
          </li>
          <li>
            <i className="block h-[30px] w-[30px] bg-[url('/ico/grid.svg')] bg-cover bg-no-repeat text-[0px] dark:invert">
              <button
                onClick={() => setLayout("grid")}
                className="h-full w-full"
              >
                Grid
              </button>
            </i>
          </li>
          <li>
            <i className="block h-[30px] w-[30px] bg-[url('/ico/list.svg')] bg-cover bg-no-repeat text-[0px] dark:invert">
              <button
                onClick={() => setLayout("flex")}
                className="h-full w-full"
              >
                Flex
              </button>
            </i>
          </li>
        </ul>
        {result.map((key, index) => (
          <Link
            href={`/portfolio/${Object.keys(key)}`}
            key={index}
            className="block overflow-hidden rounded-xl bg-sky-200 outline outline-offset-4 outline-sky-200 dark:bg-gray-700 dark:shadow-[0_0_10px_1px_#fff]
              dark:outline-white xl:h-full xl:w-full"
          >
            <div className="relative">
              <div className="absolute left-[20px] top-1/2 -translate-y-1/2">
                {Object.values(key).flat()[1] ? (
                  <Image
                    src={`/ico/language/${
                      Object.values(key).flat()[1]
                    }-icon.svg`}
                    alt={Object.values(key).flat()[1]}
                    width={30}
                    height={30}
                  />
                ) : null}
              </div>
              <h2 className="p-[20px] text-center font-semibold">
                <span className="inline-block w-[75%] overflow-hidden text-ellipsis whitespace-nowrap align-middle">
                  {Object.values(key).flat()[0]}
                </span>
              </h2>
            </div>
            {layout === "grid" ? (
              <Image
                className="h-[200px] w-full rounded-t-xl bg-[#F1F0E8] object-contain dark:bg-white/20"
                src={`/portfolio-img/${Object.keys(key)}.png`}
                alt={String(Object.keys(key)[0])}
                width={300}
                height={200}
                priority={true}
              />
            ) : null}
          </Link>
        ))}
      </article>
      <div className="mx-auto w-[400px]">
        <Pagination
          totalPost={totalPost.length}
          limit={limit}
          btnLength={3}
          selectPage={setPage}
        />
      </div>
    </>
  );
}
