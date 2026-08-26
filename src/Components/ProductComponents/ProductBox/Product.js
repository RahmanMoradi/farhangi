import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

function Product({ isDiscount, className, productInfo }) {
  const router = useRouter();
  return (
    <div
      className={`relative flex bg-[#FFFFFF] rounded-2xl items-center ${className} cursor-pointer h-28`}
      onClick={() => {
        router.push(`/product/${productInfo?.slug}`);
      }}
    >
      <div className="w-28 ml-3 h-auto">
        <Image
          width={200}
          height={200}
          alt="product-image"
          src={productInfo?.images[0] ? productInfo?.images[0] : null}
          style={{ borderRadius: '0 1rem 1rem 0' }}
        />
      </div>
      <div className="p-1">
        <p className="text-[14px] text-[#121212] font-yekan">{productInfo?.title}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-main_color text-[13px] lg:text-[16px]">
            {productInfo?.price.toLocaleString()} تومان
          </span>
          <div className="flex items-center justify-center">
            <span className="mt-1 ml-1 text-[#BBDD23]">{productInfo?.score}</span>
            <span>
              <Image
                height={20}
                width={20}
                src="/images/icon/star.png"
                alt="score"
              />
            </span>
          </div>
        </div>
      </div>
      {isDiscount && (
        <div className="absolute top-2 right-2 rounded-full w-[55px] h-8 pt-0.5 bg-[#E11E1E80] border-2 border-[#DD0000] text-white text-[12px] flex items-center justify-center">
          {productInfo?.discount_percentage}
        </div>
      )}
    </div>
  );
}

export default Product;
