import { GetStaticProps, InferGetStaticPropsType } from "next";

import {
  useProductByIdQuery,
  FilterProductsDocument,
  FilterProductsQuery,
  Product,
} from "@/saleor/api";
import { apolloClient } from "@/lib";
import { Layout, ProductDetails } from "@/components";

interface Props {
  id: string;
}

const ProductPage = ({
  id,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { loading, error, data } = useProductByIdQuery({ variables: { id } });
  const content = loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>Error</p>
  ) : (
    <ProductDetails product={data?.product as Product} />
  );

  return <Layout>{content}</Layout>;
};

export default ProductPage;

export async function getStaticPaths() {
  const { data } = await apolloClient.query<FilterProductsQuery>({
    query: FilterProductsDocument,
    variables: {
      first: 4,
      filter: {},
    },
  });
  const paths = data.products?.edges.map(({ node: { id } }) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      id: params?.id,
    },
    revalidate: 15,
  };
};
