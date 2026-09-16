import React from "react";
import Image from "next/image";

function OrderProduct({ orders }) {

  return (
    <div className="flex flex-col gap-[12px]">
      {orders.length > 0 ? (
        orders.map((order, index) => {
          return (
            <div
              key={index}
              className="w-full bg-gradient-to-b from-[#efeff0] via-[#efeff080] to-[#efeff0a4] p-[12px] rounded-xl"
            >
              <div className="relative flex items-center">
                <div className="ml-3">
                  <Image 
                    width={120}
                    height={120}
                    src={order?.items?.[0]?.product?.images?.[0] || "/images/product.png"}
                    alt="order image"
                    className="rounded-xl"
                  />
                </div>
                <div className="w-full">
                  <span className="text-[15px] font-semibold font-yekan text-black_12">
                    {order?.items?.[0]?.product?.title}
                  </span>
                  <div className="flex items-center mt-1">
                    <span className="text-main_color text-[14px] font-medium font-yekan">
                      قیمت کل:
                    </span>
                    <span className="text-main_color text-[14px] font-medium font-yekan">
                      {order?.items?.[0]?.product?.price?.toLocaleString() || "0"} تومان
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <span className="text-Gray59 text-[13px] font-yekan">تاریخ سفارش:</span>
                      <span 
                        className="text-Gray59 text-[13px] font-yekan" 
                        style={{ direction: 'rtl' }}
                      >
                        {order?.date || "نامشخص"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-Gray59 text-[13px] font-yekan">تعداد آیتم ها:</span>
                      <p className="text-Gray59 text-[13px] font-yekan">{order?.items?.length || 0}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <Image
                        width={120}
                        height={120}
                        src="/images/account/icon/money2.svg"
                        alt="payment"
                        className="w-3.5 h-3.5"
                      />
                      <span className="text-Gray59 text-[12px] font-yekan">نوع پرداخت:</span>
                      <span className="text-Gray59 text-[12px] font-yekan">نقدی</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <div
          className="items-center rounded-xl bg-gradient-to-l from-[#efeff0] via-[#efeff080] to-[#efeff0a4]"
          style={{
            display: "flex",
            alignItems: "center",
            borderRadius: "12px",
            background: "linear-gradient(to left, #efeff0, rgba(239, 239, 240, 0.5), rgba(239, 239, 240, 0.64))",
            padding: "15px 10px",
          }}
        >
          <p
            className="text-[14px] font-yekan"
            style={{
              fontSize: "14px",
            }}
          >
            در حال حاضر، سفارشی ثبت نشده است.
          </p>
        </div>
      )}
    </div>
    
  );
}

export default OrderProduct;
