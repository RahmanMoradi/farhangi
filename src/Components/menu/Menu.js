"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";
import { useUser } from "@/Context/UserContext";

function Menu({ select }) {
  const { token } = useUser();

  return (
    <div className="w-full h-16 xl:hidden">
      <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-around bg-light_brown_200 py-1 font-yekan">
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
          href={token ? "/account" : "/sign-in"}
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
