import React, { useEffect, useState } from "react";
import { addProductsCartToLocalStorage } from "@/lib/utils/addProductsCart";
import { useUser } from "@/Context/UserContext";
import { useCart } from "@/Context/CartContext";
import { Icon } from "@iconify/react";
import useAlert from "@/Hooks/useAlert";
import Link from "next/link";

function AddProduct({ 
    className, 
    productInfo, 
    inventory, 
    finalPrice, 
    hasDiscount, 
    mainPrice, 
    discountPercentage 
  }) {
  {/* State Management */}
  const [isProductInCart, setIsProductInCart] = useState();

  {/* Context management */}
  const { cart, updateCart } = useCart();
  const { token } = useUser();
  const { showAlert } = useAlert();

  {/* Checking if product is availabe in the cart */}
  useEffect(() => {
    if (productInfo?.id && cart) {
      const found = cart.find((item) => item.product.id === productInfo.id);
      setIsProductInCart(found || null);
    }
  }, [cart, productInfo]);


  {/* Adding product in the cart or changing quantity */}
  const addProductToCart = async (quantity) => {
    if (!productInfo?.id) return;
  
    if (token) {
      try {
        await updateCart(productInfo.id, quantity);
  
        if (quantity > 0) {
          setIsProductInCart({ product: productInfo, quantity });
        } else {
          setIsProductInCart(null);
        }
  
        showAlert(
          quantity > 0
            ? "سبد خرید با موفقیت به‌روز شد"
            : "محصول از سبد حذف شد",
          "success",
          2000
        );
      } catch (err) {
        showAlert(err.response?.data?.message || "خطا در افزودن به سبد", "error", 2300);
      }
    } else {
      addProductsCartToLocalStorage(quantity, productInfo);
      loadAndCheckProduct();
    }
  };  

  const loadAndCheckProduct = () => {
    const stored = localStorage.getItem("products");
    const products = stored ? JSON.parse(stored) : [];
    const existing = products.find((p) => p.id === productInfo?.id);
    setIsProductInCart(existing || null);
  };

  useEffect(() => {
    if (!token && productInfo?.id) loadAndCheckProduct();
  }, [productInfo, token]);

  // Format price
  const formatPrice = (price) => {
    if (!price || typeof price !== "number") return "0 تومان";
    return `${price.toLocaleString()}`;
  };

  return (
    <div
      className={`fixed ${className} z-20 bottom-12 left-0 right-0 p-2 bg-[#f5f5f5] lg:p-4 lg:bg-gradient-to-r lg:from-[#efeff09c] lg:via-[#efeff080] lg:to-[#efeff03f] flex items-center justify-between`}
    >
      {/* When product is added to the cart */}
      {isProductInCart ? (
        <div className="flex items-center gap-2">
          <div className="flex items-center border text-black_12 border-light_brown_600 p-1 rounded-md px-1.5">
            <span
              className="cursor-pointer"
              onClick={() => addProductToCart(isProductInCart.quantity + 1)}
            >
              <Icon icon="line-md:plus" width="18" height="18" />
            </span>
            <span className="mx-2.5 font-yekan">{isProductInCart.quantity}</span>
            <span
              className="cursor-pointer font-yekan"
              onClick={() =>
                isProductInCart.quantity > 1
                  ? addProductToCart(isProductInCart.quantity - 1)
                  : addProductToCart(0)
              }
            >
              <Icon icon="line-md:minus" width="18" height="18" />
            </span>
          </div>
          <Link href="/shopping-cart" className="rounded-xl bg-main_color px-3 py-2 text-[13px] text-white font-yekan">مشاهده سبد</Link>
        </div>
      ) : inventory ? (
        <div
          className="flex items-center bg-main_color rounded-2xl p-2.5 px-4 cursor-pointer text-white"
          onClick={() => addProductToCart(1)}
        >
          <Icon
            icon="stash:plus-solid"
            width="22"
            height="22"
            className="ml-1"
          />
          <span className="text-[14px] lg:text-[14px] lg:font-medium font-yekan">
            افزودن به سبد خرید
          </span>
        </div>
      ) : (
        <span className="text-main_color text-[16px] font-bold font-yekan">ناموجود</span>
      )}
      {/* When product is not added to the cart */}
      {inventory ? (
        <div className="flex flex-col text-[14px] lg:text-[16px] lg:mr-10">
          <div className="flex items-center gap-4">
            <span className="text-[#3f4064] text-[14px] font-bold font-yekan">قیمت خرید نقدی</span>
            {discountPercentage !== null && discountPercentage > 0 ? (
              <span className="bg-main_color rounded-full px-3 py-0.5 text-center text-[13px] text-white font-semibold font-yekan z-10">
                % {discountPercentage}
              </span>
            ) : null}
          </div>
          <div className="flex flex-col gap-1 mt-1">
            {hasDiscount && (
              <p className="text-[#c6282859] text-[12px] font-semibold font-yekan line-through">
                {formatPrice(mainPrice)}
              </p>
            )}
            <p className="text-main_color text-[15px] font-bold font-yekan">
              {formatPrice(finalPrice)} میلیون تومان
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AddProduct;
