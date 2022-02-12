import { useLocalStorage } from "react-use";
import { useCheckoutByTokenQuery } from "@/saleor/api";

import { Layout, CartHeader, CartList, CartSummary } from "@/components";

import css from "../styles/Cart.module.css";
import { SAELOR_CHECKOUT_TOKEN } from "@/lib";

const Cart = () => {
  const [token] = useLocalStorage(SAELOR_CHECKOUT_TOKEN);
  const { data, loading, error } = useCheckoutByTokenQuery({
    variables: { checkoutToken: token },
    skip: !token,
  });

  const products = data?.checkout?.lines || [];

  const content = loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>Error</p>
  ) : !data || !data.checkout ? null : (
    <>
      <CartHeader />
      <div className={css.grid}>
        <div className={css.container}>
          <CartList products={products} />
        </div>
        <CartSummary />
      </div>
    </>
  );

  return <Layout>{content}</Layout>;
};

export default Cart;
