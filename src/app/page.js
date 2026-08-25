"use client";
import { useEffect, useState, useCallback } from "react";
import Category from "@/Components/Home/Category/Category";
import Features from "@/Components/Home/Features/Features";
import Slider from "@/Components/Home/Slider/Slider";
import Menu from "@/Components/menu/Menu";
import InstallmentCalculation from "@/Components/Home/InstallmentCalculation/InstallmentCalculation";
import Image from "next/image";
import Brands from "@/Components/Home/Brands/Brands";
import Customers from "@/Components/Home/Customers/Customers";
import ArticlesSlider from "@/Components/Home/Article/ArticlesSlider";
import DiscountedProductsSlider from "@/Components/ProductComponents/ProductsSlider/DiscountedProductsSlider";
import PrinterProductSlider from "@/Components/ProductComponents/ProductsSlider/PrinterProductsSlider";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import axios from "axios";

const CUSTOMERS_ARRAY = [1, 2, 3, 4];

function Home() {
  // State Management
  const [products, setProducts] = useState([]);

  // Fetching products
  const getProducts = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products`
      );
      setProducts(response.data.data);
    } catch (err) {
      console.error(
        "Error fetching products:",
        err.response?.data?.message || err.message
      );
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <>
    <div className="body">
      <Navbar />
      <div>
      <Slider />
        <Features />
        <div className="lg:my-24 my-16">
          <Category />
        </div>
      </div>

      <DiscountedProductsSlider text="محصولات تخفیف دار" />

      <div>
        <div className="relative w-full h-[200px] md:h-[400px] my-8 md:my-14">
          <Image
            width={1440}
            height={804}
            unoptimized
            className="w-full h-full object-cover rounded-xl"
            src="/images/home/banner/best-sellers.webp"
            alt="پرفروش‌ترین تجهیزات اداری"
            priority
          />
          <div className="absolute inset-y-0 right-[7%] flex w-[42%] flex-col justify-center text-right text-white" style={{ fontFamily: "yekan-bakh, sans-serif" }}>
            <h2 className="text-xl font-bold md:text-4xl">انتخاب‌های محبوب کسب‌وکارها</h2>
            <p className="mt-2 text-xs md:text-lg">پرفروش‌ترین دستگاه‌های اداری، آماده برای کار</p>
            <span className="mt-4 text-sm font-bold md:text-base">دیدن پرفروش‌ها</span>
          </div>
        </div>
      </div>

      <PrinterProductSlider text="پرینتر" />

      <div id="brands" className="main-style !mb-0 lg:mt-16 mt-8">
        <Brands />

        <div>
          <div className="relative w-full h-[200px] md:h-[435px] mt-8 md:my-16">
            <Image
              width={1440}
              height={804}
              className="w-full h-full object-cover rounded-xl"
              src="/images/home/banner/warranty.webp"
              alt="گارانتی و خدمات پس از فروش فرهنگی"
              priority
            />
            <div className="absolute inset-y-0 right-[7%] flex w-[42%] flex-col justify-center text-right text-white" style={{ fontFamily: "yekan-bakh, sans-serif" }}>
              <h2 className="text-xl font-bold md:text-4xl">خرید مطمئن، پشتیبانی ماندگار</h2>
              <p className="mt-2 text-xs md:text-lg">با گارانتی معتبر و خدمات پس از فروش فرهنگی</p>
              <span className="mt-4 text-sm font-bold md:text-base">جزئیات گارانتی</span>
            </div>
          </div>
        </div>

        <div id="payment">
          <InstallmentCalculation />
        </div>

        <div id="customers" className="lg:mt-16 mt-8">
          <Customers />
        </div>
      </div>

      <div id="blog">
        <ArticlesSlider text="مقالات" products_info={CUSTOMERS_ARRAY} />
      </div>
      <Menu select="home" />
    </div>
    <div>
      <Footer />
    </div>
    </>
  );
}

export default Home;
