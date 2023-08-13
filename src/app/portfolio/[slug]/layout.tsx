import { Props } from "@/app/layout";

export default function RootLayout({ children }: Props) {
  return (
    <article className="marker:text-sky-400 prose-a:text-blue-500 container prose mx-auto dark:prose-invert hover:prose-a:text-[skyblue]">
      {children}
    </article>
  );
}
