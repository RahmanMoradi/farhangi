import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import Image from 'next/image';

function ChatBotProduct({ products }) {
    const [displayCount, setDisplayCount] = useState(10);
    const router = useRouter();

    const handleShowMore = () => {
        setDisplayCount(products.length);
    };

    return (
        <div>
            {products.slice(0, displayCount).map((product) => (
                <div
                   key={product.id} 
                   className="relative flex border-2 border-light_brown_600 p-2.5 rounded-2xl items-center mt-5 cursor-pointer"
                   onClick={() => {
                        router.push(`/products/details?query=${product?.slug}`);
                    }}
                >
                    <div className="ml-3">
                        <Image 
                            width={150} 
                            height={150} 
                            alt="product image" 
                            src={product?.images[0] ? product?.images[0] : "/images/image.png"} 
                        />
                    </div>
                    <div className="w-full">
                        <p 
                            className="text-[14px] lg:!text-[16px] text-[#121212] cursor-pointer"
                        >
                            {product?.title}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-main_color">{product?.price.toLocaleString()} تومان</span>
                            <div className="flex items-center justify-center">
                                <span className="mt-1 ml-1 text-[#BBDD23]">{product?.score}</span>
                                <span>
                                    <Image
                                        height={20}
                                        width={20}
                                        src="/images/icon/star.png"
                                        alt="score image"
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                    {product?.discount_percentage && (
                        <div className="absolute top-2 right-2 rounded-full w-[55px] h-8 pt-0.5 bg-[#E11E1E80] border-2 border-[#DD0000] text-white text-[12px] flex items-center justify-center">
                            {product?.discount_percentage}
                        </div>
                    )}
                </div>
            ))}
            {products.length > 10 && displayCount < products.length && (
                <button
                    className="w-full border border-light_brown_600 p-2.5 rounded-xl mt-5 text-main_color flex items-center justify-center cursor-pointer"
                    style={{
                        marginTop: "20px",
                        color: "#c1121f",
                    }}
                    onClick={handleShowMore}
                >
                    نمایش بیشتر
                </button>
            )}
        </div> 
    );
};

export default ChatBotProduct;