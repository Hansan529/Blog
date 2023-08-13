import { Props } from "@/app/layout";

export default function RootLayout({ children }: Props) {
  return (
    <article className="marker:text-sky-400 container prose mx-auto dark:prose-invert">
      {children}
    </article>
  );
}
