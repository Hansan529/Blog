import Image from "next/image";

export default function Loading() {
  return (
    <div className="flexCenter h-screen flex-col">
      <p>로딩 중입니다...</p>
      <Image src="/loading.svg" alt="로딩중" width={200} height={200} />
    </div>
  );
}
