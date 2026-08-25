"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";

function Categories() {
  // State Management
  const [openParent, setOpenParent] = useState(null);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  // Fetching categories
  const getCategories = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      const allCategories = res.data.data || [];
      setCategories(allCategories);
    } catch (err) {
      console.error("Error fetching categories:", err.response?.data?.message || err.message);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const parentCategories = categories.filter((cat) => cat.parent_id === null);
  const subCategories = (parentId) => categories.filter((cat) => cat.parent_id === parentId);

  const handleCategoryClick = (categoryId) => {
    const id =
      typeof categoryId === "object"
        ? categoryId.id ?? categoryId.slug
        : categoryId;

    if (!id || id === "#" || id === "0") {
      router.push("/products");
      return;
    }

    const encoded = encodeURIComponent(String(id));
    router.push(`/products?filter[category]=${encoded}`);
  };

  const toggleAccordion = (parentId) => {
    setOpenParent((prev) => (prev === parentId ? null : parentId));
  };

  return (
    <>
      <div className="body mb-24">
        <Navbar />

        <div className="relative mt-3">
          {/* ✅ ChatBot Card */}
          <Link href="/chat-bot" className="cursor-pointer">
            <div className="w-full flex items-center rounded-[8px]">
              <Image
                width={1000}
                height={1000}
                src="/images/categories/chatbot-bg.svg"
                alt="chatbot-bg"
              />
              <div className="absolute top-[11px] right-5 flex gap-3 items-center">
                <Image
                  width={1000}
                  height={1000}
                  src="/images/categories/chatbot.svg"
                  alt="chatbot"
                  className="w-14"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-[#C62828] text-[15px] font-[700]">
                    جستجوی هوشمند محصول
                  </span>
                  <span className="text-[#595959] text-[13px] w-52">
                    محصول مورد نظر خودتون رو توسط چت‌بات مهران استور پیدا کنید
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <p className="mt-5 text-[14px] text-black_12">دسته‌بندی‌ها</p>

          {/* ✅ Parent categories loop */}
          {parentCategories.map((parent) => {
            const isOpen = openParent === parent.id;
            const subs = subCategories(parent.id);

            return (
              <div
                key={parent.id}
                className={`border-[1px] border-light_brown_600 mt-2 p-3 rounded-[10px] transition-all duration-300 ${
                  isOpen ? "bg-[#fff]" : "bg-[#e9ecef4f]"
                }`}
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAccordion(parent.id)}
                >
                  <div className="flex items-center">
                    <div className="bg-[#e9ecef4f] rounded-lg p-1.5 ml-2.5">
                      <Icon icon={parent.icon} width="25" height="25" />
                    </div>
                    <div className="text-[#121212] text-[14px] font-[500]">
                      {parent.name}
                    </div>
                  </div>

                  <Image
                    width={20}
                    height={20}
                    src={
                      isOpen
                        ? "/images/categories/arrow-up.svg"
                        : "/images/categories/arrow-left.svg"
                    }
                    alt="arrow"
                    className="w-5"
                  />
                </div>

                {/* ✅ Showing sub categories */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-[500px] mt-2" : "max-h-0"
                  }`}
                >
                  <ul>
                    {subs.length > 0 ? (
                      subs.map((sub) => (
                        <li
                          key={sub.id}
                          className="py-2 pl-10 text-[14px] text-gray-700 hover:text-primary cursor-pointer border-b border-light_brown_600 last:border-none"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCategoryClick(sub.id);
                          }}
                        >
                          {sub.name}
                        </li>
                      ))
                    ) : (
                      <li className="text-[13px] text-gray-400 pl-10 py-2">
                        هیچ زیر‌دسته‌ای ندارد
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Categories;

