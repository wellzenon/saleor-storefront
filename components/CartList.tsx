import Image from "next/image";
import Link from "next/link";

import { useLocalStorage } from "react-use";
import { useRemoveProductFromCheckoutMutation } from "@/saleor/api";

import css from "../styles/Cart.module.css";
import { Console } from "console";

interface Props {
  products: any[];
}

export const CartList = ({ products }: Props) => {
  const [token] = useLocalStorage("token");
  const [removeProductFromCheckout] = useRemoveProductFromCheckoutMutation();

  return (
    <ul role="list" className={css.list}>
      {products.map((line) => {
        const lineID = line?.id || "";
        const variant = line?.variant;
        const product = line?.variant.product;
        const price = line?.totalPrice.gross;
        const productID = product?.id;

        return (
          <li key={lineID} className={css["list-item"]}>
            <a className={css["list-anchor"]}>
              <div className={css["image-aspect"]}>
                <Image
                  src={product?.thumbnail?.url || ""}
                  alt={product?.thumbnail?.alt || ""}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className={css["list-container"]}>
                <div className={css["list-card"]}>
                  <div className={css["list-title"]}>
                    <h3 className={css["product-name"]}>
                      <Link href={`/product/${productID}`}>
                        <a>{product?.name}</a>
                      </Link>
                    </h3>
                    <h4>{variant?.name}</h4>
                    <button
                      type="button"
                      onClick={() =>
                        removeProductFromCheckout({
                          variables: {
                            checkoutToken: token,
                            lineId: lineID,
                          },
                        })
                      }
                      className={css["remove-button"]}
                    >
                      <span>Remove</span>
                    </button>
                  </div>
                  <p className={css["list-price"]}>
                    {price?.amount} {price?.currency}
                  </p>
                </div>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
};
