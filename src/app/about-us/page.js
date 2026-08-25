"use client";
import React from "react";
import Image from "next/image";
import Menu from "@/Components/menu/Menu";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";

function AboutUs() {

  function toPersianNumber(value) {
    if (value === undefined || value === null) return '';
    return value.toString().replace(/[0-9]/g, function(d) {
      return '۰۱۲۳۴۵۶۷۸۹'[d];
    });
  };

  return (
    <>
      <div className="body mb-12 lg:mb-32">
        <Navbar />
        <div className="mt-7">
          <div className="hidden lg:block relative w-full h-[160px]">
            <Image
              src="/images/about-us/about-us.webp"
              alt="background"
              fill
              className="object-cover rounded-[16px]"
              loading="eager"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                width={500}
                height={500}
                src="/images/about-us/line.svg"
                alt="divider"
                className="h-full"
                loading="eager"
              />
              <span className="text-[28px] font-bold font-yekan text-[#F4F4F4] text-center w-40 mx-2.5">
                درباره ما 
              </span>
              <Image
                width={500}
                height={500}
                src="/images/about-us/line.svg"
                alt="divider"
                className="h-full"
                loading="eager"
              />
            </div>
          </div>
          <div className="relative block lg:hidden mt-5">
            <Image
              width={1000}
              height={1000}
              src="/images/about-us/about-us-mobile.webp"
              alt="about-us-mobile"
              className="block lg:hidden w-full"
            />
            <div className="w-full absolute top-[40%] flex items-center">
              <Image
                width={1000}
                height={1000}
                src="/images/about-us/mobile-line.svg"
                alt="divider"
                className="w-[85%] h-full"
                loading="eager"
              />
              <span className="text-[20px] font-bold font-yekan text-[#F4F4F4] w-40 mx-2.5">
                درباره ما
              </span>
              <Image
                width={1000}
                height={1000}
                src="/images/about-us/mobile-line.svg"
                alt="divider"
                className="w-[85%] h-full"
                loading="eager"
              />
            </div>
          </div>
          <div className="mt-12 w-full relative pb-12">
            {/*  */}
            <div className="flex flex-col justify-center w-full">
              <p className="w-full text-justify text-[13px] font-yekan lg:text-[16px] leading-[30px] mt-2 text-[#484C52]">
                فروشگاه فرهنگی دارای مجموعه‌ای جامع از ماشین‌های اداری، لپ‌تاپ و کامپیوتر، لوازم جانبی و مواد مصرفی، با تمرکز ویژه بر محصولات استوک، است.
              </p>
              <h3 className="font-yekan font-semibold mt-2">دسته بندی محصولات به شرح زیر است:</h3>
              <ul className="flex flex-col list-disc mr-7 mt-1">
                <li className="text-justify text-[13px] lg:text-[16px] font-yekan leading-[30px] mt-2 text-[#484C52]">
                  کالای استوک: محصولات استوک شامل ماشین‌های اداری، لپ‌تاپ و کامپیوتر با کیفیت تست‌شده و گارانتی معتبر
                </li>
                <li className="text-justify text-[13px] lg:text-[16px] font-yekan leading-[30px] mt-2 text-[#484C52]">
                  محصولات استوک گریدبندی شده: امکان انتخاب متناسب محصولات با نیاز و بودجه 
                </li>
                <li className="text-justify text-[13px] lg:text-[16px] font-yekan leading-[30px] mt-2 text-[#484C52]">
                  کامپیوتر و لپ‌تاپ: انواع لپ‌تاپ و کامپیوترهای رومیزی نو و استوک با برندهای معتبر و مشخصات فنی متنوع
                </li>
                <li className="text-justify text-[13px] lg:text-[16px] font-yekan leading-[30px] mt-2 text-[#484C52]">
                  ماشین‌های اداری: انواع ماشین‌های اداری شامل پرینتر، اسکنر، فکس و دستگاه‌های کپی نو و استوک با برندهای معتبر 
                </li>
                <li className="text-justify text-[13px] lg:text-[16px] font-yekan leading-[30px] mt-2 text-[#484C52]">
                  لوازم تحریر و اداری: انواع لوازم تحریر و اداری موردنیاز با کیفیت و قیمت مناسب
                </li>
                <li className="text-justify text-[13px] lg:text-[16px] font-yekan leading-[30px] mt-2 text-[#484C52]">
                  لوازم جانبی و مواد مصرفی: انواع لوازم جانبی کامپیوتر و ماشین‌های اداری و مواد مصرفی
                </li>
                <li className="text-justify text-[13px] lg:text-[16px] font-yekan leading-[30px] mt-2 text-[#484C52]">
                  کاغذ: انواع کاغذ در سایزها و کیفیت‌های مختلف با قیمت مناسب
                </li>
              </ul>
            </div>
          </div>
          {/*  */}
          <div className="mt-10 lg:grid lg:grid-cols-3 lg:gap-3.5">
            <div className="flex flex-col items-center justify-center rounded-2xl border border-light_brown_600 bg-transparent mt-2.5 text-[#7E1011] p-4 text-center bg-[#F9F9F9]">
              <div className="flex items-center gap-1">
                <span className="text-[24px] font-semibold font-yekan">
                  {toPersianNumber(150)}
                </span>
                <span className="text-[24px] font-bold font-yekan">+</span>
              </div>
              <div className="text-[14px] font-bold font-yekan">رضایت مشتری</div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl border border-light_brown_600 mt-2.5 text-[#F9F9F9] p-4 text-center bg-main_color">
              <div className="flex items-center gap-1">
                <span className="text-[24px] font-semibold font-yekan">
                  {toPersianNumber(160)}
                </span>
                <span className="text-[24px] font-bold font-yekan">+</span>
              </div>
              <span className="text-[14px] font-bold font-yekan">سفارش در ماه</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl border border-light_brown_600 bg-transparent mt-2.5 text-[#7E1011] p-4 text-center bg-[#F9F9F9]">
              <div className="flex items-center gap-1">
                <span className="text-[24px] font-semibold font-yekan">
                  {toPersianNumber(200)}
                </span>
                <span className="text-[24px] font-bold font-yekan">+</span>
              </div>
              <div className="text-[14px] font-bold font-yekan">مشتری در ماه</div>
            </div>
          </div>
          {/*  */}
          <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-y-16 lg:gap-x-36 lg:mt-44 lg:mx-36 xl:px-14">
            {/*  */}
            <div className="relative flex mt-4 lg:mt-0 items-center bg-[#ededed7c] overflow-hidden rounded-[12px] px-4 py-8">
              <div className="rounded-[12px] p-2 bg-main_color text-white ml-2.5">
                <Image
                  height={100}
                  width={100}
                  src="/images/about-us/delivery.svg"
                  alt="delivery"
                  className="w-6"
                />
              </div>
              <span className="text-[16px] font-yekan">حمل و نقل سریع و مطمئن</span>
              <div className="absolute left-0">
                <Image
                  height={100}
                  width={100}
                  src="/images/about-us/delivery-bold.svg"
                  alt="delivery-bold"
                />
              </div>
            </div>
            {/*  */}
            {/*  */}
            <div className="relative flex mt-4 lg:mt-0 items-center bg-[#ededed7c] overflow-hidden rounded-[12px] px-4 py-8">
              <div className="rounded-lg p-2 bg-main_color text-white ml-2.5">
                <Image
                  width={100}
                  height={100}
                  src="/images/about-us/verified.svg"
                  alt="verified"
                  className="w-6"
                />
              </div>
              <span className="text-[16px] font-yekan">پشتیبانی حرفه ای و 24 ساعته</span>
              <div className="absolute top-0 left-0">
                <Image
                  height={100}
                  width={100}
                  src="/images/about-us/verified-bold.svg"
                  alt="verified-bold"
                  className="w-28"
                />
              </div>
            </div>
            {/*  */}
            {/*  */}
            <div className="relative flex mt-4 lg:mt-0 items-center bg-[#ededed7c] overflow-hidden rounded-[12px] px-4 py-8">
              <div className="rounded-lg p-2 bg-main_color text-white ml-2.5">
                <Image
                  width={100}
                  height={100}
                  src="/images/about-us/user.svg"
                  alt="user"
                  className="w-6"
                />
              </div>
              <span className="text-[16px] font-yekan">تضمین اصالت محصولات</span>
              <div className="absolute left-0">
                <Image
                  height={100}
                  width={100}
                  src="/images/about-us/user-bold.svg"
                  alt="user-bold"
                />
              </div>
            </div>
            {/*  */}
            {/*  */}
            <div className="relative flex mt-4 lg:mt-0 items-center bg-[#ededed7c] overflow-hidden rounded-[12px] px-4 py-8">
              <div className="rounded-lg p-2 bg-main_color text-white ml-2.5">
                <Image
                  width={100}
                  height={100}
                  src="/images/about-us/card.svg"
                  alt="card"
                  className="w-6"
                />
              </div>
              <span className="text-[16px] font-yekan">پرداخت از طریق درگاه شتاب</span>
              <div className="absolute top-0 left-0">
                <Image
                  height={100}
                  width={100}
                  src="/images/about-us/card-bold.svg"
                  alt="card-bold"
                  className="w-28"
                />
              </div>
            </div>
            {/*  */}
          </div>
        </div>
      <Menu />
    </div>
    <div>
      <Footer />
    </div>
    </>
  );
}

export default AboutUs;
