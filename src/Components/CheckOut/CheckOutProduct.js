"use client";
import React from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";

function CheckOutProduct({ className, cartInfo }) {

  return (
    <div
      className={`relative flex bg-[#f3f2f2] p-2.5 rounded-2xl items-center ${className} mb-4`}
    >
      <div className="w-52 ml-3 bg-cover">
        <Image
          width={200}
          height={200}
          alt=""
          src={cartInfo?.product.images[0] ? cartInfo?.product.images[0] : null}
          className="w-full h-full rounded-xl"
        />
      </div>
      <div className="flex flex-col mr-3">
          <p className="text-[14px] text-[#121212] lg:text-[16px] font-semibold font-yekan cursor-pointer">
            {cartInfo?.product.title}
          </p>
        <div className="flex items-center justify-between mt-2 lg:block">
          <div className="flex items-center justify-center lg:justify-start lg:mt-2">
            <span className="mt-1 ml-1 text-[#BBDD23] font-yekan">
              {cartInfo?.product.score}
            </span>
            <span>
              <Image
                height={20}
                width={20}
                src="/images/icon/star.png"
                alt="img"
              />
            </span>
          </div>
        </div>
        <div className="text-Gray59 text-[12px] font-yekan flex items-center mt-1 lg:mt-2">
          <span className="ml-1.5">
            <Icon icon="fa6-solid:truck-fast" width="25" height="25" />
          </span>
          <span>ارسال فرهنگی</span>
        </div>
        <div className="flex items-center gap-5 mt-1 text-[14px] lg:text-[16px] lg:mt-3">
          <span className="text-main_color text-[16px] font-bold font-yekan">
            {(cartInfo.price * cartInfo.quantity).toLocaleString()} تومان
          </span>
          <span className="text-main_color text-[16px] font-bold font-yekan">تعداد: {cartInfo.quantity}</span>
        </div>
      </div>
    </div>
  );
}

export default CheckOutProduct;
