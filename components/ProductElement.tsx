import { Product } from "@/saleor/api";
import Image from "next/image";
import Link from "next/link";

import css from "../styles/Home.module.css";

type Props = Pick<
  Product,
  "id" | "name" | "thumbnail" | "category" | "pricing"
>;

export const ProductElement = ({
  id,
  name,
  thumbnail,
  category,
  pricing,
}: Props) => {
  const lowestPrice = pricing?.priceRange?.start?.gross.amount ?? 0;
  const highestPrice = pricing?.priceRange?.stop?.gross.amount ?? 0;

  return (
    <li key={id} className={css["product-card"]}>
      <Link href={`/product/${id}`}>
        <a>
          <div className={css["product-image-aspect"]}>
            <Image
              src={thumbnail?.url || ""}
              alt={`${name} image`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={css["product-summary"]}>
            <div className={css["product-description"]}>
              <div>
                <p className={css["product-title"]}>{name}</p>
                <p className={css["product-category"]}>{category?.name}</p>
              </div>
              <div>
                {lowestPrice === highestPrice
                  ? highestPrice
                  : `${lowestPrice} - ${highestPrice}`}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};
