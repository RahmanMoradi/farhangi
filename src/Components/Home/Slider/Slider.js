"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState, useCallback, useEffect } from "react";
import { Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";

export default function Slider() {
  const router = useRouter();
  const [houseHoldCategory, setHouseHoldCategory] = useState(null);
  const [accessoryCategory, setAccessoryCategory] = useState(null);

  {/*const getAndFilterCategories = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      const allCategories = res.data.data || [];

      // پیدا کردن دسته لوازم خانگی
      const houseHold = allCategories.find(
        cat => cat.name === "لوازم خانگی" || cat.slug === "لوازم-خانگی"
      );

      // پیدا کردن دسته اکسسوری
      const accessory = allCategories.find(
        cat => cat.name === "کالای  دیجیتال" || cat.slug === "کالای-دیجیتال"
      );

      setHouseHoldCategory(houseHold || null);
      setAccessoryCategory(accessory || null);
    } catch (err) {
      console.error("Error fetching categories:", err.response?.data?.message || err.message);
    }
  }, []);

  useEffect(() => {
    getAndFilterCategories();
  }, [getAndFilterCategories]);*/}

  {/*const handleCategoryClick = (category) => {
    if (!category) {
      router.push("/product");
      return;
    }

    const id = typeof category === "object"
      ? category.id || category.slug || category.categoryId
      : category;

    if (!id || id === "#" || id === "0") {
      router.push("/product");
      return;
    }

    const encoded = encodeURIComponent(String(id));
    router.push(`/product?filter[category]=${encoded}`);
  };*/}

  const handleCategoryClick = () => {
    router.push("/product");
  };

  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper rounded-xl mt-6">
        <SwiperSlide>
          <div 
            className="relative w-full cursor-pointer"
            onClick={handleCategoryClick}
          >
            <Image
              src="/images/home/hero/office-desktop.webp"
              alt="تجهیزات اداری فرهنگی"
              priority
              unoptimized
              width={1440}
              height={500}
              className="hidden w-full md:block"
            />
            <Image
              src="/images/home/hero/office-mobile.webp"
              alt="تجهیزات اداری فرهنگی"
              priority
              unoptimized
              width={395}
              height={256}
              className="w-full md:hidden"
            />
            <div className="absolute inset-y-0 right-[7%] flex w-[42%] flex-col justify-center text-right text-stone-800" style={{ fontFamily: "yekan-bakh, sans-serif" }}>
              <h1 className="text-xl font-bold md:text-4xl">دفترتان را حرفه‌ای‌تر اداره کنید</h1>
              <p className="mt-2 text-xs md:text-lg">راهکارهای مطمئن چاپ، کپی و اسکن برای کار روزانه</p>
              <span className="mt-4 text-sm font-bold md:text-base">مشاهده محصولات</span>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div 
            className="relative w-full cursor-pointer"
            onClick={handleCategoryClick}
          >
            <Image
              src="/images/home/hero/technology-desktop.webp"
              alt="پرفروش‌ترین تجهیزات اداری"
              priority
              unoptimized
              width={1440}
              height={500}
              className="hidden w-full md:block"
            />
            <Image
              src="/images/home/hero/technology-mobile.webp"
              alt="پرفروش‌ترین تجهیزات اداری"
              priority
              unoptimized
              width={395}
              height={256}
              className="w-full md:hidden"
            />
            <div className="absolute inset-y-0 right-[7%] flex w-[42%] flex-col justify-center text-right text-stone-800" style={{ fontFamily: "yekan-bakh, sans-serif" }}>
              <h2 className="text-xl font-bold md:text-4xl">انتخاب‌های محبوب کسب‌وکارها</h2>
              <p className="mt-2 text-xs md:text-lg">تجهیزات ضروری برای فروشگاهی حرفه‌ای‌تر</p>
              <span className="mt-4 text-sm font-bold md:text-base">مشاهده محصولات</span>
            </div>
          </div>
        </SwiperSlide>

        {/*<SwiperSlide>
          <div 
            className="hidden md:block w-full xl:h-[500px] cursor-pointer"
            onClick={handleSendToChatBot}
          >
            <Image
              width={100000}
              height={100000}
              src="/images/home/slider/free-consultation.webp"
              className="w-full h-full object-cover"
              alt="free-consultation"
              priority
            />
          </div>
          <div 
            className="block md:hidden w-full h-[260px] cursor-pointer"
            onClick={handleSendToChatBot}
          >
            <Image
              width={10000}
              height={10000}
              src="/images/home/slider/free-consultation-mobile.webp"
              alt="free-consultation-mobile"
              priority
            />
          </div>
        </SwiperSlide>*/}
      </Swiper>
    </>
  );
}
