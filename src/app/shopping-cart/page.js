"use client";
import React from "react";
import { useUser } from "@/Context/UserContext";
import { useCart } from "@/Context/CartContext";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import Navbar from "@/Components/Navbar/Navbar";
import RecentlyViewedProductsSlider from "@/Components/ProductComponents/ProductsSlider/RecentlyViewedProductsSlider";
import ShoppingCartProduct from "@/Components/ShoppinCart/ShoppingCartProduct";
import Footer from "@/Components/Footer/Footer";
import Menu from "@/Components/menu/Menu";
import Image from "next/image";

export default function ShoppingCart() {
  {/* Setting router */}
  const router = useRouter();

  {/* Context management */}
  const { cart, isLoading } = useCart();
  const { token } = useUser();

  {/* Total price and single product price setting */}
  const postCharge = 30000;
  const price = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const total = price + postCharge;

  {/* Submitting and redirecting */}
  const SubmitOrder = () => {
    if (cart.length === 0) return;
    router.push(token ? "/shopping-cart/checkout" : "/sign-up?redirect=/shopping-cart/checkout");
  };

  {/* Empty cart */}
  const EmptyCart = () => (
    <div className="flex flex-col h-96 relative items-center justify-center text-center">
      <Image
        width={150}
        height={150}
        alt="سبد خرید خالی"
        src="/images/shopping-cart/Group 23.png"
        className="mb-2"
      />
      <span className="text-Gray59 font-yekan">سبد خرید شما خالی است!</span>
    </div>
  );

  const CartSummary = () => (
    <div className="lg:flex-1">
      <div className="border border-light_brown_600 rounded-lg mt-3 text-black_12 text-[14px] lg:text-[16px] font-yekan">
        <div className="flex items-center justify-between py-3.5 mx-3.5 border-b-2 border-b-light_brown_600">
          <span>قیمت محصولات</span>
          <span>{price.toLocaleString()} میلیون تومان</span>
        </div>
        <div className="flex items-center justify-between py-3.5 mx-3.5 border-b-2 border-b-light_brown_600">
          <span>هزینه پست</span>
          <span>{postCharge.toLocaleString()} تومان</span>
        </div>
        <div className="flex items-center justify-between py-3.5 mx-3.5 text-main_color">
          <span>جمع سبد خرید</span>
          <span>{total.toLocaleString()} میلیون تومان</span>
        </div>
      </div>
      <button 
        onClick={SubmitOrder}
        className="mt-3 w-full p-3 border border-main_color rounded-xl flex items-center justify-center hover:bg-main_color hover:text-white transition-colors duration-300"
      >
        <span className="ml-1 font-yekan">ادامه خرید</span>
        <Icon icon="solar:alt-arrow-left-linear" width="23" height="23" />
      </button>
    </div>
  );

  return (
    <>
      <div className="body">
        <Navbar />
        <div className="main-style mb-2">
          <div className="flex items-center">
            <div className="flex justify-between text-black_12 lg:w-full border-b border-[#DBDBDB] mt-3">
              <span className="lg:block lg:border-b-1 lg:border-b-light_brown_600 lg:pb-3 text-[19px] font-bold font-yekan">
                سبد خرید
              </span>
              {cart.length > 0 && (
                <span className="mr-1 text-Gray59 font-yekan">{cart.length} محصول</span>
              )}
            </div>
            <span className="lg:hidden">
              <Icon icon="pepicons-pop:dots-y" width="24" height="24" />
            </span>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-10 text-gray-500 font-yekan">
              در حال بارگذاری سبد خرید...
            </div>
          ) : cart.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="mt-5 lg:flex lg:gap-6">
              <div className="lg:flex-[2.7]">
                {cart.map((item) => (
                  <ShoppingCartProduct
                    key={item.product.id}
                    cartInfo={item}
                  />
                ))}
              </div>
              <CartSummary />
            </div>
          )}

          <div className="hidden lg:block">
            <RecentlyViewedProductsSlider
              text="بازدید های اخیر"
              classNameTitle="text-main_color bg-[#FFFFFF]"
            />
          </div>
        </div>
        <Menu select="shopping-cart" />
      </div>
      <Footer />
    </>
  );
}