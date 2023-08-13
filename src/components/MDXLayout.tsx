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
      <div className="empty:before:text-red-500 relative table-cell align-middle empty:before:content-['X']">
        {type
          ? type.map((name, index) => (
              <Image
                key={index}
                className={`mx-auto object-contain ${
                  name === "express" ? "dark:invert" : ""
                }`}
                title={name}
                alt={name}
                src={`/ico/language/${name}-icon.svg`}
                width={30}
                height={30}
              />
            ))
          : null}
      </div>
    );
  };
  return (
    <div className="table w-[100%] text-[12px]">
      <div className="table-header-group">
        <div className="table-row text-center">
          <div className="table-cell">마크업</div>
          <div className="table-cell">스타일</div>
          <div className="table-cell">스크립트</div>
          <div className="table-cell">데이터베이스</div>
          <div className="table-cell">상태 관리</div>
          <div className="table-cell">서버</div>
        </div>
      </div>
      <div className="table-row-group">
        <div className="table-row items-center text-center tabular-nums">
          {language(markup)}
          {language(style)}
          {language(script)}
          {language(db)}
          {language(state)}
          {language(server)}
        </div>
      </div>
    </div>
  );
}
