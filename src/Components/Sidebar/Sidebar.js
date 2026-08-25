"use client";
import { Icon } from "@iconify/react";
import React from "react";
import Link from "next/link";
import Button from "@/Components/ui/Button";
import Input from "@/Components/ui/Input";

function Sidebar() {
  return (
    <div className="bg-white text-center w-64 m-auto">
      {/* search */}
      <div className="my-6">
        <Input
          placeholder="نام، کد یا دسته بندی محصول"
          className="w-full text-[11px]"
        >
          <div className="bg-light_brown_200 p-2 rounded-lg">
            <Icon icon="line-md:search" width="22" height="22" />
          </div>
        </Input>
      </div>
      {/* category */}
      <div>
        <div className="text-[17px] pb-2 mb-6 relative">
          <Link href="#">
            <div className="absolute bg-gradient-to-r from-white via-light_brown_600 to-white w-full h-[1px] bottom-0"></div>
            صفحه اصلی
          </Link>
        </div>
        <div className="text-[17px] pb-2 mb-6 relative">
          <Link href="#">
            <div className="absolute bg-gradient-to-r from-white via-light_brown_600 to-white w-full h-[1px] bottom-0"></div>
            محاسبه اقساط
          </Link>
        </div>
        <div className="text-[17px] pb-2 mb-6 relative">
          <Link href="/blog">
            <div className="absolute bg-gradient-to-r from-white via-light_brown_600 to-white w-full h-[1px] bottom-0"></div>
            مطالب آموزشی
          </Link>
        </div>
        <div className="text-[17px] pb-2 mb-6 relative">
          <Link href="#">
            <div className="absolute bg-gradient-to-r from-white via-light_brown_600 to-white w-full h-[1px] bottom-0"></div>
            درباره ما بدانید
          </Link>
        </div>
        <div className="text-[17px] pb-2 mb-6 relative">
          <Link href="#">
            <div className="absolute bg-gradient-to-r from-white via-light_brown_600 to-white w-full h-[1px] bottom-0"></div>
            راه های ارتباطی ما
          </Link>
        </div>
        <div className="text-[17px] pb-2 relative">
          <Link href="#">
            <div className="absolute bg-gradient-to-r from-white via-light_brown_600 to-white w-full h-[1px] bottom-0"></div>
            دسته بندی محصولات
          </Link>
        </div>
      </div>
      {/* Button Back */}
      <Button
        text="بازگشت به صفحه قبل"
        className="w-full py-2 mt-9 text-[17px]"
        href="/"
      />
    </div>
  );
}

export default Sidebar;
