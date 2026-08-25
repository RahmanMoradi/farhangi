"use client";
import React from "react";
import Image from "next/image";

export default function AddressBox({ addresses }) {

    const englishToPersianDigits = (str) => {
      if (!str) return str;
      const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
      const englishDigits = "0123456789";
      return str.replace(/[0-9]/g, (char) => persianDigits[englishDigits.indexOf(char)]);
    };
  
    return (
      <div
        className="flex flex-col gap-[12px]"
      >
        {addresses.length > 0 ? (
          addresses.map((address, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl bg-gradient-to-b from-[#efeff0] via-[#efeff080] to-[#efeff0a4] p-[12px]"
              >
                <div
                  className="items-center"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "12px",
                    padding: "15px 10px",
                    gap: '6px' 
                  }}
                >
                  <Image
                    width={100}
                    height={100}
                    src="/images/account/icon/address.svg"
                    className="w-4 h-4"
                    alt="address"
                  />
                  <span
                    className="text-[14px] text-black_12 font-yekan"
                    style={{
                      fontSize: "14px",
                      color: "#333", 
                      marginLeft: "8px", 
                    }}
                  >
                    {englishToPersianDigits(address?.street || "")}، پلاک {englishToPersianDigits(address?.house_number?.toString() || "")}، واحد {englishToPersianDigits(address?.unit?.toString() || "")}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div
            className="items-center rounded-xl bg-gradient-to-l from-[#efeff0] via-[#efeff080] to-[#efeff0a4] p-5"
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
              در حال حاضر، آدرسی ثبت نشده است.
            </p>
          </div>
        )}
      </div>
  );
}
