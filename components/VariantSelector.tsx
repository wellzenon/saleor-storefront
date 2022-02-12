import React from "react";
import { ProductVariant } from "@/saleor/api";
import Link from 'next/link';

import css from "../styles/Product.module.css"


type Variant = Pick<ProductVariant, "id" | "name"> | null | undefined;
interface Props {
  id: string;
  selectedVariantID: string;
  variants: Variant[];
}

export const VariantSelector = ({variants, id, selectedVariantID}: Props) => {
  return(
    <div className={css.grid}>
      {variants.map( variant => {
        const isSelected = variant?.id === selectedVariantID;

        return(
          <Link 
            key={variant?.name}
            href={{
              pathname: "/product/[id]/",
              query: {variant: variant?.id, id},
            }}
            replace
            shallow
          >
            <a className={isSelected ? css["variant-selected"] : css["variant-default"]}>
              {variant?.name}
            </a>
          </Link>
        )
      })}
    </div>
  )
}