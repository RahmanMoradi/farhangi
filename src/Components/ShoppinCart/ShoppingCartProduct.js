"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "@/Context/CartContext";
import { Icon } from "@iconify/react";
import Image from "next/image";

function ShoppingCartProduct({ 
    cartInfo, 
    className, 
  }) {
  const { updateCart, deleteFromCart } = useCart();
  const [count, setCount] = useState(cartInfo?.quantity || 1);

  useEffect(() => {
    setCount(cartInfo.quantity);
  }, [cartInfo.quantity]);

  const handleUpdate = async (newCount) => {
    if (newCount < 0) return;

    try {
      setCount(newCount);
      await updateCart(cartInfo.product.id, newCount);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    await deleteFromCart(cartInfo.product.id);
  };

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
          <span>ارسال توسط فروشگاه فرهنگی</span>
        </div>
        <div className="flex items-center justify-between mt-1 text-[14px] lg:text-[16px] lg:justify-end lg:flex-row-reverse lg:mt-3">
          <div className="flex items-center gap-2">
            <span className="text-main_color text-[16px] font-bold font-yekan lg:mr-10">
              {(cartInfo.price * count).toLocaleString()} تومان
            </span>
          </div>
          <div className="flex items-center border text-black_12 font-yekan border-light_brown_600 p-1 rounded-md px-1.5">
            <span
              className="cursor-pointer"
              onClick={() => handleUpdate(count + 1)}
            >
              <Icon icon="line-md:plus" width="18" height="18" />
            </span>
            <span className="mx-2.5">{count}</span>
            <span
              className="cursor-pointer"
              onClick={() => handleUpdate(count - 1)}
            >
              <Icon icon="line-md:minus" width="18" height="18" />
            </span>
          </div>
        </div>
      </div>
      <div
        className="absolute left-3 bottom-3 hidden lg:block cursor-pointer"
        onClick={handleDelete}
      >
        <Image
          width={20}
          height={20}
          src="/images/shopping-cart/trash.svg"
          alt="trash-icon"
          className="w-6"
        />
      </div>
    </div>
  );
}

export default ShoppingCartProduct;
