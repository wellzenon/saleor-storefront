import Link from "next/link";

import css from "../styles/Cart.module.css"


export const CartHeader = () => {
  return (
      <header className={css.header}>
        <h1 className={css.title}>
          Your Cart
        </h1>
        <div>
          <Link href="/">
            <a>
              Continue Shopping
            </a>
          </Link>
        </div>
      </header>
  )
}