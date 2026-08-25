"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "@/Context/UserContext";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import axios from "axios";
import Input from "@/Components/ui/Input";
import AddressSelectOption from "@/Components/ui/AddressSelectOption";
import CreateAddress from "@/Components/Account/Address/CreateAddress";
import Navbar from "@/Components/Navbar/Navbar";
import CheckOutProduct from "@/Components/CheckOut/CheckOutProduct";
import Menu from "@/Components/menu/Menu";
import useAlert from "@/Hooks/useAlert";
import Footer from "@/Components/Footer/Footer";

{/* Mapping day letters to full day's name */}
const dayWeekMap = {
  ش: "شنبه",
  ی: "یک‌شنبه",
  د: "دوشنبه",
  س: "سه‌شنبه",
  چ: "چهارشنبه",
  پ: "پنج‌شنبه",
  ج: "جمعه",
};

{/* Mapping months */}
const monthMap = {
  1: "فروردین",
  2: "اردیبهشت",
  3: "خرداد",
  4: "تیر",
  5: "مرداد",
  6: "شهریور",
  7: "مهر",
  8: "آبان",
  9: "آذر",
  10: "دی",
  11: "بهمن",
  12: "اسفند",
};

{/* Getting full day's name */}
const getFullDayName = (dayWeek) => {
  return dayWeekMap[dayWeek] || dayWeek;
};

{/* Getting month's name */}
const getMonthName = (month) => {
  return monthMap[month] || month;
};

