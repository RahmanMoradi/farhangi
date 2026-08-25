"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import axios from "axios";
import Image from "next/image";
import Menu from "@/Components/menu/Menu";
import Button from "@/Components/ui/Button";
import 'yet-another-react-lightbox/styles.css';
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import Lightbox from 'yet-another-react-lightbox';
import CommentModal from "@/Components/Comment/CommentModal";
import AddProduct from "@/Components/ProductComponents/AddProduct";
import CommentBox from "@/Components/ProductComponents/Comment/CommentBox";
import ProductParameters from "@/Components/ProductComponents/ProductParameters";
import SimilarProductsSlider from "@/Components/ProductComponents/ProductsSlider/SimilarProductsSlider";

const colorMap = {
  red: '#C54949',
  purple: '#b79ced',
  Purple: '#957fef',
  black: '#181616',
  white: '#ffffff',
  Blue: '#1d3557',
  blue: '#77abbd',
  Green: '#52796f',
  Gold: '#f5cb5c',
  Deser: '#edd9a3',
  TITANUIM: '#ced4da',
  silver: '#dee2e6',
  Violet: '#dab6fc',
  Yellow: '#f9dc5c',
  Orange: '#f18701',
  Pink: '#ffb3c6',
  Grey: '#adb5bd',
  Brown: '#7f5539',
  Khaki: '#ddb892',
  Navy: '#00509d',
  Crimson: '#941b0c',
  Maroon: '#720026',
};

