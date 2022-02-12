import "../styles/globals.css";

import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { SaleorProvider } from "@saleor/sdk";
import { ThemeProvider } from "next-themes";

import { apolloClient, saleorClient } from "@/lib";
import { Root } from "@/components";

export default function MyApp(props: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <SaleorProvider client={saleorClient}>
          <Root {...props} />
        </SaleorProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
