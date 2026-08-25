"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import useWindowSize from "@/Hooks/useWindowSize";
import EnamadSeal from "@/Components/Enamad/Enamad";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

function Footer() {
  const [categories, setCategories] = useState([]);
  const windowSize = useWindowSize();
  const router = useRouter();

  const getCategories = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      const allCategories = res.data.data || [];
      console.log("categories:", res.data.data);
      const parentCategories = allCategories.filter(cat => cat.parent_id === null);
      setCategories(parentCategories);
    } catch (err) {
      console.error("Error fetching categories:", err.response?.data?.message || err.message);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);


  const handleCategoryClick = (categoryId) => {
    const id =
      categoryId && typeof categoryId === "object"
        ? (categoryId.categoryId ?? categoryId.id ?? categoryId.slug ?? null)
        : categoryId;

    if (!id || id === "#" || id === "0") {
      router.push("/product");
      return;
    }

    const encoded = encodeURIComponent(String(id));
    router.push(`/product?filter[category]=${encoded}`);
  };

  return (
    <div className="lg:p-5 lg:px-[45px] bg-[#1f1d1d]">
      <div className="-mt-12 mb-12 lg:py-5 lg:m-0" style={{ borderTop: '1px solid #ec008e8c', borderBottom: '1px solid #ec008e8c' }}>
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:order-2">
            <div className="pt-5 flex justify-center">
              <Link href="/">
                {/*  */}
                <Image
                  width={115}
                  height={40}
                  src="/images/logo/logo.png"
                  alt=""
                  className="w-32 h-auto object-contain m-auto"
                  priority
                />
              </Link>
            </div>
            <div className="text-center border-b border-b-[#2D2D2D] lg:border-none mx-7 pb-5">
              <div className="text-[#F4F4F4] mt-4 font-yekan font-semibold">
                خرید شما از فروشگاه فرهنگی
              </div>
              <div className="text-main_color mt-2 font-yekan">خریدی با کیفیت و مقرون به صرفه...</div>
            </div>
          </div>
          <div className="flex justify-between py-6 text-center lg:text-start md:justify-around lg:order-1">
            <div className="flex flex-col">
              <h2 className="text-white text-[16px] font-yekan font-semibold">دسته بندی های اصلی</h2>
              <div className="flex flex-col gap-4 mt-3">
                {categories.map((cat) => (
                  <h3
                    key={cat.id} 
                    className="text-[#C4C4C4] text-[15px] font-yekan cursor-pointer"
                    onClick={() => handleCategoryClick(cat.id)}
                  >
                    {cat.name}
                  </h3>
                ))}
              </div>
            </div>
            <div className="flex flex-col lg:mr-16">
              <span className="text-white font-yekan font-semibold">دسترسی سریع</span>
              <div className="flex flex-col gap-4 mt-3">
                <Link href="#" className="text-[#C4C4C4] font-yekan">مقالات</Link>
                <Link href="/about-us" className="text-[#C4C4C4] font-yekan">درباره ما</Link>
                <Link href="/contact-us" className="text-[#C4C4C4] font-yekan">تماس باما</Link>
                <Link href="/faq" className="text-[#C4C4C4] font-yekan">سوالات متداول</Link>
                <span className="text-[#C4C4C4] font-yekan">قوانین و مقررات</span>
              </div>
            </div>
          </div>
          <div className="lg:order-3">
            <div className="text-center lg:text-start text-white border-t lg:border-none border-t-[#2D2D2D] py-5">
              <div>
                <span className="font-yekan font-semibold">راه های ارتباطی</span>
                <div className="flex items-center justify-center lg:justify-start mt-2">
                  <Icon icon="tdesign:location-filled" width="24" height="24" />
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[#C4C4C4] mr-1.5 font-yekan">
                      مشهد، خیابان امام خمینی، امام خمینی 7
                    </span>
                    <span className="text-[#C4C4C4] mr-1.5 font-yekan">
                      کوچه سجادی، پلاک 66
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center lg:justify-start mt-4 gap-3">
                  <div className="flex gap-1">
                    <Icon icon="line-md:phone-call-loop" width="24" height="24" />
                    <a href="tel:+985132222614" className="text-[#C4C4C4] mr-1.5 font-yekan">2614 222 0513</a>
                  </div>
                  <div className="flex gap-1">
                    <Icon icon="line-md:phone-call-loop" width="24" height="24" />
                    <a href="tel:+985132217620" className="text-[#C4C4C4] mr-1.5 font-yekan">7620 221 0513</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col border-t text-white lg:border-none border-t-[#2D2D2D] py-5">
              <span className="mt-3 font-yekan">
                نمادهای الکترونیکی
              </span>
              <div className="flex mt-2">
                <EnamadSeal />
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-Gray59 text-[12px] border-t lg:border-none border-t-[#2D2D2D] py-5 mr-16 font-yekan">
          © این سایت توسط تیم رایان سرو پویا نگار طراحی شده و کلیه حقوق مادی و معنوی آن
          برای فروشگاه فرهنگی محفوظ است.
        </div>
      </div>
    </div>
  );
}

export default Footer;
