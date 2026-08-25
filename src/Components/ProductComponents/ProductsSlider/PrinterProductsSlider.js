import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation } from "swiper/modules";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRouter } from "next/navigation";
import SliderProductBox from "../ProductBox/SliderProductBox";
import axios from "axios";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

function PrinterProductSlider() {
  const [mobileProducts, setMobileProducts] = useState([]);
  const [printerCategory, setPrinterCategory] = useState([]); 
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?filter[category]=019c5bff-10f1-725b-9d38-9c48afc4e123`)
      .then((res) => res.json())
      .then((resData) => {
        const mobileProductArray = Array.isArray(resData.data) ? resData.data : resData;
        setMobileProducts(mobileProductArray);
      });
  }, []);

  const getPrinterCategory = useCallback(async () => {
    try{
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      const allCategories = res.data.data || [];

      const printer = allCategories.find(
        cat => cat.name == "پرینتر" || cat.slug == "پرینتر"
      );

      setPrinterCategory(printer || null);
    } catch (err) {
      console.error("Error fetching categories:", err.response?.data?.message || err.message);
    }
  });

  useEffect(() => {
    getPrinterCategory();
  }, [getPrinterCategory]);
 
  const handleViewPrinterProducts = (category) => {
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
  };
  
  return (
    <div className={`border border-gray rounded-xl pt-[1px] mt-8 pr-1 pb-0`}>
      <div className="flex items-center justify-between bg-gradient-to-l from-main_color to-[#ec008e8c] rounded-xl px-5 py-3.5 m-3">
        <h3 className="text-white font-bold font-yekan">پرینتر</h3>
        <button
          className="flex gap-1 items-center"
          onClick={() => handleViewPrinterProducts(printerCategory)}
        >
          <h4 className="text-white text-[14px] font-semibold font-yekan">مشاهده همه</h4>
          <MdKeyboardArrowLeft className="text-white font-semibold" />
        </button>
      </div>
      <Swiper
        slidesPerView={1.5}
        centeredSlides={false}
        slidesPerGroupSkip={1}
        spaceBetween={15}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            slidesPerGroup: 2,
          },
          768: {
            slidesPerView: 4,
            slidesPerGroup: 2,
          },
          1024: {
            slidesPerView: 4.5,
            slidesPerGroup: 2,
          },
          1280: {
            slidesPerView: 7.3,
            slidesPerGroup: 2,
          },
        }}
        navigation
        modules={[Keyboard, Navigation]}
        className="MobileProducts mt-4 lg:mb-4 mb-0"
      >
        {Array.isArray(mobileProducts) && mobileProducts.length
          ? mobileProducts.map((e) => (
              <SwiperSlide key={e.id}>
                <SliderProductBox productInfo={e} />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  );
}

export default PrinterProductSlider;
