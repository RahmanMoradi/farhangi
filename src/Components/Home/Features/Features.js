import { Icon } from "@iconify/react";
import { TbBrandAirbnb } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { RiBloggerLine } from "react-icons/ri";
import React from "react";
import Link from "next/link";

function Features() {

  const scrollToBrands = (e) => {
    e.preventDefault(); 
    const brands = document.getElementById("brands");
    if (brands) {
      window.scrollTo({
        top: brands.offsetTop - 40,
        behavior: "smooth",
      });
    }
  };


  const scrollToCustomers = (e) => {
    e.preventDefault();
    const customers = document.getElementById("customers");
    if (customers) {
      window.scrollTo({
        top: customers.offsetTop - 40,
        behavior: "smooth",
      });
    }
  };

  const scrollToBlog = (e) => {
    e.preventDefault();
    const blog = document.getElementById("blog");
    if (blog) {
      window.scrollTo({
        top: blog.offsetTop - 40,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="mt-6 relative">
      <div className="xl:hidden flex items-center justify-between">
        <div
          className="absolute w-full h-0.5 z-10"
          style={{
            background:
              "linear-gradient(90deg,rgba(219, 219, 219, 1) 70%, #00aeef 100%)",
          }}
        ></div>

        <Link
          className="bg-light_brown_200 text-[#ced4da] hover:bg-second_color hover:text-white rounded-full 
          cursor-pointer z-30 w-12 h-12 flex items-center justify-center transition-all duration-300"
          href="#brands"
          onClick={scrollToBrands}
        >
          <TbBrandAirbnb size={23} />
        </Link>
        <Link
          className="bg-light_brown_200 text-[#ced4da] hover:bg-second_color hover:text-white rounded-full 
          cursor-pointer z-30 w-12 h-12 flex items-center justify-center transition-all duration-300"
          href="#customers"
          onClick={scrollToCustomers}
        >
          <RxPerson size={23} />
        </Link>
        <Link
          className="bg-light_brown_200 text-[#ced4da] hover:bg-second_color hover:text-white rounded-full 
          cursor-pointer z-30 w-12 h-12 flex items-center justify-center transition-all duration-300"
          href="#blog"
          onClick={scrollToBlog}
        >
          <RiBloggerLine size={23} />
        </Link>
      </div>
      <div className="items-center justify-between hidden xl:flex">
        <div
          className="absolute w-full h-0.5 z-10"
          style={{
            background:
              "linear-gradient(90deg,rgba(219, 219, 219, 1) 70%, #ec008c 100%)",
          }}
        ></div>

        <div className="flex items-center justify-between w-96">
          <Link
            className="group bg-second_color text-white hover:bg-second_color rounded-full 
            cursor-pointer z-30 w-12 h-12 flex items-center justify-center hover:w-32 transition-all duration-300"
            href="#brands"
            onClick={scrollToBrands}
          >
            <TbBrandAirbnb size={23} className="group-hover:pr-1" />
            <span className="hidden group-hover:flex whitespace-nowrap items-center text-white text-[13px] font-medium font-yekan ml-2 mr-1
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"
            >
              برندهای منتخب
            </span>
          </Link>
          <Link
            className="group bg-light_brown_200 text-[#ced4da] hover:bg-second_color hover:text-white rounded-full 
            cursor-pointer z-30 w-12 h-12 flex items-center justify-center hover:w-32 transition-all duration-300"
            href="#customers"
            onClick={scrollToCustomers}
          >
            <RxPerson size={23} />
            <span className="hidden group-hover:flex whitespace-nowrap items-center text-white text-[13px] font-medium font-yekan ml-2 mr-1
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"
            >
              مشتریان ما
            </span>
          </Link>
          <Link
            className="group bg-light_brown_200 text-[#ced4da] hover:bg-second_color hover:text-white rounded-full 
            cursor-pointer z-30 w-12 h-12 flex items-center justify-center hover:w-32 transition-all duration-300"
            href="#blog"
            onClick={scrollToBlog}
          >
            <RiBloggerLine size={23} />
            <span className="hidden group-hover:flex whitespace-nowrap items-center text-white text-[13px] font-medium font-yekan ml-2 mr-1
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"
            >
              مقالات
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Features;
