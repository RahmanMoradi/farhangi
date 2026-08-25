"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Slider, Box, Switch } from "@mui/material";
import { Icon } from "@iconify/react";
import Menu from "@/Components/menu/Menu";
import Navbar from "@/Components/Navbar/Navbar";
import Image from "next/image";
import Title from "@/Components/Home/Title/Title";
import Product from "@/Components/ProductComponents/ProductBox/Product";
import AccordionProduct from "@/Components/ui/products/AccordionProduct";
import ProductBox from "@/Components/ProductComponents/ProductBox/ProductBox";
import axios from "axios";
import Footer from "@/Components/Footer/Footer";

function ProductsComponent() {
  {/* State Management */}
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [brand, setBrand] = useState([]);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showALLCategories, setShowAllCategories] = useState(false);
  const [brands, setBrands] = useState([]);
  const [color, setColor] = useState([]);
  const [colors, setColors] = useState([]);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [openParent, setOpenParent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 300000000]);
  const [availableProducts, setAvailableProducts] = useState(false);
  const [offer, setOffer] = useState(false);
  const [discounted, setDiscounted] = useState(false);
  const [visiblePages, setVisiblePages] = useState(5);
  const router = useRouter();
  const searchParams = useSearchParams();


  {/* Fetching products */}
  const getProducts = useCallback(async (pageNum = 1, filters = {}) => {
    setLoading(true);
    try {
      const query = new URLSearchParams({ page: pageNum, ...filters }).toString();
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?${query}`);
      const data = response.data.data || [];
      const meta = response.data.meta || {};

      setProducts(data);
      setPage(meta.current_page || 1);
      setLastPage(meta.last_page || 1);
      setTotal(meta.total || 0);
    } catch (error) {
      console.error("Error loading products:", error.response?.data?.message || error.message);
      setProducts([]);
      setTotal(0);
      setLastPage(1);
    } finally {
      setLoading(false);
    }
  }, []);


  {/* Fetching product colors */}
  const getColors = useCallback(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/colors`)
      .then((res) => {
        setColors(res.data.data || []);
        console.log("colors:", res.data.data);
      }).catch((err) => console.error("Error fetching colors:", err.response?.data?.message || err.message));
  }, []);


  {/* Fetching product categories */}
  const getCategories = useCallback(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then((res) => {
        const allCategories = res.data.data || [];
        setCategories(allCategories);
      })
      .catch((err) => console.error("Error fetching categories:", err.response?.data?.message || err.message));
  }, []);


  {/* Filtering product categories */}
  const parentCategories = categories.filter((cat) => cat.parent_id === null);
  const subCategories = (parentId) =>
    categories.filter((cat) => cat.parent_id === parentId);


  const toggleAccordion = (parentId) => {
    setOpenParent((prev) => (prev === parentId ? null : parentId));
  };

  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return parentCategories;

    const term = searchTerm.toLowerCase();

    return parentCategories
      .map((parent) => {
        const subs = subCategories(parent.id) || [];
        const matchedSubs = subs.filter((sub) =>
          sub.name.toLowerCase().includes(term)
        );

        if (
          parent.name.toLowerCase().includes(term) ||
          matchedSubs.length > 0
        ) {
          return { ...parent, filteredSubs: matchedSubs };
        }

        return null;
      })
      .filter(Boolean);
  }, [searchTerm, parentCategories, subCategories]);

  const categorySet = (id) => {
    setCategory(id);
  };


  {/* Fetching product brands */}
  const getBrands = useCallback(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/brands`)
      .then((res) => setBrands(res.data.data || []))
      .catch((err) => console.error("Error fetching brands:", err.response?.data?.message || err.message));
  }, []);


  {/* Filtering product brands */}
  const filteredBrands = useMemo(() => {
    if (!searchTerm.trim()) return brands;
    return brands.filter((b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [brands, searchTerm]);


  {/* Brand select function */}
  const brandsSet = (id) => {
    setBrand((prevBrands) => {
      if (prevBrands.includes(id)) {
        return prevBrands.filter((brandId) => brandId !== id);
      } else {
        return [...prevBrands, id];
      }
    });
  };


  {/* Color select function */}
  const colorsSet = (id) => {
    setColor((prevColors) => {
      if (prevColors.includes(id)) {
        return prevColors.filter((colorId) => colorId !== id);
      } else {
        return [...prevColors, id];
      }
    });
  };


  {/* Formatting price */}
  const formatPrice = (price) => {
    if (!price || typeof price !== "number") return "0 تومان";
    return `${price.toLocaleString()} تومان`;
  };


  {/* Apply filter function */}
  const applyFilter = () => {
    const newFilters = {};
  
    if (brand.length > 0) newFilters["filter[brands]"] = brand.join(",");
    if (color.length > 0) newFilters["filter[colors]"] = color.join(",");
    if (category) newFilters["filter[category]"] = category;
    if (availableProducts) newFilters["filter[available]"] = true;
    if (offer) newFilters["filter[recommended]"] = true;
    if (discounted) newFilters["filter[discounted]"] = true;
    if (priceRange) newFilters["filter[price]"] = `${priceRange[0]},${priceRange[1]}`;
  
    setFilters(newFilters);
    setPage(1);
    const query = new URLSearchParams({ page: 1, ...newFilters }).toString();
    router.push(`/product?${query}`);
  };  
  

  {/* Clear filter function */}
  const clearFilter = () => {
    setBrand([]);
    setColor([]);
    setCategory(null);
    setAvailableProducts(false);
    setOffer(false);
    setDiscounted(false);
    setPriceRange([0, 50000000]);
    setFilters({});
    setPage(1);
    const query = new URLSearchParams({ page: 1 }).toString();
    router.push(`/product?${query}`);
    getProducts(1, {});
  };


  {/* Handling pagination */}
  const handlePageChange = (newPage) => {
    setPage(newPage);
    const query = new URLSearchParams({ page: newPage, ...filters }).toString();
    router.push(`/product?${query}`);
  };


  {/* Filtering useEffect regarding pagination */}
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    const newFilters = {};
    const pageFromParams = parseInt(params.page) || 1;
    
    if (params['filter[brands]']) {
      const brands = params['filter[brands]'].split(',');
      setBrand(brands);
      newFilters['filter[brands]'] = params['filter[brands]'];
    }
    
    if (params['filter[colors]']) {
      const colors = params['filter[colors]'].split(',');
      setColor(colors);
      newFilters['filter[colors]'] = params['filter[colors]'];
    }

    if (params["filter[category]"]) {
      setCategory(params["filter[category]"]);
      newFilters["filter[category]"] = params["filter[category]"];
    }
    
    if (params['filter[available]']) {
      setAvailableProducts(params['filter[available]'] === 'true');
      newFilters['filter[available]'] = true;
    }

    if (params['filter[recommended]']) {
      setOffer(params['filter[recommended]'] === 'true');
      newFilters['filter[recommended]'] = true;
    }
    
    if (params['filter[discounted]']) {
      setDiscounted(params['filter[discounted]'] === 'true');
      newFilters['filter[discounted]'] = true;
    }
    
    if (params['filter[price]']) {
      const [min, max] = params['filter[price]'].split(',').map(Number);
      setPriceRange([min, max]);
      newFilters['filter[price]'] = params['filter[price]'];
    }
    
    setFilters(newFilters);
    setPage(pageFromParams);
    getProducts(pageFromParams, newFilters);
  }, [searchParams, getProducts]);


  useEffect(() => {
    getBrands();
    getColors();
    getCategories();
  }, [getBrands, getColors, getCategories]);

  useEffect(() => {
    const updateVisiblePages = () => {
      if (window.innerWidth >= 1024) {
        setVisiblePages(20);
      } else {
        setVisiblePages(5);
      }
    };
  
    updateVisiblePages();
  
    window.addEventListener("resize", updateVisiblePages);
    return () => window.removeEventListener("resize", updateVisiblePages);
  }, []);
  
  return (
    <>
    <div className="body">
      <Navbar />
      <div className="mb-24">
        <Title text="محصولات" style="h-[1px]" classNameText="text-main_color" />
        {/*  */}
        <div className="flex items-center justify-between mt-5 md:mx-28 lg:mx-48 xl:hidden">
          <div
            className="flex items-center justify-center py-3 rounded-xl w-1/2 border-2 border-light_brown_600 cursor-pointer"
            onClick={() => setIsShowFilter(!isShowFilter)}
          >
            <span>
              <Icon icon="line-md:filter-filled" width="24" height="24" alt="filter" />
            </span>
            <span className="font-yekan">فیلتر</span>
          </div>
          <div className="w-2"></div>
          <div className="flex items-center justify-center py-3 rounded-xl w-1/2 border-2 border-light_brown_600">
            <span>
              <Icon icon="iconoir:sort-down" width="24" height="24" alt="sorting" />
            </span>
            <span className="font-yekan">مرتب سازی</span>
          </div>
        </div>
        {/* Filters and sorting in mobile */}
        {isShowFilter && (
          <div className="mt-3 bg-light_brown_200 p-4 rounded-lg xl:hidden">
            <div className="flex items-center justify-between mt-1">
              <span className="text-black_12 text-[14px] font-yekan">
                محصولات تخفیف دار
              </span>
              <span>
                <Switch
                  onChange={(e) => {
                    setDiscounted(e.target.checked);
                  }}
                />
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-black_12 text-[14px] font-yekan">
                محصولات موجود
              </span>
              <span>
                <Switch
                  onChange={(e) => {
                    setAvailableProducts(e.target.checked);
                  }}
                />
              </span>
            </div> 
            <div className="flex items-center justify-between mt-1">
              <span className="text-black_12 text-[14px] font-yekan">پیشنهاد ما</span>
              <span>
                <Switch
                  onChange={(e) => {
                    setOffer(e.target.checked);
                  }}
                />
              </span>
            </div>
            <div className="mt-2">
              <AccordionProduct
                title="دسته بندی"
                className="w-full overflow-visible border-b border-b-light_brown_600" 
              >
                <div>
                  <input
                    type="text"
                    placeholder="جستجوی دسته‌بندی..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full font-yekan px-3 py-2 border border-light_brown_600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-main_color"
                  />
                </div>
                <div
                  className={`transition-all duration-300 ${
                    showALLCategories ? "h-44 overflow-x-hidden" : "h-[12rem] overflow-y-auto"
                  }`}
                >
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((parent) => {
                      const isOpen = openParent === parent.id;
                      const subs = parent.filteredSubs || subCategories(parent.id) || [];

                      return (
                        <div
                          key={parent.id}
                          className={`border-[1px] border-light_brown_600 rounded-[10px] my-1.5 transition-all duration-300`}
                        >
                          <div
                            className={`flex items-center justify-between cursor-pointer rounded-lg p-2 ${
                              category === parent.id ? "bg-[#DBDBDB]" : ""
                            }`}
                            onClick={() => {
                              toggleAccordion(parent.id);
                              categorySet(parent.id);
                            }}
                          >
                            <span className="text-[#121212] font-yekan text-[14px] font-[500]">
                              {parent.name}
                            </span>
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
                              isOpen ? "h-auto mt-2" : "max-h-0"
                            }`}
                          >
                            <ul>
                              {subs.length > 0 ? (
                                subs.map((sub) => (
                                  <li
                                    key={sub.id}
                                    className={`py-2 pl-10 text-[14px] font-yekan text-gray-700 hover:text-primary rounded-sm cursor-pointer border-b border-light_brown_600 last:border-none ${
                                      category === sub.id ? "bg-[#DBDBDB]" : ""
                                    }`}
                                    onClick={(event)=> {
                                      event.stopPropagation();
                                      categorySet(sub.id);
                                    }}
                                  >
                                    {sub.name}
                                  </li>
                                ))
                              ) : (
                                <li className="text-[13px] font-yekan text-gray-400 pl-10 py-2">
                                  هیچ زیر‌دسته‌ای ندارد
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      )})
                  ) : (
                    <div className="text-gray-500 text-sm font-yekan text-center py-5">
                      هیچ دسته‌ای یافت نشد.
                    </div>
                  )}
                </div>
                {categories.length > 4 && (
                  <button
                    onClick={() => setShowAllCategories(!showALLCategories)}
                    className="mt-2 text-sm font-yekan text-primary hover:underline block"
                  >
                    {showALLCategories ? "نمایش کمتر" : "نمایش بیشتر"}
                  </button>
                )}
              </AccordionProduct>
            </div>
            <div className="mt-2">
              <AccordionProduct
                title="برند"
                className="w-full overflow-visible border-b border-b-light_brown_600" 
              >
                <div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="جستجوی برند..."
                    className="w-full font-yekan p-2 border border-light_brown_600 rounded-lg text-[13px] focus:outline-none focus:ring-1 focus:ring-main_color"
                  />
                </div>
                <div
                  className={`transition-all duration-300 ${
                    showAllBrands ? "h-44 overflow-x-hidden" : "mt-2 h-[10.5rem] overflow-y-auto"
                  }`}
                >
                  {filteredBrands.length > 0 ? (
                    filteredBrands.map((e) => (
                      <div
                        key={e.id}
                        className={`border w-full font-yekan border-light_brown_600 p-2 rounded-lg block mb-1 cursor-pointer transition-all ${
                          brand.includes(e.id)
                            ? "bg-light_brown_600 text-black"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => brandsSet(e.id)}
                      >
                        {e.name}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400 text-sm font-yekan text-center py-3">
                      نتیجه‌ای یافت نشد
                    </div>
                  )}
                </div>
                {brands.length > 15 && (
                  <button
                    onClick={() => setShowAllBrands(!showAllBrands)}
                    className="mt-2 text-sm font-yekan text-primary hover:underline block"
                  >
                    {showAllBrands ? "نمایش کمتر" : "نمایش بیشتر"}
                  </button>
                )}
              </AccordionProduct>
            </div>
            <div className="mt-1">
              <AccordionProduct
                title="رنگ"
                className="w-full border-b border-b-light_brown_600 rounded-[7px]"
              >
                {colors.map((e) => (
                  <div
                    key={e.id}
                    className={`border border-[#ffffff] rounded-[50px] p-1 inline-block ml-1 cursor-pointer ${
                      color.includes(e.id) ? "bg-light_brown_600" : ""}`}
                      onClick={() => {
                      colorsSet(e.id);
                    }}
                  >
                  <div
                   style={{ 
                      backgroundColor: e.code,
                      width: "23px",
                      height: "23px",
                      borderRadius: "60%",
                    }}
                  >
                  </div>
                  </div>
                ))}
              </AccordionProduct>
            </div>
            <div className="mt-1">
              <span className="block text-black_12 font-yekan text-[14px] mt-3">
                محدوده قیمت
              </span>
              <div className="flex items-center justify-between text-black_12 font-yekan text-[14px] mt-4">
                <span>از</span>
                <span>{formatPrice(priceRange[0])}</span>
                <span>تا</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
              <Box sx={{ width: '100%', px: 1, my: 2 }}>
                <Slider
                  value={priceRange}
                  onChange={(e, newValue) => setPriceRange(newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={300000000}
                  step={1000000}
                />
              </Box>
              <div className="flex items-center justify-between pb-2 text-Gray59 text-[12px] font-yekan -mt-3 border-b border-b-light_brown_600">
                <span>گرونترین</span>
                <span>ارزونترین</span>
              </div>
              <div className="flex items-center justify-between mt-3 text-[14px]">
                <div 
                  className="text-black_12 font-yekan border border-light_brown_600 py-1 px-2.5 rounded-lg flex items-center cursor-pointer" 
                  onClick={applyFilter}
                >
                  <Icon
                    icon="mdi:tick"
                    width="22"
                    height="22"
                    className="ml-1 mb-1"
                    alt="add-filter"
                  />
                  اعمال فیلتر
                </div>
                <div 
                  className="text-main_color font-yekan flex items-center cursor-pointer"
                  onClick={clearFilter}
                >
                  <Icon
                    icon="fluent:delete-12-filled"
                    width="20"
                    height="20"
                    className="ml-1 mb-1"
                    alt="delete-filter"
                  />
                  پاک کردن همه
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between mt-5 text-Gray59 text-[15px] font-yekan">
          <div>همه کالا ها</div>
          <div>{total} کالا</div>
        </div>
        <div className="mt-6 block md:grid md:grid-cols-2 md:gap-2 xl:hidden">
          {/* <CircularProgress /> */}
          {products.map((e) => (
            <Product className="mt-3" productInfo={e} key={e.id} />
          ))}
        </div>

        {/* Filters in desktop */}
        <div className="mt-6 hidden xl:flex">
          <div className="relative">
            <div className="mt-3 bg-gradient-to-b from-[#efeff0] via-[#efeff052] to-[#efeff0a4] p-4 rounded-lg w-[350px]">
              <div className="flex items-center justify-between mt-2">
                <span className="text-black_12 text-[14px] font-yekan">
                  محصولات تخفیف دار
                </span>
                <span>
                  <Switch
                    onChange={(e) => {
                      setDiscounted(e.target.checked);
                    }}
                  />
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-black_12 text-[14px] font-yekan">
                  محصولات موجود
                </span>
                <span>
                  <Switch
                    onChange={(e) => {
                      setAvailableProducts(e.target.checked);
                    }}
                  />
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-black_12 text-[14px] font-yekan">پیشنهاد ما</span>
                <span>
                  <Switch
                    onChange={(e) => {
                      setOffer(e.target.checked);
                    }}
                  />
                </span>
              </div>
              <div className="mt-2">
                <AccordionProduct
                  title="دسته بندی"
                  className="w-full overflow-visible border-b border-b-light_brown_600" 
                >
                  <div>
                    <input
                      type="text"
                      placeholder="جستجوی دسته‌بندی..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full font-yekan px-3 py-2 border border-light_brown_600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-main_color"
                    />
                  </div>
                  <div
                    className={`transition-all duration-300 ${
                      showALLCategories ? "h-44 overflow-x-hidden" : "h-[12rem] overflow-y-auto"
                    }`}
                  >
                    {filteredCategories.length > 0 ? (
                      filteredCategories.map((parent) => {
                        const isOpen = openParent === parent.id;
                        const subs = parent.filteredSubs || subCategories(parent.id) || [];

                        return (
                          <div
                            key={parent.id}
                            className={`border-[1px] border-light_brown_600 rounded-[10px] my-1.5 transition-all duration-300`}
                          >
                            <div
                              className={`flex items-center justify-between cursor-pointer rounded-lg p-2 ${
                                category === parent.id ? "bg-[#DBDBDB]" : ""
                              }`}
                              onClick={() => {
                                toggleAccordion(parent.id);
                                categorySet(parent.id);
                              }}
                            >
                              <span className="text-[#121212] text-[14px] font-yekan font-[500]">
                                {parent.name}
                              </span>
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
                                isOpen ? "h-auto mt-2" : "max-h-0"
                              }`}
                            >
                              <ul>
                                {subs.length > 0 ? (
                                  subs.map((sub) => (
                                    <li
                                      key={sub.id}
                                      className={`py-2 pl-10 text-[14px] font-yekan text-gray-700 hover:text-primary rounded-sm cursor-pointer border-b border-light_brown_600 last:border-none ${
                                        category === sub.id ? "bg-[#DBDBDB]" : ""
                                      }`}
                                      onClick={(event)=> {
                                        event.stopPropagation();
                                        categorySet(sub.id);
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
                        )})
                    ) : (
                      <div className="text-gray-500 text-sm font-yekan text-center py-5">
                        هیچ دسته‌ای یافت نشد.
                      </div>
                    )}
                  </div>
                  {categories.length > 4 && (
                    <button
                      onClick={() => setShowAllCategories(!showALLCategories)}
                      className="mt-2 text-sm font-yekan text-primary hover:underline block"
                    >
                      {showALLCategories ? "نمایش کمتر" : "نمایش بیشتر"}
                    </button>
                  )}
                </AccordionProduct>
              </div>
              <div className="mt-2">
                <AccordionProduct
                  title="برند"
                  className="w-full overflow-visible border-b border-b-light_brown_600" 
                >
                  <div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="جستجوی برند..."
                      className="w-full font-yekan p-2 border border-light_brown_600 rounded-lg text-[13px] focus:outline-none focus:ring-1 focus:ring-main_color"
                    />
                  </div>
                  <div
                    className={`transition-all duration-300 ${
                      showAllBrands ? "h-44 overflow-x-hidden" : "mt-2 h-[10.5rem] overflow-y-auto"
                    }`}
                  >
                    {filteredBrands.length > 0 ? (
                      filteredBrands.map((e) => (
                        <div
                          key={e.id}
                          className={`border w-full font-yekan border-light_brown_600 p-2 rounded-lg block mb-1 cursor-pointer transition-all ${
                            brand.includes(e.id)
                              ? "bg-light_brown_600 text-black"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => brandsSet(e.id)}
                        >
                          {e.name}
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-400 font-yekan text-sm text-center py-3">
                        نتیجه‌ای یافت نشد
                      </div>
                    )}
                  </div>

                  {brands.length > 15 && (
                    <button
                      onClick={() => setShowAllBrands(!showAllBrands)}
                      className="mt-2 text-sm font-yekan text-primary hover:underline block"
                    >
                      {showAllBrands ? "نمایش کمتر" : "نمایش بیشتر"}
                    </button>
                  )}
                </AccordionProduct>
              </div>
              <div className="mt-4">
                <AccordionProduct
                  title="رنگ"
                  className="w-full border-b border-b-light_brown_600 flex"
                >
                  {colors.map((e) => (
                    <div
                      key={e.id}
                      className={`border border-[#ffffff] rounded-[50px] p-1 inline-block ml-1 cursor-pointer ${
                        color.includes(e.id) ? "bg-light_brown_600" : ""}`}
                      onClick={() => {
                        colorsSet(e.id);
                      }}
                    >
                      <div
                        style={{ 
                        backgroundColor: e.code,
                        width: "23px",
                        height: "23px",
                        borderRadius: "60%",
                        }}
                      >
                      </div>
                    </div>
                  ))}
                </AccordionProduct>
              </div>
              <div className="mt-6 p-1">
                <span className="block font-yekan text-black_12 text-[14px]">
                  محدوده قیمت
                </span>
                <div className="flex items-center justify-between text-black_12 font-yekan text-[13px] mt-4">
                  <span>از</span>
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>تا</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
                <Box sx={{ width: '100%', px: 1, my: 2 }}>
                  <Slider
                    value={priceRange}
                    onChange={(e, newValue) => setPriceRange(newValue)}
                    valueLabelDisplay="auto"
                    min={0}
                    max={300000000}
                    step={1000000}
                  />
                </Box>
                <div className="flex items-center justify-between font-yekan pb-6 text-Gray59 text-[12px] -mt-2 border-b border-b-light_brown_600">
                  <span>گرونترین</span>
                  <span>ارزونترین</span>
                </div>
                <div className="flex items-center justify-between mt-7 mb-3 text-[14px]">
                  <div 
                    className="cursor-pointer font-yekan text-black_12 border border-light_brown_600 py-1 px-2.5 rounded-lg flex items-center"
                    onClick={applyFilter}
                  >
                    <Icon
                      icon="mdi:tick"
                      width="22"
                      height="22"
                      className="ml-1 mb-1"
                      alt="add-filter"
                    />
                    اعمال فیلتر
                  </div>
                  <div 
                    className="text-main_color font-yekan flex items-center cursor-pointer" 
                    onClick={clearFilter}
                  >
                    <Icon
                      icon="fluent:delete-12-filled"
                      width="20"
                      height="20"
                      className="ml-1 mb-1"
                      alt="delete-filter"
                    />
                    پاک کردن همه
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:grid md:grid-cols-5 md:gap-2 lg:gap-3 flex-[3] mr-5 w-full">
            {/* <CircularProgress /> */}
            {products.map((e) => (
                <ProductBox
                  key={e.id}
                  productInfo={e}
                  className="h-min rounded-xl"
                />
            ))}
          </div>
        </div>
        <div className="flex gap-1 mt-6 items-center justify-center flex-wrap">
          {/* Prev Button */}
          <button
            onClick={() => handlePageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-1 py-1 border rounded disabled:opacity-50 text-[13px]"
          >
            <Icon 
              icon="solar:alt-arrow-right-line-duotone" 
              width="22" 
              height="22" 
            />
          </button>

          {/* Dynamic page buttons */}
          {(() => {
            let startPage = Math.max(1, page - Math.floor(visiblePages / 2));
            let endPage = Math.min(lastPage, startPage + visiblePages - 1);

            startPage = Math.max(1, endPage - visiblePages + 1);

            const pages = [];

            if (startPage > 1) {
              pages.push(
                <span key="start-ellipsis" className="px-1.5">...</span>
              );
            }

            for (let i = startPage; i <= endPage; i++) {
              pages.push(
                <button
                  key={i}
                  onClick={() => handlePageChange(i)}
                  className={`px-2.5 py-0.5 mx-0.5 border rounded ${
                    page === i ? "bg-main_color text-white" : "bg-white text-black"
                  }`}
                >
                  {i}
                </button>
              );
            }

            if (endPage < lastPage) {
              pages.push(
                <span key="end-ellipsis" className="px-2">...</span>
              );
            }

            return pages;
          })()}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(Math.min(lastPage, page + 1))}
            disabled={page === lastPage}
            className="px-1 py-1 border rounded disabled:opacity-50 text-[13px]"
          >
            <Icon 
              icon="solar:alt-arrow-left-linear" 
              width="22" 
              height="22" 
            />
          </button>
        </div>
      </div>
      <Menu select="products" />
    </div>
    <Footer />
    </>
  );
}

export default ProductsComponent;
