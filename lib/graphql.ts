import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
import { createFetch, createSaleorClient, SaleorClientOpts } from "@saleor/sdk";
import { TypedTypePolicies } from "@/saleor/api";

import { SALEOR_URI, SALEOR_CHANNEL } from "@/lib";

const typePolicies: TypedTypePolicies = {
  Query: {
    fields: {
      products: relayStylePagination(["filter"]),
    },
  },
};

const httpLink = createHttpLink({
  uri: SALEOR_URI,
  fetch: createFetch(),
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({ typePolicies }),
});

export const saleorClient = createSaleorClient({
  apiUrl: SALEOR_URI,
  channel: SALEOR_CHANNEL,
} as SaleorClientOpts);
