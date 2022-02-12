import { AppProps } from "next/app";

export const Root = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};
