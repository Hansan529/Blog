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
      <td className="relative w-1/6 align-middle empty:before:text-red-500 empty:before:content-['X']">
        {type
          ? type.map((name, index) => (
              <div key={index}>
                <Image
                  className={`mx-auto object-contain ${
                    name === "express" ? "dark:invert" : ""
                  }`}
                  title={name}
                  alt={name}
                  src={`/ico/language/${name}-icon.svg`}
                  width={30}
                  height={30}
                  priority={true}
                />
                <span className="text-[12px]">{name.toUpperCase()}</span>
              </div>
            ))
          : null}
      </td>
    );
  };
  return (
    <table className="mt-[20px] w-[100%] text-center text-[12px]">
      <thead>
        <tr className="break-keep">
          <th>마크업</th>
          <th>스타일</th>
          <th>스크립트</th>
          <th>데이터베이스</th>
          <th>상태 관리</th>
          <th>서버</th>
        </tr>
      </thead>
      <tbody>
        <tr className="items-center tabular-nums">
          {language(markup)}
          {language(style)}
          {language(script)}
          {language(db)}
          {language(state)}
          {language(server)}
        </tr>
      </tbody>
    </table>
  );
}
