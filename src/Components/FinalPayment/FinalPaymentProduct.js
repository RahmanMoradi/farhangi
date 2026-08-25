import Image from "next/image";
import React from "react";

function FinalPaymentProduct({ className, order }) {
  return (
    <div
      className={`flex border border-light_brown_600 p-2.5 rounded-2xl items-center ${className}`}
    >
      <div className="w-64 ml-3">
        <Image width={200} height={200} alt="" src={order?.items?.[0]?.product?.images[0]} />
      </div>
      <div>
        <p className="text-[14px] lg:!text-[16px] font-[600] text-[#121212]">
          {order?.items?.[0]?.product?.title}
        </p>
        <div className="flex items-center justify-between mt-4 text-[14px]">
          <span className="text-main_color text-[16px]">{order?.total.toLocaleString()} تومان</span>
            <span className="text-[#121212] text-[14px]">{order?.items?.[0]?.quantity} عدد</span>
        </div>
      </div>
    </div>
  );
}

export default FinalPaymentProduct;
