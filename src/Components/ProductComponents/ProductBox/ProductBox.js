import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function ProductBox({ className, productInfo }) {
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [inventory, setInventory] = useState(productInfo.inventory || 0);
  const router = useRouter();

  const mainPrice = productInfo.price;
  const discountedPrice = productInfo.discount_price;
  const hasDiscount = productInfo.discount_price > 0;
  const finalPrice = hasDiscount ? discountedPrice : mainPrice;
  const percentage = productInfo.discount_percentage;

  useEffect(() => {
    if (percentage !== null && percentage > 0) {
      setDiscountPercentage(percentage);
    }
  }, [percentage]);

  {/* Formatting price */}
  const formatPrice = (price) => {
    return price.toLocaleString();
  };

  return (
    <div
      className={`flex flex-col px-5 py-3.5 ${className} relative cursor-pointer lg:h-60 lg:justify-between hover:shadow-lg transition-all ease-in`}
      onClick={() => {
        router.push(`/product/${productInfo?.slug}`);
      }}
    >
      <div className="rounded-xl bg-[#90909050] w-full h-28 overflow-hidden relative">
        {discountPercentage ? (
          <span className="absolute top-2 left-1 bg-main_color rounded-full px-2 py-0.5 text-center text-[13px] text-white font-[600] z-10">
            % {discountPercentage}
          </span>
        ) : null}
        <Image
          height={300}
          width={300}
          src={productInfo?.images[0]}
          alt="product-img"
          className="w-full h-full object-contain bg-white"
          loading="eager"
        />
      </div>
      <p className="text-[#4E4E4E] my-2 text-[12px] lg:text-[12px] font-yekan">
        {productInfo?.title}
      </p>
      <div className="flex items-center justify-between">
        {inventory > 0 ? (
          <div className="flex flex-col gap-1">
            {hasDiscount && (
              <span className="text-[#ec008e85] font-yekan text-[12px] font-semibold line-through">
                {formatPrice(mainPrice)}
              </span>
            )}
            <span className="text-second_color text-[13px] font-bold font-yekan">
              {finalPrice === 0 ? "0 تومان" : `${formatPrice(finalPrice)} تومان`}
            </span>
         </div>
        ) : (
          <span className="text-second_color text-[13px] font-[700] font-yekan">
            ناموجود
          </span>
        )}
        <div className="flex items-center justify-center">
          <span className="mt-1 ml-1 text-[#BBDD23] text-[13px]">{productInfo?.score}</span>
          <span>
            <Image
              height={20}
              width={20}
              src="/images/icon/star.png"
              alt="score-img"
              className="w-4 h-4"
              loading="eager"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductBox;
