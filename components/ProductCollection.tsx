import React from "react";
import { Product, useFilterProductsQuery } from "@/saleor/api";

import { Pagination, ProductElement } from "@/components";

export const ProductCollection = () => {
  const { loading, error, data, fetchMore } = useFilterProductsQuery({
    variables: {
      filter: {},
      // sortBy: {
      //   field: ProductOrderField.Name,
      //   direction: OrderDirection.Desc
      // }
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (data) {
    const products = data.products?.edges || [];
    const pageInfo = data.products?.pageInfo;
    const totalCount = data.products?.totalCount;

    const onLoadMore = () => {
      fetchMore({
        variables: {
          after: pageInfo?.endCursor,
        },
      });
    };

    return (
      <>
        <ul role="list" className="grid">
          {products?.length > 0 &&
            products.map(({ node }) => (
              <ProductElement key={node.id} {...(node as Product)} />
            ))}
        </ul>
        <Pagination
          onLoadMore={onLoadMore}
          itemCount={products.length}
          totalCount={totalCount || NaN}
        />
        <style jsx>{`
          .grid {
            list-style: none;
            padding: 0;
            display: grid;
            gap: 1rem;
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        `}</style>
      </>
    );
  }

  return null;
};
