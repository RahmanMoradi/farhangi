import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation } from "swiper/modules";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRouter } from "next/navigation";
import SliderProductBox from "../ProductBox/SliderProductBox";
import axios from "axios";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";

function DiscountedProductsSlider() {
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const router = useRouter();

  const getDiscountedProducts = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/products?filter[discounted]=true`)
      .then((res) => {
        setDiscountedProducts(res.data.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getDiscountedProducts();
  }, []);

  const handleViewProductsClick = () => {
    router.push("/product?filter[discounted]=true");
  };

  return (
    <div className="border border-[#ffd7d9] pt-[1px] rounded-xl lg:mb-0 mb-8">
      <div className="flex items-center justify-between bg-gradient-to-l from-main_color to-[#ec008e8c] rounded-xl px-5 py-3.5 m-3">
        <h2 className="text-white font-bold font-yekan">محصولات تخفیف دار</h2>
        <button
          className="flex gap-1 items-center"
          onClick={handleViewProductsClick}
        >
          <h3 className="text-white text-[14px] font-semibold font-yekan">مشاهده همه</h3>
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
        className="DiscountedProducts mt-4 mb-3"
      >
        {discountedProducts.map((discounted) => (
          <SwiperSlide key={discounted}>
            <SliderProductBox productInfo={discounted} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default DiscountedProductsSlider;
