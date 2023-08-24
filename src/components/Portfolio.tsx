"use client";

import Link from "next/link";
import Image from "next/image";
import Pagination from "./Pagination";
import { useState } from "react";
import { totalPost } from "@/db/Data";

export default function Portfolio() {
  const [limit, setLimit] = useState<number>(8);
  const [page, setPage] = useState<number>(0);
  const result = totalPost.slice(page * limit, (page + 1) * limit);
  const [layout, setLayout] = useState<string>("grid");

  const gridLayout = `${
    layout === "grid"
      ? `md:gridCenter md:place-items-center md:grid-cols-[repeat(auto-fit,_minmax(250px,auto))] 
      xl:grid-cols-[repeat(auto-fit,_minmax(350px,auto))] xl:space-y-0`
      : "md:flex md:flex-col"
  } `;

  return (
    <article className="container relative mx-auto">
      <div id="project" className="sr-only -top-32">
        프로젝트 바로가기
      </div>
      <h2 className="mb-5 text-xl font-semibold drop-shadow-[3px_3px_2px_skyblue]">
        포트폴리오 및 프로젝트
      </h2>
      <ul className="my-5 flex items-center justify-end gap-[10px]">
        <li>
          <select
            name="showPost"
            className="rounded-xl border-none bg-transparent focus:border-[skyblue]"
            onChange={(e) => setLimit(Number(e.target.value))}
            value={limit}
          >
            <option value="4">4개씩 보기</option>
            <option value="8">8개씩 보기</option>
            <option value="12">12개씩 보기</option>
            <option value="20">20개씩 보기</option>
          </select>
        </li>
        <li>
          <i className="block h-[30px] w-[30px] bg-[url('/ico/grid.svg')] bg-cover bg-no-repeat dark:invert">
            <button onClick={() => setLayout("grid")} className="h-full w-full">
              <span className="sr-only">Grid</span>
            </button>
          </i>
        </li>
        <li>
          <i className="block h-[30px] w-[30px] bg-[url('/ico/list.svg')] bg-cover bg-no-repeat dark:invert">
            <button onClick={() => setLayout("flex")} className="h-full w-full">
              <span className="sr-only">Flex</span>
            </button>
          </i>
        </li>
      </ul>
      <div
        className={`mx-auto mb-5 w-8/10 space-y-[30px]
        md:gap-[30px] md:space-y-0 md:pt-0 ${gridLayout} xl:w-full `}
      >
        {result.map((key, index) => (
          <Link
            href={`/portfolio/${Object.keys(key)}`}
            key={index}
            className="block overflow-hidden rounded-xl bg-sky-200 outline outline-offset-4 outline-sky-200 focus:bg-sky-300 focus:outline-sky-800
              dark:bg-gray-700 dark:shadow-[0_0_10px_1px_#fff] dark:outline-white 
              xl:h-full xl:w-full"
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
                <span className="inline-block w-[70%] overflow-hidden text-ellipsis whitespace-nowrap align-middle">
                  {Object.values(key).flat()[0]}
                </span>
              </h2>
            </div>
            {layout === "grid" ? (
              <Image
                className="h-[200px] w-full rounded-t-xl bg-[#F1F0E8] object-contain dark:bg-white/20"
                src={`/portfolio-img/${Object.keys(key)[0]
                  .charAt(0)
                  .toUpperCase()}${Object.keys(key)[0].slice(1)}.png`}
                alt={String(Object.keys(key)[0])}
                width={300}
                height={200}
                priority={true}
              />
            ) : null}
          </Link>
        ))}
      </div>
      <div className="w-full">
        <Pagination
          totalPost={totalPost.length}
          limit={limit}
          btnLength={3}
          selectPage={setPage}
        />
      </div>
    </article>
  );
}
