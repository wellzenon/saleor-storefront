import React from "react";
import Link from "next/link";

import { ThemeChanger } from "@/components";
import css from "../styles/Home.module.css";

interface MenuLinkProps {
  href: string;
  label?: string | React.ReactNode;
  onClick?: () => void;
}

const MenuLink = ({ href, label, onClick }: MenuLinkProps) => (
  <Link href={href}>
    <a className={css["menu-link"]} aria-expanded="false" onClick={onClick}>
      {label}
    </a>
  </Link>
);

export const Navbar = () => {
  // const { logout } = useAuth();
  // const { user } = useUser();
  return (
    <div className={css.background}>
      <div className={css.container}>
        <div className={css.menu}>
          <div className={css["menu-section"]}>
            <MenuLink href="/" label="All Products" />
            <MenuLink href="/cart" label="Cart" />
          </div>
          <div className={css["menu-section"]}>
            <MenuLink href="/login" label="Login" />
            <MenuLink href="/register" label="Register" />
            {/* <MenuLink
              href="/"
              label="Log out"
              onClick={async () => await logout()}
            /> */}
            <ThemeChanger />
            {/* {`User: ${user?.email}`} */}
          </div>
        </div>
      </div>
    </div>
  );
};
