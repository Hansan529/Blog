import Image from "next/image";

interface Type {
  [key: string]: string[];
}

export default function Page({
  markup,
  style,
  script,
  db,
  state,
  server,
}: Type) {
  const language = (type: string[]): JSX.Element => {
    return (
      <div className="relative empty:before:text-red-500 empty:before:content-['X']">
        {type
          ? type.map((name, index) => (
              <Image
                key={index}
                className={`mx-auto mb-5 object-contain ${
                  name === "express" ? "dark:invert" : ""
                }`}
                title={name}
                alt={name}
                src={`/ico/language/${name}-icon.svg`}
                width={30}
                height={30}
                priority={true}
              />
            ))
          : null}
      </div>
    );
  };
  return (
    <div className="not-prose mt-[20px] grid grid-cols-3 gap-5 text-center">
      <div className="space-y-5">
        <h3>마크업</h3>
        {language(markup)}
      </div>
      <div className="space-y-5">
        <h3>스타일</h3>
        {language(style)}
      </div>
      <div className="space-y-5">
        <h3>스크립트</h3>
        {language(script)}
      </div>
      <div className="space-y-5">
        <h3>데이터베이스</h3>
        {language(db)}
      </div>
      <div className="space-y-5">
        <h3>상태 관리</h3>
        {language(state)}
      </div>
      <div className="space-y-5">
        <h3>서버</h3>
        {language(server)}
      </div>
    </div>
  );
}
