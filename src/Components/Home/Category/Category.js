"use client";
import React, { useState, useCallback, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import Title from "../Title/Title";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const getCategories = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      const allCategories = res.data.data || [];
      console.log("categories:", res.data.data);
      const parentCategories = allCategories.filter(cat => cat.parent_id === null);
      setCategories(parentCategories);
    } catch (err) {
      console.error("Error fetching categories:", err.response?.data?.message || err.message);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);


  const handleCategoryClick = (categoryId) => {
    const id =
      categoryId && typeof categoryId === "object"
        ? (categoryId.categoryId ?? categoryId.id ?? categoryId.slug ?? null)
        : categoryId;

    if (!id || id === "#" || id === "0") {
      router.push("/product");
      return;
    }

    const encoded = encodeURIComponent(String(id));
    router.push(`/product?filter[category]=${encoded}`);
  };

  return (
    <>
      <Title text="دسته بندی محصولات" style="h-[1px]" />
      <Swiper
        className="mySwiper mt-10 items-center justify-center"
        slidesPerView={3.5}
        spaceBetween={20}
        breakpoints={{
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.id}>
            <div 
              className="m-auto flex flex-col items-center justify-center cursor-pointer"
              onClick={() => handleCategoryClick(cat.id)}
            >
              <div className="flex lg:w-[95px] lg:h-[95px] w-[60px] h-[60px] rounded-full bg-[#f3f3f3] items-center justify-center">
                <Icon icon={cat.icon} width="40" height="40" />
              </div>
              <h3 className="text-Gray59 lg:text-[15px] text-[12px] font-yekan text-center mt-3">
                {cat.name}
              </h3>
            </div> 
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
