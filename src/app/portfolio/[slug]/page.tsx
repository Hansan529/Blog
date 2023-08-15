import { Metadata } from "next";
import Loading from "@/app/loading";
import dynamic from "next/dynamic";

interface Params {
  params: { slug: string };
}

export const metadata: Metadata = {
  title: "포트폴리오",
  description: "포트폴리오 목록",
};

export default function Page({ params }: Params) {
  // [slug] 값을 받아옴
  const decodedSlug = decodeURIComponent(params.slug);

  // '-'로 연결된 문장이면 배열로 나누고 반환
  const slug = decodedSlug.split("-");

  // 컴포넌트 명에 맞도록 각 첫 문자를 대문자로 변경해 로드함
  let result: string;
  result = `${slug[0].charAt(0).toUpperCase()}${slug[0].slice(1)}`;
  // '-' 가 있어 1번째 string이 있을 경우 추가
  if (slug[1])
    result = `${result}${slug[1].charAt(0).toUpperCase()}${slug[1].slice(1)}`;

  // 컴포넌트 로드
  const DynamicComponent = dynamic(() => import(`./${result}.tsx`), {
    loading: () => <Loading />,
    ssr: true,
  });

  return <DynamicComponent />;
}
