import { Props } from "@/app/layout";

export default function RootLayout({ children }: Props) {
  return (
    <article
      className="
      w-9/10 xl:x-full
    dark:marker:text-sky-400 prose-a:text-blue-500 container prose 
    mx-auto dark:prose-invert marker:text-black hover:prose-a:text-[skyblue]"
    >
      {children}
    </article>
  );
}
