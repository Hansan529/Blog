'use client';

import { ThemeProvider } from "next-themes";
import { Props } from "./layout";

const Providers = ({ children }: Props) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default Providers;
