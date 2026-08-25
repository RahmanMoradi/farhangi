import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

function Menu({ select }) {
  return (
    <div className="w-full h-16 xl:hidden">
      <div className="flex z-10 py-1 justify-around fixed bottom-0 left-0 right-0 bg-light_brown_200">
        {/* // ! */}
        <Link
          className={`${
            select === "home" ? "bg-[#FFD4D4] text-main_color" : ""
          } p-2 rounded-lg flex`}
          href="/"
        >
          <Icon
            style={{ marginLeft: "7px" }}
            icon="solar:home-2-broken"
            width="24"
            height="24"
          />
          {select === "home" ? "صفحه اصلی" : ""}
        </Link>
        {/* // ! */}
        <Link
          className={`${
            select === "products" ? "bg-[#FFD4D4] text-main_color" : ""
          } p-2 rounded-lg flex`}
          href="/categories"
        >
          <Icon
            style={{ marginLeft: "7px" }}
            icon="solar:shop-linear"
            width="24"
            height="24"
          />
          {select === "products" ? "محصولات" : ""}
        </Link>
        {/* // ! */}
        <Link
          className={`${
            select === "shopping-cart" ? "bg-[#FFD4D4] text-main_color" : ""
          } p-2 rounded-lg flex`}
          href="/shopping-cart"
        >
          <Icon
            style={{ marginLeft: "7px" }}
            icon="ri:shopping-cart-fill"
            width="24"
            height="24"
          />
          {select === "shopping-cart" ? "سبد خرید" : ""}
        </Link>
        {/* // ! */}
        <Link
          className={`${
            select === "blog" ? "bg-[#FFD4D4] text-main_color" : ""
          } p-2 rounded-lg flex`}
          href="/blog"
        >
          <Icon
            icon="solar:book-linear"
            width="24"
            height="24"
          />
          {select === "blog" ? "وبلاگ" : ""}
        </Link>
        {/* // ! */}
        <Link
          className={`${
            select === "account" ? "bg-[#FFD4D4] text-main_color" : ""
          } p-2 rounded-lg flex`}
          href="/account"
        >
          <Icon
            style={{ marginLeft: "7px" }}
            icon="bx:user"
            width="24"
            height="24"
          />
          {select === "account" ? "پروفایل" : ""}
        </Link>
      </div>
    </div>
  );
}

export default Menu;