function Checkout() {
  {/* State Management */}
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [address_id, setAddress_id] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const { token } = useUser();
  const router = useRouter();
  const { showAlert  } = useAlert();
  const postCharge = 30000;
  const total = price + postCharge;

  {/* Get cart data from localStorage */}
  const getCartFromLocalStorage = useCallback(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    if (cartData) {
      setCart(cartData);
      console.log("cart data:", cartData);

      const totalPrice = cartData.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
      );
      setPrice(totalPrice);

      console.log("total price:", totalPrice);
    }
  });

  {/* Fetch user's saved addresses */}
  const getAddresses = useCallback(async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/addresses`, {
        headers: { Authorization: token },
      });
      
      const resData = data.data || [];
      setAddresses(resData);
      console.log("addresses:", resData);
    } catch (err) {
      console.error("Error fetching cart:", err.response?.data || err.message);
    }
  }, [token]);

  {/* Update address_id state */}
  useEffect(() => {
    if (selectedAddress) {
      setAddress_id(selectedAddress.id);
      console.log("selected address id:", selectedAddress.id);
    } else {
      setAddress_id('');
    }
  }, [selectedAddress]);

  {/* Fetch dates */}
  const getDates = () => {
    axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/dates`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          const response = res.data;
          setDates(response);
          console.log("dates:", response);
        })
        .catch((err) => {
          console.log("error:", err.message);
        })
  };

  {/* Format date for sending to the backend */}
  const formatDateForBackend = (date) => {
    if (!date || !date.year || !date.month || !date.day || 
        isNaN(date.year) || isNaN(date.month) || isNaN(date.day)) {
      console.error("Invalid date values:", date);
      return null;
    }
    return `${date.year}/${date.month}/${date.day}`;
  };

  const checkout = async () => {
    if (!selectedDate?.date) {
      showAlert("لطفا یک تاریخ انتخاب کنید", "warning", 2300);
      return;
    }

    const date = formatDateForBackend(selectedDate.date);
    if (!date) {
      showAlert("تاریخ انتخاب‌شده معتبر نیست", "warning", 2300);
      return;
    }

    if (!address_id) {
      showAlert("لطفاً آدرس خود را انتخاب کنید", "warning", 2300);
      return;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/checkout`,
        { date, address_id, type: "cash" },
        { headers: { Authorization: token } }
      );
      showAlert("سفارش شما با موفقیت ثبت شد", "success", 2500);
      router.push("/account/orders");
    } catch (err) {
      showAlert(err?.response?.data?.response || "خطایی در ثبت سفارش رخ داده است", "warning", 2300);
      console.error("Checkout error:", err);
    }
  };

  useEffect(() => {
    if (token) {
      getDates();
      getAddresses();
      getCartFromLocalStorage();
    }
  }, [token]);

  return (
    <>
    <div className="body">
      <Navbar />
      {/* header title */}
      <div 
        className="border-b border-b-light_brown_600 hidden lg:block pb-3 text-[18px] font-bold font-yekan mb-6" 
        style={{ marginTop: '20px', borderBottom: '1px solid #DBDBDB', paddingBottom: '15px' }}
      >
        ثبت سفارش
      </div>
      <div className="main-style lg:flex lg:gap-6 mb-10">
        <div className="lg:flex-[2.7]">
          {/* cart info */}
          {Array.isArray(cart) && cart.length > 0 ? (
            cart.map((item, index) => (
              <CheckOutProduct key={item.id || index} cartInfo={item}  />
            ))
          ) : (
            <p className="font-yekan">سفارشی وجود ندارد.</p>
          )}
          {/* address info */}
          <div className="border border-light_brown_600 p-2.5 lg:p-4 rounded-2xl mt-5">
            <div className="flex flex-col text-Gray59 text-[12px] font-yekan">
              <div className="flex items-center lg:!text-[16px]">
                <span>
                  <Icon
                    icon="fa6-solid:truck-fast"
                    width="19"
                    height="19"
                    className="mb-1 ml-1.5"
                  />
                </span>
                <span>انتخاب آدرس</span>
              </div>
              <div className="flex gap-3">
                {addresses.length > 0 ? (
                  <AddressSelectOption 
                    placeholder="آدرس مورد نظر خود را انتخاب کنید..."
                    array={addresses}
                    selectedOption={selectedAddress}
                    setSelectedOption={setSelectedAddress}
                    className="w-full"
                  />
                ) : (
                  <span className="text-black_12 text-[13px] w-full">
                    آدرسی وجود ندارد.
                  </span>
                )}
                <button
                  className="w-48 border border-light_brown_600 p-2.5 rounded-xl text-black_12 mt-2 flex items-center justify-center"
                  onClick={() => setIsOpen(true)}
                >
                  <Icon
                    icon="ic:round-plus"
                    width="25"
                    height="25"
                    className="ml-1"
                    alt="address"
                  />
                  افزودن آدرس جدید
                </button>
              </div>
            </div>
          </div>
          {/* dates */}
          <div className="border border-light_brown_600 p-2.5 lg:p-4 rounded-2xl mt-5">
            <div className="flex items-center text-[12px] text-Gray59 lg:!text-[16px] font-yekan">
              <span>
                <Icon icon="ic:round-timer" width="24" height="24" />
              </span>
              <span className="mr-1">زمانبندی تحویل سفارش به پست</span>
            </div>
            <div className="flex items-center justify-between text-[12px] mt-4 lg:!text-[16px] font-yekan lg:justify-start lg:gap-4">
              {Array.isArray(dates) && dates.length > 0 ? (
                dates.map((date, index) => (
                  <div 
                    key={date.id || index}
                    className={`flex flex-col border p-2 lg:p-3.5 lg:px-9 rounded-2xl cursor-pointer ${
                      selectedDate && (date.id ? date.id === selectedDate.id : index === selectedDate.index)
                        ? "bg-[#C628280D] border-[#C62828]"
                        : "border-light_brown_600"
                      }`}
                    onClick={() => {
                      console.log("Selected date:", date);
                      setSelectedDate({ date, index });
                    }}
                  >
                    <span className="block text-[#595959] text-[14px] mb-1">{getFullDayName(date.dayWeek)}</span>
                    <div className="flex gap-1">
                      <span className="text-[#000000] text-[14px]">{date.day}</span>
                      <span className="text-[#000000] text-[14px]">{getMonthName(date.month)}</span>
                    </div>
                  </div>
                ))
              ) : null}
            </div>
          </div>
          <div className="border border-light_brown_600 p-2.5 lg:p-4 rounded-2xl mt-5 flex items-center justify-between">
            <div className="text-Gray59 text-[14px] flex items-center lg:!text-[16px] font-yekan">
              <span className="ml-1.5">
                <Icon icon="teenyicons:discount-solid" width="15" height="15" />
              </span>
              <span>کد تخفیف</span>
            </div>
            <div>
              <Input
                placeholder="کد تخفیف خود را وارد کنید"
                className="h-0 mt-0 px-20 lg:!text-[16px]"
              />
            </div>
          </div>
          </div>
          {/* prices & checkout */}
          <div className="lg:flex-1">
            <div className="border border-light_brown_600 p-2.5 lg:p-4 rounded-2xl mt-3 text-black_12 text-[14px] font-yekan">
              <div className="flex items-center justify-between py-3.5 mx-1.5 border-b-2 border-b-light_brown_600">
                <span>قیمت محصولات</span>
                <span>{price.toLocaleString()} تومان</span>
              </div>
              <div className="flex items-center justify-between py-3.5 mx-1.5 border-b-2 border-b-light_brown_600">
                <span>هزینه ارسال</span>
                <span>{postCharge.toLocaleString()} تومان</span>
              </div>
              <div className="flex items-center justify-between py-3.5 mx-1.5 text-main_color">
                <span>جمع سبد خرید</span>
                <span>{total.toLocaleString()} تومان</span>
              </div>
            </div>
            <div className="pt-3 pb-5 border-light_brown_600 rounded-2xl pl-2">
              <div className="pt-3 pb-5 border-b border-[#e0e0e2] pl-2">
                <div className="flex flex-col gap-4">
                  <div className="mt-3 border border-main_color rounded-xl">
                    <button 
                      className="flex items-center justify-center w-full p-3 text-black_12"
                      onClick={checkout}
                    >
                      <span className="ml-1 font-yekan">ثبت سفارش و پرداخت</span>
                      <span>
                        <Icon
                          className="text-black_12"
                          icon="solar:alt-arrow-left-linear"
                          width="23"
                          height="23"
                        />
                      </span>
                    </button>
                  </div> 
                </div>
              </div>
            </div>
          </div>
      </div>
      <Menu select="shopping-cart" />
    </div>
    <CreateAddress isOpen={isOpen} setIsOpen={setIsOpen} getAddresses={getAddresses} />
    <Footer />
    </>
  )
}

export default Checkout;