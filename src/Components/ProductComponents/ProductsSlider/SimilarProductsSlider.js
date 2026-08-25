import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation, Pagination } from "swiper/modules";
import SliderProductBox from "../ProductBox/SliderProductBox";
import Title from "@/Components/Home/Title/Title";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

function SimilarProductsSlider({ productInfo, text, classNameTitle = "" }) {
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    if (productInfo?.category?.id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?filter[category]=${productInfo.category.id}`)
        .then((res) => res.json())
        .then((resData) => {
          const productArray = Array.isArray(resData.data) ? resData.data : resData;
          const filtered = productArray.filter((p) => p.id !== productInfo.id);
          setSimilarProducts(filtered);
        });
    }
  }, [productInfo]);
  console.log("similar products:", similarProducts);

  return (
    <div className="pt-[1px] mt-6">
      <div className="items-center text-center">
        <Title text={text} style="h-[1px]" classNameText={classNameTitle} />
      </div>
      <Swiper
        slidesPerView={1.5}
        centeredSlides={false}
        slidesPerGroupSkip={1}
        spaceBetween={16}
        grabCursor={true}
        keyboard={{ enabled: true }}
        breakpoints={{
          640: { slidesPerView: 3, slidesPerGroup: 2 },
          768: { slidesPerView: 4, slidesPerGroup: 2 },
          1024: { slidesPerView: 4.5, slidesPerGroup: 2 },
          1280: { slidesPerView: 7.3, slidesPerGroup: 2 },
        }}
        navigation
        pagination={{ clickable: true }}
        modules={[Keyboard, Navigation, Pagination]}
        className="SimilarProducts mt-3"
      >
        {Array.isArray(similarProducts) && similarProducts.length ? (
          similarProducts.map((e) => (
            <SwiperSlide key={e.id}>
              <SliderProductBox productInfo={e} />
            </SwiperSlide>
          ))
        ) : (
          <div className="text-center text-[#3f4064] text-[15px] font-[600]">محصولی یافت نشد</div>
        )}
      </Swiper>
    </div>
  );
}

export default SimilarProductsSlider;