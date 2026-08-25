import React from "react";
import Link from "next/link";
import Image from "next/image";

function ContactSupport() {
  return (
    <div className="p-4 lg:mt-5">
      <div>
        <div className="text-black_12 text-xl flex gap-1.5 items-center">
          <Image
            width={100}
            height={100}
            src="/images/contact-us/call.svg"
            alt="call"
            className="w-6"
          />
          <span className="text-[17px] font-semibold font-yekan">
            تماس با پشتیبانی
          </span>
        </div>
        <p className="text-[#595959] mt-2 text-[14px] font-yekan">
          شما می توانید از راه های ارتباطی زیر با ما تماس بگیرید
        </p>
      </div>
      {/*  */}
      <div className="mt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div className="p-2 mt-1.5 lg:mt-0 rounded-[12px] border-[2px] border-light_brown_600 flex justify-between items-center">
          <span className="text-black_12 text-[16px] font-yekan">پشتیبانی مشتریان</span>
          <Link href="tel:05132222614" className="bg-black p-1.5 font-yekan px-2 rounded-[8px] text-white text-[16px] flex items-center justify-center cursor-pointer">
            051-32222614
          </Link>
        </div>
        <div className="p-2 mt-3 lg:mt-0 rounded-[12px] border-[2px] border-light_brown_600 flex justify-between items-center">
          <span className="text-black_12 text-[16px] font-yekan">پشتیبانی فروشگاه</span>
          <Link href="tel:05132217620" className="bg-black p-1.5 px-2 font-yekan rounded-[8px] text-white text-[16px] flex items-center justify-center cursor-pointer">
            051-32217620
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ContactSupport;
