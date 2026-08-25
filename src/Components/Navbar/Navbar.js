"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import DesktopNavbar from "./DesktopNavbar";
import { useUser } from "@/Context/UserContext";
import { useCart } from "@/Context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo, token } = useUser();
  const { cart } = useCart();
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="xl:hidden block">
        <div className="flex justify-between items-center main-style border-b border-[#DBDBDB] pb-3">
          <div className="flex items-center">
            <button
              onClick={toggleNavbar}
              className="text-gray-600 focus:outline-none xl:hidden bg-[#e9ecef6c] p-2 rounded-[8px]"
            >
              {/* منو */}
              <Image
                width={1000}
                height={100}
                src="/images/home/header/menu.svg"
                alt="menu-icon"
                className="w-6"
              />
            </button>
            <Link
              href="/shopping-cart"
              className="relative border-[1px] border-light_brown_200 p-1.5 rounded-md mr-2"
            >
              <Image
                width={100}
                height={100}
                src="/images/home/header/shopping-cart.svg"
                alt="shopping-cart"
                className="w-6"
              />
              {cartCount > 0 && <span className="absolute -top-2 -right-2 min-w-4 h-4 px-1 rounded-full bg-main_color text-white text-[10px] leading-4 text-center">{cartCount}</span>}
            </Link>
            <div className="p-1.5">
              <Image
                width={100}
                height={100}
                src="/images/home/header/notification.svg"
                alt="notification"
                className="w-6"
              />
            </div>
            <div className="relative mr-1 flex">
              <Image
                width={100}
                height={100}
                src="/images/home/header/search.svg"
                alt="search"
                className="w-5 absolute top-2 right-1.5"
              />
              <input
                placeholder="جستجو کنید"
                className={`p-3 pr-9 py-2 font-yekan rounded-[10px] text-[12px] bg-[#e9ecef48] w-32 ml-3`}
              />
            </div>
          </div>
          <div>
            <Link href="/">
              <Image
                width={75}
                height={75}
                src="/images/logo/mobile-logo.svg"
                alt="mobile logo"
                loading="eager"
                className="w-14"
              />
            </Link>
          </div>
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"
            onClick={toggleNavbar}
          ></div>
        )}

        <div
          className={`z-50 p-5 rounded-l-2xl fixed top-0 right-0 h-full w-72 bg-white transform transition-transform duration-300 shadow-lg ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } xl:translate-x-0 xl:static xl:flex xl:flex-row xl:items-center xl:bg-transparent`}
        >
          <div className="flex items-center justify-between">
            {!token ? (
              <div className="flex">
                <div className="ml-2 rounded-full items-center">
                  <Link href="/">
                    <Image
                      width={75}
                      height={75}
                      src="/images/logo/mobile-logo.svg"
                      alt="mobile logo"
                      loading="eager"
                      className="w-14"
                    />
                  </Link>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="font-yekan block">
                    {userInfo?.name} {userInfo?.family}
                  </span>
                  <span className="block font-yekan text-Gray59 text-[14px]">
                    {userInfo?.mobile}
                  </span>
                </div>
              </div>
            ) : (
              <Link href="/sign-up" className="bg-[#e9ecef86] font-yekan rounded-lg p-2 px-3">ورود/ثبت نام</Link>
            )}
            {/*  */}
            <div
              onClick={toggleNavbar}
              className="cursor-pointer border border-light_brown_200 p-1.5 rounded-lg"
            >
              <Icon
                icon="material-symbols:close-rounded"
                width="24"
                height="24"
              />
            </div>
          </div>
          <div className="flex flex-col font-yekan p-4 xl:flex-row xl:space-x-4">
            <Link
              href="/"
              className="py-3.5 text-gray-700 hover:text-gray-900 text-black_12 border-b-[1px] border-b-light_brown_200"
            >
              صفحه اصلی
            </Link>
            <Link
              href="/categories"
              className="py-3.5 text-gray-700 hover:text-gray-900 text-black_12 border-b-[1px] border-b-light_brown_200"
            >
              محصولات
            </Link>
            {/*<Link
              href="#"
              className="py-3.5 text-gray-700 hover:text-gray-900 text-black_12 border-b-[1px] border-b-light_brown_200"
            >
              محاسبه اقساط
            </Link>*/}
            <Link
              href="/blog"
              className="py-3.5 text-gray-700 hover:text-gray-900 text-black_12 border-b-[1px] border-b-light_brown_200"
            >
              مطالب آموزشی
            </Link>
            <Link
              href="/about-us"
              className="py-3.5 text-gray-700 hover:text-gray-900 text-black_12 border-b-[1px] border-b-light_brown_200"
            >
              درباره ما بدانید
            </Link>
            <Link
              href="/contact-us"
              className="py-3.5 text-gray-700 hover:text-gray-900 text-black_12 border-b-[1px] border-b-light_brown_200"
            >
              راه های ارتباطی ما
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden xl:block">
        <DesktopNavbar userInfo={userInfo} token={token} cartCount={cartCount} />
      </div>
    </div>
  );
};

export default Navbar;
