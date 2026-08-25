"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function SliderProductBox({ className, productInfo }) {
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
            className={`flex flex-col px-5 py-3.5 bg-[#FFFFFF] border-l border-gray ${className} relative cursor-pointer lg:h-60 lg:justify-between`}
            onClick={() => {
                if (productInfo?.slug) {
                    router.push(`/product/${productInfo?.slug}`);
                }
            }}
        >
            <div className="rounded-xl bg-[#90909050] w-full h-28 overflow-hidden relative">
                {discountPercentage ? (
                    <span className="absolute top-2 left-0 bg-main_color rounded-full px-2 py-0.5 text-center text-[13px] text-white font-[600] z-10">
                        % {discountPercentage}
                    </span>
                ) : null}
                <Image
                    height={300}
                    width={300}
                    src={Array.isArray(productInfo?.images) && productInfo?.images.length > 0 
                        ? productInfo.images[0] 
                        : productInfo.image
                    }
                    alt="product-img"
                    className="w-full h-full object-contain bg-white"
                    loading="eager"
                />
            </div>
            <h4 className="text-[#4E4E4E] my-2 text-[12px] lg:text-[12px] leading-6 font-yekan">
                {productInfo?.title}
            </h4>
            <div className="flex items-center justify-between">
                {inventory > 0 && inventory !== 0 ? (
                    <div className="flex flex-col gap-1">
                        <span className="text-second_color text-[13px] font-bold font-yekan">
                            {finalPrice === 0 ? "0 تومان" : `${formatPrice(finalPrice)} تومان`}
                        </span>
                        {hasDiscount && (
                            <span className="text-[#ec008e73] text-[12px] font-semibold font-yekan line-through">
                                {formatPrice(mainPrice)}
                            </span>
                        )}
                    </div>
                ) : (
                    <span className="text-second_color text-[13px] font-bold font-yekan">
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

export default SliderProductBox;