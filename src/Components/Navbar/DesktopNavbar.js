"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import MegaMenu from "./MegaMenu";
import Image from "next/image";
import Link from "next/link";

const DesktopNavbar = ({ userInfo, token, cartCount }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="main-style">
      <div className="flex items-center justify-between pb-5 pt-3">
        <div className="flex items-center">
          <div className="w-[110px] pt-1.5">
            <Link href="/" className="flex items-center justify-center gap-2">
              <Image
                width={500}
                height={500}
                src="/images/logo/logo.png"
                alt="logo"
                className="w-full object-cover"
              />
            </Link>
          </div>
          <div className="relative mr-4 flex">
            <Image
              src="/images/icon/search-icon.svg"
              width={24}
              height={24}
              className="absolute top-1/2 -translate-y-1/2 right-3"
              alt="search-icon"
            />
            <input
              placeholder="محصولی که دنبالش میگردی رو اینجا پیدا کن..."
              className={`pr-12 py-3 font-yekan rounded-lg text-md font-regular ml-3 bg-[#e9ecef86]`}
              style={{ width: '650px' }}
            />
          </div>
        </div>
        {/*  */}
        <div className="flex items-center justify-around text-[14px]">
          <div className="ml-6 cursor-pointer">
            <Image 
              src="/images/icon/notification.svg" 
              width={24} 
              height={24} 
              alt="notification"
            />
          </div>
          <div
            className="relative border p-2 rounded-md mr-2 cursor-pointer"
            style={{ border: '1px solid rgba(219, 219, 219, 1)' }}
            onClick={() => {
              router.push("/shopping-cart");
            }}
          >
            <Image 
              src="/images/icon/shopping-cart.svg" 
              width={24} 
              height={24} 
              alt="shopping-cart-icon"
            />
            {cartCount > 0 && <span className="absolute -top-2 -right-2 min-w-4 h-4 px-1 rounded-full bg-main_color text-white text-[10px] leading-4 text-center">{cartCount}</span>}
          </div>
          {/*  */}
          {token ? (
            <Link href="/account" className="flex items-center mr-5 bg-[#e9ecef86] rounded-lg p-3 cursor-pointer">
              <div className="rounded-full items-center">
                <Image 
                  src="/images/icon/user.svg" 
                  width={23} 
                  height={23} 
                  alt="user-icon"
                />
              </div>
              <div className="mx-2">
                <span className="font-yekan font-semibold">
                  {userInfo?.name} {userInfo?.family}
                </span>
              </div>
              {/* <div>
                <Icon icon="iconoir:nav-arrow-down" width="28" height="28" />
              </div> */}
            </Link>
          ) : (
            <Link href="/sign-up" className="bg-[#e9ecef86] font-yekan rounded-lg p-2 px-3 mr-2">
              ورود / ثبت نام
            </Link>
          )}
        </div>
      </div>
      {/*  */}
      <div className="font-yekan text-[14px] mt-1 pb-4 flex items-center border-b border-[#DBDBDB]">
        <div>
          <div 
            className="flex font-medium items-center border-l border-[#DBDBDB] pl-7 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Icon icon="majesticons:menu-line" width="30" height="30" />
            دسته بندی محصولات
          </div>
          <AnimatePresence>
            {open && <MegaMenu open={open} setOpen={setOpen} />}
          </AnimatePresence>
        </div>
        <Link href="/product" className="text-Gray59 mr-7 cursor-pointer">
          فروشگاه
        </Link>
        {/*<Link href="/why-farhangi" className="text-Gray59 mr-7 cursor-pointer">
          چرا فروشگاه فرهنگی
        </Link>*/}

        <Link href="/blog" className="text-Gray59 mr-7 cursor-pointer">
          وبلاگ
        </Link>
        <Link href="/about-us" className="text-Gray59 mr-7 cursor-pointer">
          درباره ما
        </Link>
        <Link href="/contact-us" className="text-Gray59 mr-7 cursor-pointer">
          تماس با ما
        </Link>
      </div>
    </div>
  );
};

export default DesktopNavbar;
