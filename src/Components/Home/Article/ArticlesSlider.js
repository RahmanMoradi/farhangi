import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";

import { Keyboard } from "swiper/modules";
import Title from "@/Components/Home/Title/Title";
import ArticleBox from "./ArticleBox";
import { Icon } from "@iconify/react";

function ArticlesSlider({ products_info, text }) {
  return (
    <>
      <div className="mt-8 lg:mt-24">
        <div>
          <Title text={text} style="h-[1px]" classNameText="bg-white" />
        </div>
        <Swiper
          slidesPerView={1.3}
          centeredSlides={false}
          slidesPerGroupSkip={1}
          spaceBetween={-20}
          grabCursor={true}
          keyboard={{
            enabled: true,
          }}
          breakpoints={{
            500: {
              slidesPerView: 2,
              slidesPerGroup: 1.5,
            },
            768: {
              slidesPerView: 3,
              slidesPerGroup: 1.5,
            },
            1024: {
              slidesPerView: 3,
              slidesPerGroup: 2.2,
            },
            1280: {
              slidesPerView: 4,
            },
            1400: {
              slidesPerView: 5,
            },
          }}
          modules={[Keyboard]}
          className="mySwiper mt-3"
        >
          {products_info.map((e) => (
            <SwiperSlide key={e}>
              <ArticleBox />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex items-center justify-center mb-16">
        <div className="text-white bg-gradient-to-l from-main_color to-[#ec008e8c] rounded-xl p-2 mt-4 mb-5 hidden lg:flex gap-2 font-yekan">
          مشاهده بیشتر
          <Icon icon="mynaui:arrow-left" width="24" height="24" />
        </div>
      </div>
    </>
  );
}

export default ArticlesSlider;
