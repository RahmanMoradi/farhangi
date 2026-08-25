// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { PiCheckCircleLight } from "react-icons/pi";
import { Navigation } from "swiper/modules";
import React from "react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const customers = [
  {id: 1, title: 'شهرداری', src: '/images/home/customers/shahrdari.png'},
  {id: 2, title: 'اسنپ', src: '/images/home/customers/snapp.png'},
  {id: 3, title: 'دانشگاه علوم پزشکی مشهد', src: '/images/home/customers/university.png'},
  {id: 4, title: 'ناجا', src: '/images/home/customers/naja.png'},
  {id: 5, title: 'سازمان تامین اجتماعی', src: '/images/home/customers/tamin.png'},
  {id: 6, title: 'بانک رفاه', src: '/images/home/customers/refah.png'},
  {id: 7, title: 'شرکت توزیع نیروی برق', src: '/images/home/customers/electericity.png'},
  {id: 8, title: 'وزارت تعاول کار و رفاه اجتماعی', src: '/images/home/customers/cooperatives.png'},
];

function Customers () {
    return (
        <div className="flex xl:flex-row flex-col xl:border border-b border-gray xl:rounded-xl">
          <div 
            className="flex flex-col gap-1.5 xl:w-[13%] items-center justify-center bg-gradient-to-l from-main_color to-[#ec008e8c] 
            xl:rounded-tr-[10px] xl:rounded-br-[10px] p-1"
          >
            <PiCheckCircleLight size={27} className="text-white hidden xl:block" />
            <h3 className="text-white font-bold font-yekan xl:text-[17px] text-[14px]">مشتریان ما</h3>
          </div>
          <div className="lg:w-[86%] w-full">
            <Swiper
              className="DiscountedProducts"
              style={{ marginLeft: 0 }}
              slidesPerView={3.5}
              spaceBetween={0}
              breakpoints={{
                768: {
                  slidesPerView: 5,
                },
                1024: {
                  slidesPerView: 6,
                },
                1280: {
                  slidesPerView: 6,
                },
              }}
              navigation
              modules={[Navigation]}
            >
              {customers.map((customer, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="flex flex-col gap-2 my-6 items-center border-l border-gray justify-center w-full h-24"
                  >
                    <Image
                      width={2000}
                      height={2000}
                      src={customer.src}
                      alt={customer.title}
                      className="w-28"
                    />
                    <h4 className="font-yekan font-semibold text-[13px] text-black_12">{customer.title}</h4>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
    );
}

export default Customers;

