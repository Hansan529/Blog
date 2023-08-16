"use client";

import Link from "next/link";
import Pagination from "@/components/Pagination";
import { useState } from "react";

export default function Information() {
  const list = [{ 테일윈드: ["내가 테일윈드를 사용하는 이유", "2023.08.16"] }];
  const [page, setPage] = useState<number>();
  return (
    <article className="container mx-auto">
      <h2>게시글</h2>
      {list.map((post, index) => (
        <div
          className="border-b border-black/50 py-[10px] dark:border-white/50"
          key={index}
        >
          <Link href={`/info/${Object.keys(post)}`}>
            <p className="mx-auto line-clamp-2 flex justify-between px-[20px]">
              <span>{Object.values(post).flat()[0]}</span>
              <span className="text-gray-400 dark:text-gray-200">
                {Object.values(post).flat()[1]}
              </span>
            </p>
          </Link>
        </div>
      ))}
      <Pagination
        className="pt-[50px]"
        totalPost={list.length}
        limit={8}
        btnLength={5}
        selectPage={setPage}
      />
    </article>
  );
}
