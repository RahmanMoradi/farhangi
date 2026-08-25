import Image from "next/image";
import React from "react";

function ProductBox({ className }) {
  return (
    <div
      className={`${className} w-max p-2 flex flex-col items-center justify-center`}
    >
      <div>
        <Image alt="" src="/images/shop/product.png" height={100} width={100} />
      </div>
      <p className="text-lg">خرید قسطی PS4</p>
      <div>
        <span className="text-light_brown_600 text-[15px]">
          1.800.000 تومان
        </span>
        <span className="text-[#818181] text-[14px]">/درماه</span>
      </div>
    </div>
  );
}

export default ProductBox;
