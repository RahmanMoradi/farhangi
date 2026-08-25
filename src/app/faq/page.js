"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";

function FAQ() {
    return(
        <>
            <div className="body mb-12 lg:mb-32">
                <Navbar />
                <div className="mt-7">
                    <div className="hidden lg:block relative w-full h-[160px]">
                        <Image
                            src="/images/about-us/about-us.webp"
                            alt="background"
                            fill
                            className="object-cover rounded-[16px]"
                            loading="eager"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Image
                                width={500}
                                height={500}
                                src="/images/about-us/line.svg"
                                alt="divider"
                                className="h-full"
                                loading="eager"
                            />
                            <span className="text-[28px] font-[700] text-[#F4F4F4] text-center w-40 mx-2.5">
                                سوالات متداول
                            </span>
                            <Image
                                width={500}
                                height={500} 
                                src="/images/about-us/line.svg"
                                alt="divider"
                                className="h-full"
                                loading="eager"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default FAQ;