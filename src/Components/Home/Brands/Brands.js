// Import Swiper React components
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { PiCheckCircleLight } from "react-icons/pi";
import { Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const brands = [
  {
    id: 1,
    title: 'hp',  
    src: '/images/home/brands/HP.png'
  },
  {
    id: 2,
    title: 'canon', 
    src: '/images/home/brands/canon.png'
  },
  {
    id: 3,
    title: 'dell', 
    src: '/images/home/brands/dell.png'
  },
  {
    id: 4,
    title: 'hansol', 
    src: '/images/home/brands/hansol.png'
  },
  {
    id: 5,
    title: 'xiang',
    src: '/images/home/brands/xiang.png'
  },
  {
    id: 6,
    title: 'snbc',
    src: '/images/home/brands/snbc.png'
  },
  {
    id: 7,
    title: 'zebra',
    src: '/images/home/brands/zebra.png'
  },
  {
    id: 8,
    title: 'xprinter',
    src: '/images/home/brands/xprinter.png'
  },
  {
    id: 9,
    title: 'brother hl',
    src: '/images/home/brands/brother-hl.png'
  }
];

function Brands() {
  const router = useRouter();

  const handleBrandClick = (brandId) => {
    if (brandId && brandId !== "#") {
      router.push(`/product?filter[brands]=${brandId}`);
    } else {
      router.push('/product');
    }
  };

  return (
    <div className="flex xl:flex-row flex-col xl:border border-b border-gray xl:rounded-xl">
      <div 
        className="flex flex-col gap-1.5 xl:w-[13%] items-center justify-center bg-gradient-to-l from-main_color to-[#ec008e8c]
        xl:rounded-tr-[10px] xl:rounded-br-[10px] p-1"
      >
        <PiCheckCircleLight size={27} className="text-white hidden xl:block" />
        <h3 className="text-white font-bold font-yekan xl:text-[17px] text-[14px]">برندهای منتخب</h3>
      </div>
      <div className="lg:w-[86%] w-full">
        <Swiper
          className="Brands"
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
              slidesPerView: 8,
              spaceBetween: 0
            },
          }}
          navigation
          modules={[Navigation]}
        >
          {brands.map((brand, index) => (
            <SwiperSlide key={index}>
              <div 
                className="flex flex-col my-6 items-center border-l h-[90px] border-gray justify-between w-full cursor-pointer"
                onClick={() => handleBrandClick(brand.id)}
              >
                <Image
                  width={1700}
                  height={1700}
                  src={brand.src}
                  alt={brand.title}
                  className="w-16"
                />
                <h4 className="font-yekan font-semibold text-[13px] text-black_12">{brand.title}</h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Brands;
