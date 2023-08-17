export default function RootLayout({ children }) {
  return (
    <div
      className="prose mx-auto w-8/10 break-keep pb-[120px] pt-[50px] dark:prose-invert 
      md:prose-xl
    hover:prose-a:text-blue-400 
    prose-code:tracking-tight"
    >
      {children}
    </div>
  );
}
