"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const information = [
  {title: 'اطلاعات حساب', icon: "/images/account/icon/user.svg", href: '/account'},
  {title: 'اعلانات', icon: "/images/account/icon/notification.svg", href: '/account/announcements'},
  {title: 'سفارشات', icon: "/images/account/icon/shopping-cart.svg", href: '/account/orders'},
  {title: 'آدرس ها', icon: "/images/account/icon/location.svg", href: '/account/address'}
];

const supports = [
  {title: 'پشتیبانی', icon: '/images/account/icon/headphone.svg', href: '#'}
];

function SideBarAccount() {
  const currentPath = usePathname() || "";

  return (
    <div className="p-4 rounded-3xl bg-gradient-to-b from-[#efeff0] via-[#efeff080] to-[#efeff0a4]">
      {/* Account Start */}
      <div className="font-semibold font-yekan mr-1">حساب</div>
      <div className="border-b border-b-light_brown_600 pb-1">
        <div className="flex flex-col gap-1 py-2 pt-2">
          {/* information */}
          {information.map((info, index) => (
            <div 
              key={index}
              className="p-3 rounded-xl"
              style={{ backgroundColor: currentPath === info.href ? "#FFCACA" : "transparent" }}
            >
              <Link
                href={info.href}
                className={`text-[14px] flex items-center font-yekan text-black_12`}
              >
                <Image
                  src={info.icon}
                  width="24"
                  height="24"
                  className="text-black_12 ml-2.5"
                  alt={info.title}
                />
                {info.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* Account End */}
      {/* Learn More Start */}
      <div className="font-semibold font-yekan mt-5 mb-1.5 mr-1">بیشتر بدانید</div>
      <div>
        <div className="py-4 pt-2">
          {supports.map((support, index) => (
            <div
              key={index}
              className="p-3 rounded-xl"
              style={{ backgroundColor: currentPath === support.href ? "#FFCACA" : "transparent" }}
            >
              <Link
                href={support.href}
                className={`text-[14px] font-yekan flex items-center text-black_12`}
              >
                <Image
                  src={support.icon}
                  width="24"
                  height="24"
                  className="text-black_12 ml-2.5"
                   alt={support.title}
                />
                  {support.title}
              </Link>
            </div>
            ))}
        </div>
      </div>
      {/* Learn More End */}
    </div>
  );
}

export default SideBarAccount;