function Details({ params }) {
  {/* State Management */}
  const { slug } = React.use(params);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [imagesToShow, setImagesToShow] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [productInfo, setProductInfo] = useState(null);
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [inventory, setInventory] = useState(0);
  const [mainPrice, setMainPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [hasGuarantee, setHasGuarantee] = useState(false);
  const [hasInsurance, setHasInsurance] = useState(false);
  const [seeMoreComments, setSeeMoreComments] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isInsuranceSelected, setIsInsuranceSelected] = useState(false);
  const router = useRouter();

  {/* Fetching product */}
  const getProduct = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`);
      const product = res.data.data;
      setProductInfo(product);
      console.log("product info:", product);

      setFinalPrice(product.price);
      setSelectedColorId(null);
    } catch (err) {
      console.error("خطا در دریافت محصول:", err);
    }
  };

  // 🔹 Execute function when slug is ready
  useEffect(() => {
    if (slug) {
      getProduct();
    }
  }, [slug]);


  {/* Image handling */}
  useEffect(() => {
    if (productInfo?.images && Array.isArray(productInfo.images)) {
      const images = productInfo.images
        .filter((url) => url && typeof url === "string")
        .slice(1, 6)
        .map((url, index) => ({
          id: index + 1,
          url,
        }));
      setImagesToShow(images);
    } else {
      setImagesToShow([]);
    }
  }, [productInfo]);

  const lightboxSlides = imagesToShow.map((img) => ({ src: img.url }));
  const hasMoreImages = imagesToShow.length > 4;


  {/* Description handling */}
  const truncateDescription = (text, wordLimit = 120) => {
    if (!text) return "";
    const words = text.trim().split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const description = productInfo?.description && typeof productInfo.description === "string" ? productInfo.description : "";
  const isTruncated = description.trim().split(/\s+/).length > 120;

  {/* Fetching product inventory */}
  useEffect(() => {
    if (productInfo && productInfo.inventory > 0) {
      setInventory(productInfo.inventory);
    }
  }, [productInfo]);

  {/* Guarantee & Insurance variables */}
  const guarantee = productInfo?.guarantee;
  const guaranteeDuration = productInfo?.guarantee_duration;

  useEffect(() => {
    if (!productInfo) return;

    const hasGuarantee = productInfo.guarantee_price > 0;
    const hasDiscount = productInfo.discount_price > 0;
    const hasInsurance = productInfo.insurance_price > 0;
  
    const mainPrice = productInfo.price;
    const discountedPrice = productInfo.discount_price;
    const discountPercentage = productInfo.discount_percentage;
  
    const finalPrice = (hasDiscount ? discountedPrice : mainPrice);

    // Save in states so it can be used outside of useEffect
    setMainPrice(mainPrice);
    setHasDiscount(hasDiscount);
    setDiscountPercentage(discountPercentage);
    setHasGuarantee(hasGuarantee);
    setHasInsurance(hasInsurance);
    setFinalPrice(finalPrice);


    console.log("✅ basePrice:", mainPrice);
    console.log("✅ discountPrice:", discountedPrice);
    console.log("✅ hasDiscountNow:", hasDiscount);
    console.log("✅ mainPrice:", mainPrice);
    console.log("✅ finalPrice:", finalPrice);

  }, [productInfo, isInsuranceSelected]);


  {/* Handling color select*/}
  const handleColorSelect = (colorId) => {
    setSelectedColorId(colorId);
  };


  {/* Adding recently views in order to use in component */}
  const addRecentlyViewed = (product) => {
    if (!product?.id) return;

    try {
      let viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

      viewed = viewed.filter(p => p.id !== product.id);

      viewed.unshift(product);

      localStorage.setItem("recentlyViewed", JSON.stringify(viewed.slice(0, 10)));
    } catch (error) {
      console.error("خطا در ذخیره بازدید اخیر:", error);
    }
  };

  {/* 📦 Save the complete productInfo object itself */}
  useEffect(() => {
    if (productInfo) {
      addRecentlyViewed(productInfo);
    }
  }, [productInfo]);


  return (
    <>
    <div className="body">
      <Navbar />
      <div className="lg:pb-0 lg:grid-cols-2 xl:grid xl:grid-cols-3 gap-8 pb-20 mt-3">
        <AddProduct 
          className="block lg:hidden"
          finalPrice={finalPrice}
          hasDiscount={hasDiscount}
          mainPrice={mainPrice}
          productInfo={productInfo}
          discountPercentage={discountPercentage}
          inventory={inventory} 
        />
        {/* First column */}
        <div className="col-span-1">
          <div className="w-full h-[270px] md:h-[300px] xl:w-full xl:h-[550px] relative">
            <Image
              fill
              src={productInfo?.images[0] ? productInfo?.images[0] : null}
              alt="main-image"
              className="object-contain md:object-cover"
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="hidden xl:flex xl:items-center gap-2 mt-4 w-full">
            {imagesToShow.length > 0 ? (
              imagesToShow.map((img, index) => (
                <div key={img.id} className="relative">
                  {index < 4 || !hasMoreImages ? (
                    <Image
                      src={img.url}
                      alt={`Product image ${img.id}`}
                      width={72}
                      height={72}
                      className="w-[72px] h-[72px] border border-[#e0e0e2] rounded p-[3px] object-cover cursor-pointer"
                      onClick={() => {
                        setPhotoIndex(img.id);
                        setIsOpen(true);
                      }}
                      onError={() => console.error(`Failed to load image: ${img.url}`)}
                    />
                  ) : (
                    <div
                      className="relative w-[72px] h-[72px] border border-[#e0e0e2] rounded p-[3px] cursor-pointer"
                      onClick={() => {
                        setPhotoIndex(img.id);
                        setIsOpen(true);
                      }}
                    >
                      <Image
                        src={img.url}
                        alt="More images"
                        width={72}
                        height={72}
                        className="w-full h-full object-cover blur-sm"
                        onError={() => console.error(`Failed to load image: ${img.url}`)}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-800">...</span>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div>تصویری برای نمایش وجود ندارد</div>
            )}
          </div>
          {isOpen && (
           <Lightbox
             open={isOpen}
             close={() => setIsOpen(false)}
             slides={lightboxSlides}
             index={photoIndex}
             onIndexChange={(index) => setPhotoIndex(index)}
           />
          )}
        </div>
        {/* Second column */}
        <div className="col-span-1">
          <div className="mt-14">
            <p className="text-black_12 mt-3">{productInfo?.title}</p>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                <span className="mt-1 ml-1 text-[#BBDD23] text-[13px] font-yekan">
                  {productInfo?.score}
                </span>
                <span>
                  <Image
                    height={20}
                    width={20}
                    src="/images/icon/star.png"
                    alt="img"
                  />
                </span>
              </div>
              <div className="flex w-full justify-between items-center">
                <div className="flex">
                  <span className="text-Gray59">
                    <Icon icon="mdi:dot" width="20" height="20" />
                  </span>
                  <span className="text-Gray59 text-[12px] font-yekan">{productInfo?.comments_count} دیدگاه</span>
                </div>
                <div className="xl:bg-[#DBDBDB] h-[1px] xl:w-3/4 mr-3"></div>
              </div>
            </div>
            {/* Color */}
            <div className="flex items-center mt-2">
              <span className="ml-2 text-black_12 font-yekan">رنگ:</span>
              {productInfo?.colors?.map((color) => (
                <div
                  key={color.id}
                  onClick={() => handleColorSelect(color.id)}
                  className="flex items-center border border-[#3f4064] ml-2 pr-0.5 pl-3 py-0.5 rounded-md"
                >
                  <span
                    className={`w-5 cursor-pointer h-5 inline-block rounded border-2 border-white`}
                    style={{ backgroundColor: colorMap[color.code] || color.code || '#E5E7EB' }}
                  ></span>
                  <span className="text-[0.75rem] font-yekan pr-1">
                    {color.name}
                  </span>
                </div>
              ))}
            </div>
            {/* Product parameters */}
            <div className="p-2.5 mt-4 border border-light_brown_600 rounded-xl">
              <span className="text-[#3f4064] text-[15px] font-semibold font-yekan">مشخصات کالا</span>
              {productInfo?.parameters?.length ? (
                <ProductParameters parameters={productInfo.parameters} />
              ) : null}
            </div>
            <AddProduct
              className="hidden lg:flex lg:static lg:mt-4 lg:rounded-2xl !justify-start"
              finalPrice={finalPrice}
              hasDiscount={hasDiscount}
              mainPrice={mainPrice}
              productInfo={productInfo}
              discountPercentage={discountPercentage}
              inventory={inventory}
            />
          </div>
        </div>
        { /* Third column */}
        <div className="col-span-1 h-full">
          <div>
            <div className="text-black_12 pl-4 pr-4 pt-1 mt-10 bg-gradient-to-b from-[#efeff09c] via-[#efeff080] to-[#efeff03f] rounded-xl">
              {hasGuarantee ? (
                <div className="flex pt-4 pb-2 content-center border-b border-[#e0e0e2]">
                  <span className="text-[12px] text-[#3f4064] font-bold font-yekan mt-[2px]">
                    دارای گارانتی {guaranteeDuration} ماهه {guarantee}
                  </span>
                </div>
              ) : null}
              {hasInsurance ? (
                <div className="flex pt-4 pb-2 content-center border-b border-[#e0e0e2]">
                  <span className="text-[12px] text-[#3f4064] font-bold font-yekan mt-[2px]">
                    دارای بیمه
                  </span>
                </div>
              ) : null}
              <div className="pt-3 pb-4 pl-2">
                <div className="flex justify-between">
                  <div className="flex">
                    <Icon icon="ph:package" width="20" height="20" className="text-main_color" />
                    <span className="text-[13px] text-[#3f4064] font-bold font-yekan mt-[2px] pr-1.5">
                      روش ها و شرایط ارسال
                    </span>
                  </div>
                  <div>
                    <Icon
                      icon="iconamoon:arrow-left-2-bold"
                      width="22"
                      height="22"
                      className="text-[#a1a3a8]"
                    />
                  </div>
                </div>
                <div className="mt-2.5">
                  <div className="flex">
                    <Icon icon="material-symbols:local-shipping" width="20" height="20" className="text-[#e6123d]" />
                    <span className="text-[12px] text-[#81858b] font-medium font-yekan mt-[2px] pr-1.5">
                      ارسال توسط پست
                    </span>
                  </div>
                  <div className="flex mt-2">
                    <Icon icon="tabler:rocket" width="20" height="20" className="text-[#1028ff]" />
                    <span className="text-[12px] text-[#81858b] font-medium font-yekan mt-[2px] pr-1.5">
                      ارسال توسط پست پیشتاز
                    </span>
                  </div>
                  <div className="flex mt-2">
                    <Icon icon="material-symbols:fast-forward" width="20" height="20" className="text-[#4d4d4d]" />
                    <span className="text-[12px] text-[#81858b] font-medium font-yekan mt-[2px] pr-1.5">
                      ارسال توسط تیپاکس
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        { /* Forth column */ }
        <div className="col-span-2 mt-10">
          <span className="text-[#3f4064] text-[16px] font-bold font-yekan">توضیحات</span>
          <div className="mt-2">
            <p className="text-Gray59 text-[14px] font-yekan whitespace-pre-line mt-1 text-justify w-full">
              {isDescriptionExpanded ? description : truncateDescription(description)}
            </p>
            {isTruncated && (
              <button
                className="flex text-blue-600 hover:text-blue-800 text-[13px] font-yekan font-medium mt-2 focus:outline-none items-center"
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              >
                {isDescriptionExpanded ? "نمایش کمتر" : "نمایش بیشتر"}
                <Icon
                  icon="iconamoon:arrow-left-2-bold"
                  width="23"
                  height="23"
                />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-2">
        {/* Product Slider */}
        <div className="mt-10">
          <SimilarProductsSlider
            text="محصولات مشابه"
            productInfo={productInfo}
            classNameTitle="text-main_color bg-[#FFFFFF]"
          />
        </div>
        <div className="mt-10">
          <p className="text-[#3f4064] text-[16px] font-bold font-yekan">نظرات کاربران</p>
          <div className="flex items-center mt-2 relative">
            <div className="flex items-center">
              <span className="mt-1 ml-1 text-[#BBDD23] text-[13px] font-yekan">{productInfo?.score}</span>
              <span>
                <Image
                  height={20}
                  width={20}
                  src="/images/icon/star.png"
                  alt="img"
                />
              </span>
            </div>
            <div>
              <span className="text-Gray59">
                <Icon icon="mdi:dot" width="20" height="20" />
              </span>
            </div>
            <div>
              <span className="text-Gray59 text-[12px] font-yekan">{productInfo?.comments_count} دیدگاه</span>
              {isShowModal && (
                <CommentModal
                  setIsOpen={setIsShowModal}
                  productInfo={productInfo}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col xl:flex-row gap-3 mt-5 justify-between">
          <div className="bg-gradient-to-l from-[#efeff09c] via-[#efeff080] to-[#efeff03f] rounded-lg p-6 xl:w-[1025px]">
            <div className="flex flex-col bg-white rounded-xl py-[18px] pr-8 pl-8">
              <span className="text-[#3f4064] text-[14px] font-semibold font-yekan leading-8">
                برای راهنمایی دیگران درمورد این کالا نظر دهید.
              </span>
              <span className="text-[#3f4064] text-[13px] font-medium font-yekan leading-7">
                برای ثبت نظر نیاز به خرید کالا نیست؛ همچنین می‌توانید نظرتان را به صورت ناشناس ثبت کنید.
              </span>
            </div>
          </div>
          <div className="shadow-[0_4px_24px_0px_rgba(0,0,0,0.1)] p-7 items-center rounded-xl">
            <div className="flex items-center">
              <Icon
                icon="tabler:message"
                width={23}
                height={23}
                className="text-[#3f4064]"
              />
              <span className="text-[#3f4064] text-[13px] font-semibold font-yekan leading-8 pr-1.5">
                نظر خود را در مورد این محصول بنویسید ...
              </span>
            </div>
            <div onClick={() => setIsShowModal(true)}>
              <Button
                className="!bg-transparent w-full !text-black my-2.5"
                text={
                  <span className="flex items-center justify-center text-[14px] font-yekan gap-1.5">
                    افزودن نظر
                    <Icon
                      icon="line-md:plus"
                      width="23"
                      height="23"
                      className="ml-1"
                    />
                  </span>
                }
              />
            </div>
          </div>
        </div>
        <div className="relative mt-5 overflow-hidden mb-20">
          {productInfo?.comments.length === 0 ? (
            <div className="text-[#3f4064] text-[15px] font-medium font-yekan">هنوز هیچ کامنتی برای این محصول ثبت نشده است!</div>
          ) : null}
          {productInfo?.comments
            .slice(0, seeMoreComments ? productInfo?.comments.length : 2)
            .map((e) => (
              <div key={e.id} className="mt-2">
                <CommentBox commentInfo={e} />
              </div>
            ))
          }
          {productInfo?.comments.length > 2 ? (
            <div>
              <div className={`${seeMoreComments && "hidden"}`}>
                <div className="absolute -bottom-3 -left-10 -right-10 bg-[#F4F4F4e4] blur-lg h-48"></div>
                  <div className="absolute -bottom-3 -left-10 -right-10 bg-[#EDEDEDE5] blur-xl h-32"></div>
                  <div className="absolute flex bottom-3 left-1/2 translate -translate-x-1/2 cursor-pointer">
                    <span
                      className="text-black_12 text-[14px] font-yekan"
                      onClick={() => {
                        setSeeMoreComments(true);
                      }}
                    >
                      مشاهده نظرات بیشتر
                    </span>
                    <span className="mr-1">
                      <Icon icon="ep:arrow-down-bold" width="20" height="20" />
                    </span>
                  </div>
                </div>
                <div className="mt-4 cursor-pointer">
                  <span
                    className="text-black_12 flex items-center justify-center font-yekan"
                    onClick={() => {
                      setSeeMoreComments(false);
                    }}
                  >
                    بستن
                    <Icon
                      icon="material-symbols:close-rounded"
                      width="22"
                      height="22"
                    />
                  </span>
                </div>
              </div>
          ) : null}
          </div>
      </div>
      <Menu select="products" />
    </div>
    <Footer />
    </>
  );
}

export default Details;
