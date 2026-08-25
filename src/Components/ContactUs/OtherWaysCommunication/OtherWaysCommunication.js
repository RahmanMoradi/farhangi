import React from "react";
import Image from "next/image";
import Link from "next/link";

function OtherWaysCommunication() {
  return (
    <div className="p-4 mt-4">
      <div className="border-t-[1px] border-t-light_brown_600 py-4 lg:py-8 lg:flex lg:items-center lg:justify-between">
        <div className="flex">
          <div>
            <Image
              width={100}
              height={100}
              src="/images/contact-us/location.svg"
              alt="location"
              className="w-6"
            />
          </div>
          <span className="mr-1.5 text-[16px] font-semibold font-yekan">آدرس فروشگاه</span>
        </div>
        <p className="text-Gray59 font-yekan mt-1">مشهد، خیابان امام خمینی، امام خمینی 7، کوچه سجادی، پلاک 66</p>
      </div>
      <div className="border-t-[1px] border-t-light_brown_600 pt-4 lg:pt-8 lg:flex lg:items-center lg:justify-between">
        <div className="flex">
          <div>
            <Image
              width={100}
              height={100}
              src="/images/contact-us/sms.svg"
              alt="location"
              className="w-6"
            />
          </div>
          <span className="mr-1.5 text-[16px] font-semibold font-yekan">آدرس ایمیل</span>
        </div>
        <Link href="mailto:mehranstore.official@gmail.com" className="text-Gray59 mt-1 cursor-pointer font-yekan">
          _____
        </Link>
      </div>
    </div>
  );
}

export default OtherWaysCommunication;
