import React from "react";
import Image from "next/image";
import { VariantSelector } from "@/components";
import { useRouter } from "next/router";
import { useLocalStorage } from "react-use";
import { Product, useAddProductVariantToCartMutation } from "@/saleor/api";
import { formatAsMoney, SAELOR_CHECKOUT_TOKEN } from "@/lib";

import homeCss from "../styles/Home.module.css";
import css from "../styles/Product.module.css";

interface Props {
  product: Pick<
    Product,
    | "id"
    | "name"
    | "description"
    | "thumbnail"
    | "category"
    | "media"
    | "variants"
  >;
}

export const ProductDetails = ({ product }: Props) => {
  const router = useRouter();
  const [token] = useLocalStorage(SAELOR_CHECKOUT_TOKEN);
  const [addProductToCart] = useAddProductVariantToCartMutation();

  const queryVariant = process.browser
    ? router.query.variant?.toString()
    : undefined;

  const selectedVariantID = queryVariant || product?.variants![0]!.id!;
  const selectedVariant = product?.variants!.find(
    (variant) => variant?.id === selectedVariantID
  );

  const onAddToCart = async () => {
    await addProductToCart({
      variables: { checkoutToken: token, variantId: selectedVariantID },
    });
    router.push("/cart");
  };

  return (
    <div className={css.columns}>
      <div className={css["image-aspect"]}>
        <Image
          src={product?.media![0]?.url || ""}
          alt={`${product?.name} image`}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className={css.details}>
        <h1 className={css["details-title"]}>{product?.name}</h1>
        <p className={css["details-category"]}>{product?.category?.name}</p>
      </div>
      <article className={css["details-description"]}>
        {product?.description}
      </article>
      <VariantSelector
        id={product.id}
        variants={product?.variants || []}
        selectedVariantID={selectedVariantID}
      />
      <div className={css.price}>
        {formatAsMoney(selectedVariant?.pricing?.price?.gross.amount)}
      </div>

      <button
        onClick={onAddToCart}
        type="submit"
        className={homeCss["button-accent"]}
      >
        Add to cart
      </button>
    </div>
  );
};
