"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import axios from "axios";

const MegaMenu = ({ setOpen }) => {
  const [categories, setCategories] = useState([]);
  const [activeParent, setActiveParent] = useState(null);
  const router = useRouter();

  const toggleNavbar = () => setOpen(false);

  const getCategories = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error(err.message));
  };

  useEffect(() => {
    getCategories();
  }, []);

  const mainCategories = categories.filter((cat) => !cat.parent_id);

  const subCategories = (parentId) =>
    categories.filter((cat) => cat.parent_id === parentId);

    const handleCategoryClick = (categoryId) => {
      console.log("handleCategoryClick called with:", categoryId);
    
      const id =
        categoryId && typeof categoryId === "object"
          ? (categoryId.categoryId ?? categoryId.id ?? categoryId.slug ?? null)
          : categoryId;
    
      console.log("normalized category id:", id);
    
      if (!router || typeof router.push !== "function") {
        console.warn("router is not initialized. Did you call useRouter()?");
        return;
      }
    
      if (!id || id === "#" || id === "0") {
        router.push("/products");
        return;
      }
    
      const encoded = encodeURIComponent(String(id));
      router.push(`/product?filter[category]=${encoded}`);
    };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Dark background */}
      <div className="absolute inset-0 bg-[#00000099]" onClick={toggleNavbar} />

      {/* Mega menu wrapper */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3 }}
        className="relative flex h-full"
      >
        {/* Main categories */}
        <div className="w-[270px] bg-white shadow-lg p-6 overflow-y-auto">
          <div className="flex items-center justify-between">
            <h2 className="font-yekan text-[15px] font-bold mt-1">دسته بندی محصولات</h2>
            <div
              onClick={toggleNavbar}
              className="cursor-pointer bg-[#c6282827] rounded-lg p-2"
            >
              <IoClose size={22} />
            </div>
          </div>

          <ul className="text-gray-700 mt-4">
            {mainCategories.map((cat) => {
              const hasSub = subCategories(cat.id).length > 0;
              return (
                <li
                  key={cat.id}
                  className="hover:text-primary cursor-pointer flex justify-between items-center py-4 border-t last:border-b border-[#f0f0f0]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(cat.categoryId ?? cat.id ?? cat.slug);
                  }}
                  onMouseEnter={() => setActiveParent(cat.id)}
                >
                  <span className="font-yekan text-[14px] text-[#333] font-semibold">
                    {cat.name}
                  </span>
                  {hasSub && activeParent === cat.id && (
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MdOutlineKeyboardArrowLeft size={19} />
                    </motion.span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Sub categories */}
        <AnimatePresence>
          {activeParent && subCategories(activeParent).length > 0 && (
            <motion.div
              key={activeParent}
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              transition={{ duration: 0.2 }}
              className="w-[270px] h-full bg-white shadow-lg p-6 overflow-y-auto"
              style={{ position: "absolute", top: 0, right: "270px" }}
            >
              <h3 className="font-yekan text-[14px] font-semibold bg-[#c6282817] rounded-lg p-2.5 mb-4">
                {categories.find((cat) => cat.id === activeParent)?.name}
              </h3>
              <ul className="text-gray-700">
                {subCategories(activeParent).map((sub) => (
                  <li
                    key={sub.id}
                    className="hover:text-primary cursor-pointer py-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryClick(sub.categoryId ?? sub.id ?? sub.slug);
                    }}
                  >
                    {sub.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default MegaMenu;