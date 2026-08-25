import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation } from "swiper/modules";
import SliderProductBox from "../ProductBox/SliderProductBox";
import Title from "@/Components/Home/Title/Title";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

function RecentlyViewedProductsSlider ({ text, classNameTitle = "" }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
        const filtered = viewed.filter((p) => p?.id);
        setProducts(filtered);
        console.log("recently viewed products", filtered);
    }, []);

    if (products.length === 0) return null;

    return (
        <div className="mt-6">
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
                modules={[Keyboard, Navigation]}
                className="SimilarProducts mt-3"
            >
                {Array.isArray(products) && products.length ? (
                    products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <SliderProductBox productInfo={product} />
                        </SwiperSlide>
                    ))
                ) : null}
            </Swiper>
        </div>
    )
}

export default RecentlyViewedProductsSlider;