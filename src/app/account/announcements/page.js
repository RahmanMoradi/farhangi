import { Icon } from "@iconify/react";
import SideBarAccount from "@/Components/Account/SideBarAccount/SideBarAccount";
import Navbar from "@/Components/Navbar/Navbar";
import Menu from "@/Components/menu/Menu";
import React from "react";
import Footer from "@/Components/Footer/Footer";

function Announcements() {
  return (
    <>
    <div className="body mb-16">
      <Navbar />
      <div className="lg:flex main-style lg:gap-8 lg:mt-8">
        <div className="hidden lg:block lg:flex-1">
          <SideBarAccount />
        </div>
        <div className="lg:flex-[2.7]">
          <span className="mb-2 text-[20px] font-yekan">اعلانات</span>
          <div className="bg-light_brown_200 p-3.5 flex items-center rounded-xl">
            <div className="p-4 bg-light_brown_600 rounded-full w-min h-min">
              <Icon
                icon="charm:tick"
                width="25"
                height="25"
                className="text-[#00BA44]"
              />
            </div>
            <div className="text-[12px] mr-2.5">
              <p className="text-black_12 font-yekan">
                کاربر گرامی وضعیت اقساط شما به تایید شده تغییر پیدا کرد
              </p>
              <p className="text-main_color flex items-center mt-1 font-yekan">
                رفتن به صفحه وضعیت اقساط
                <Icon
                  icon="majesticons:arrow-left-line"
                  width="24"
                  height="24"
                />
              </p>
            </div>
          </div>
          {/*  */}
          <div className="bg-light_brown_200 p-3.5 flex items-center rounded-xl mt-3">
            <div className="p-4 bg-light_brown_600 rounded-full w-min h-min">
              <Icon
                icon="hugeicons:discount"
                width="25"
                height="25"
                className="text-main_color"
              />
            </div>
            <div className="text-[12px] mr-2.5">
              <p className="text-black_12 font-yekan">
                20% تخفیف برای خرید محصولات دیجیتالی
              </p>
              <p className="text-main_color font-yekan flex items-center mt-2">
                رفتن به صفحه وضعیت اقساط
                <Icon
                  icon="zondicons:copy"
                  width="20"
                  height="20"
                  className="mr-1"
                />
              </p>
            </div>
          </div>
          {/*  */}
          <div className="bg-light_brown_200 p-3.5 flex items-center rounded-xl mt-3">
            <div className="p-4 bg-light_brown_600 rounded-full w-min h-min">
              <Icon
                icon="charm:tick"
                width="25"
                height="25"
                className="text-[#00BA44]"
              />
            </div>
            <div className="text-[12px] mr-2.5">
              <p className="text-black_12 font-yekan">
                کاربر گرامی سفارش شما (گوشی شیائومی نوت 14 پرو) در مرحله ارسال
                می باشد
              </p>
              <p className="text-main_color font-yekan flex items-center mt-1">
                رفتن به صفحه وضعیت سفارش
                <Icon
                  icon="majesticons:arrow-left-line"
                  width="24"
                  height="24"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
      <Menu select="account" />
    </div>
    <Footer />
    </>
  );
}

export default Announcements;
