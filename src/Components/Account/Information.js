"use client";
import React, { useState } from "react";
import { useUser } from "@/Context/UserContext";
import useAlert from "@/Hooks/useAlert";
import Image from "next/image";
import axios from "axios";
import Input from "@/Components/ui/Input";
import Button from "@/Components/ui/Button";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/mobile.css";

function Information({ 
  isOpen, 
  setIsOpen,
  fisrtName,
  setFirstName,
  lastName,
  setLastName,
  mobileNumber,
  setMobileNumber,
  nationalCode,
  setNationalCode
}) {

  // State Managment
  const [birth, setBirth] = useState("");
  const { token } = useUser();
  const { showAlert } = useAlert();

  // The function for converting persian numbers to english
  const persianToEnglishDigits = (str) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";
    return str.replace(/[۰-۹]/g, (char) => englishDigits[persianDigits.indexOf(char)]);
  };

  // Changing the format of YYYY/MM/DD to DateObject
  const handleDateChange = (date) => {
    const formattedDate = date ? persianToEnglishDigits(date.format("YYYY/MM/DD")) : "";
    setBirth(formattedDate);
  };

  const updateProfile = () => {
    if (!/^\d{10}$/.test(nationalCode)) {
      showAlert("کد ملی باید 10 رقم باشد", "warning", 2500);
      return;
    }

    let body = {
      name: fisrtName,
      family: lastName,
      mobile: mobileNumber,
      birth_date: birth,
      national_code: nationalCode,
    };

    axios
        .put(`${process.env.NEXT_PUBLIC_API_URL}/user`, body, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log("sending data to backend", body);
          showAlert("اطلاعات شما با موفقیت ویرایش شد", "success", 2500);
        })
        .catch((err) => {
          showAlert(err.response.data.message, "warning", 2500);
        });
  };

  return (
    <>
      <div
        className={`absolute left-0 top-0 right-0 bottom-0 transition-all duration-500 ease-in-out ${
          isOpen ? "blur-lg !bg-[#0A0A0A66] z-40" : "blur-none -z-10"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        className={`
      absolute bottom-0 left-0 right-0 !bg-light_brown_200 mx-2 rounded-t-3xl h-max p-5 pb-7 z-50 transition-all duration-500 ease-in-out ${
        isOpen ? "!bottom-0" : "!-bottom-full"
      }
      lg:top-1/2 lg:left-1/2 lg:bottom-0 lg:right-auto lg:-translate-y-1/2 lg:rounded-3xl lg:-translate-x-1/2 
      lg:w-[770px]
      ${isOpen ? "lg:block" : "lg:hidden"}
      `}
      >
        <span
          className="flex-1 absolute right-5 top-5 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <Image src="/images/account/icon/edit.svg" width="24" height="24" alt="edit" />
        </span>
        <div className="text-center border-b-2 border-light_brown_600 font-yekan pb-4">
          ویرایش اطلاعات
        </div>
        <div className="flex items-center justify-between mt-8">
          <div className="sm:w-1/2">
            <Input
              placeholder="امیرعباس"
              className="!bg-[#E8E8E8] w-full"
              label="نام"
              value={fisrtName}
              onChange={setFirstName}
            />
          </div>
          <span className="px-1"></span>
          <div className="sm:w-1/2">
            <Input
              placeholder="برجی"
              className="!bg-[#E8E8E8] w-full"
              label="نام خانوادگی"
              value={lastName}
              onChange={setLastName}
            />
          </div>
        </div>
        <div className="lg:flex lg:items-center lg:justify-between mt-6">
          <div className="lg:w-1/2">
            <div className="mt-2">
              <Input
                placeholder="09123456789"
                className="!bg-[#E8E8E8] w-full"
                label="شماره تلفن"
                value={mobileNumber}
                onChange={setMobileNumber}
              />
            </div>
          </div>
          <span className="px-1 hidden lg:block"></span>
          <div className="lg:w-1/2">
            <div className="mt-2">
              <Input
                placeholder="1234567890"
                className="!bg-[#E8E8E8] w-full"
                label="کد ملی"
                value={nationalCode}
                onChange={setNationalCode}
              />
            </div>
          </div>
        </div>
        <div className="lg:block mt-6">
            <div className="flex flex-col mt-2">
              <label className="block text-black_12 mr-2 text-[14px] font-yekan">تاریخ تولد</label>
              <DatePicker
                value={birth}
                onChange={handleDateChange}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                format="YYYY/MM/DD"
                containerClassName="w-full mt-3"
                inputClass="w-full p-3 !bg-[#E8E8E8] border border-light_brown_600 font-yekan rounded-lg font-vazirmatn"
                placeholder="تاریخ تولد (1403/05/16)"
              />
            </div>
        </div>
        <div className="flex items-center mt-8">
          <Button
            inner={true}
            text="ذخیره"
            className="p-2.5 px-10 rounded-xl font-yekan ml-2"
            onClick={updateProfile}
          />
          <button
            className="!bg-light_brown_600 font-yekan p-3 px-12 rounded-xl"
            onClick={() => setIsOpen(false)}
          >
            لغو
          </button>
        </div>
      </div>
    </>
  );
}

export default Information;
