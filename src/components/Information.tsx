"use client";

import Link from "next/link";
import Pagination from "@/components/Pagination";
import { useState } from "react";
import { info } from "@/db/Data";

export default function Information() {
  const [page, setPage] = useState<number>();
  return (
    <article className="container relative mx-auto">
      <div id="info" className="sr-only -top-32">
        정보글 바로가기
      </div>
      <h2 className="mb-5 text-xl font-semibold drop-shadow-[3px_3px_2px_skyblue]">
        게시글
      </h2>
      {info.map((post, index) => (
        <div
          className="border-b border-black/50 py-[10px] dark:border-white/50"
          key={index}
        >
          <Link href={`/info/${Object.keys(post)}`}>
            <p className="mx-auto line-clamp-2 flex justify-between px-[20px]">
              <span className="line-clamp-2">
                {Object.values(post).flat()[0]}
              </span>
              <span className="text-gray-400 dark:text-gray-200">
                {Object.values(post).flat()[1]}
              </span>
            </p>
          </Link>
        </div>
      ))}
      <Pagination
        className="pt-[50px]"
        totalPost={info.length}
        limit={8}
        btnLength={5}
        selectPage={setPage}
      />
    </article>
  );
}
