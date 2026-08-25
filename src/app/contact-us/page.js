"use client";
import React from "react";
import Image from "next/image";
import Menu from "@/Components/menu/Menu";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import ContactSupport from "@/Components/ContactUs/ContactSupport/ContactSupport";
import OtherWaysCommunication from "@/Components/ContactUs/OtherWaysCommunication/OtherWaysCommunication";

function ContactUs() {
  return (
    <>
      <div className="body mb-12 lg:mb-24">
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
              <span className="text-[28px] font-bold font-yekan text-[#F4F4F4] text-center w-40 mx-2.5">
                تماس با ما
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
          <div className="relative block lg:hidden mt-5">
            <Image
              width={1000}
              height={1000}
              src="/images/contact-us/contact-us-mobile.webp"
              alt="about-us-mobile"
              className="block lg:hidden w-full"
            />
            <div className="w-full absolute top-[40%] flex items-center">
              <Image
                width={1000}
                height={1000}
                src="/images/about-us/mobile-line.svg"
                alt="divider"
                className="w-[85%] h-full"
                loading="eager"
              />
              <span className="text-[20px] font-bold font-yekan text-[#F4F4F4] w-56 mx-2.5">
                تماس با ما
              </span>
              <Image
                width={1000}
                height={1000}
                src="/images/about-us/mobile-line.svg"
                alt="divider"
                className="w-[85%] h-full"
                loading="eager"
              />
            </div>
          </div>
          <ContactSupport />
          <OtherWaysCommunication />
        </div>
        <Menu />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default ContactUs;
