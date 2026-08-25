"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@/Context/UserContext";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Information from "@/Components/Account/Information";
import SideBarAccount from "@/Components/Account/SideBarAccount/SideBarAccount";
import Navbar from "@/Components/Navbar/Navbar";
import Menu from "@/Components/menu/Menu";
import Footer from "@/Components/Footer/Footer";

function Account() {
  // State Management
  const [isOpen, setIsOpen] = useState(false);
  const [fisrtName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [nationalCode, setNationalCode] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const { userInfo } = useUser();

  // Getting Available Information
  useEffect(() => {
    if (userInfo?.name) setFirstName(userInfo?.name);
    if (userInfo?.family) setLastName(userInfo.family);
    if (userInfo?.mobile) setMobileNumber(userInfo.mobile);
    if (userInfo?.national_code) setNationalCode(userInfo?.national_code);
    if (userInfo?.birth_date) setBirthDate(userInfo?.birth_date);

    console.log("user info:", userInfo);
  }, [userInfo]);

  return (
    <>
    <div className="body mb-16">
      <div className="relative">
        <Navbar />
        <div className="lg:flex main-style lg:gap-8 lg:mt-8">
          <div className="hidden lg:block lg:flex-1">
            <SideBarAccount />
          </div>
          <div className="lg:flex-[2.7]">
            <div className="text-center mt-5 text-[17px] font-bold font-yekan lg:flex lg:items-center lg:justify-between">
              اطلاعات حساب
              <div
                className="left-0 bottom-0 items-center justify-center p-3 bg-light_brown_200 rounded-xl cursor-pointer lg:flex gap-1 hidden"
                onClick={() => {
                  setIsOpen(true)
                }}  
              >
                <Image
                  src="/images/account/icon/edit.svg"
                  width="21"
                  height="21"
                  className="ml-1"
                  alt="editing information"
                />
                <span className="text-[14px] font-medium font-yekan">ویرایش اطلاعات</span>
              </div>
            </div>
            <div className="text-[14px] mt-2">
              <div className="flex items-center justify-between border-b border-b-light_brown_600 py-4">
                <span className="text-Gray59 font-yekan">نام و نام خانوداگی</span>
                <span className="text-black_12 font-yekan">{fisrtName} {lastName}</span>
              </div>
              <div className="flex items-center justify-between border-b border-b-light_brown_600 py-4">
                <span className="text-Gray59 font-yekan">شماره تلفن</span>
                <span className="text-black_12 font-yekan">{mobileNumber}</span>
              </div>
              <div className="flex items-center justify-between border-b border-b-light_brown_600 py-4">
                <span className="text-Gray59 font-yekan">کد ملی</span>
                <span className="text-black_12 font-yekan">{nationalCode ? nationalCode : '__________'}</span>
              </div>
              <div className="flex items-center justify-between border-b border-b-light_brown_600 py-4">
                <span className="text-Gray59 font-yekan">تاریخ تولد</span>
                <span className="text-black_12 font-yekan">{birthDate ? birthDate : '__________'}</span>
              </div>
            </div>
            <div
              className="flex items-center justify-center p-3 font-yekan bg-light_brown_200 rounded-xl mt-5 cursor-pointer lg:hidden"
              onClick={() => setIsOpen(true)}
            >
              <Icon
                icon="tabler:edit"
                width="24"
                height="24"
                className="ml-1"
              />
              ویرایش اطلاعات
            </div>
          </div>
        </div>
        <Menu select="account" />
      </div>
      <Information
       isOpen={isOpen} 
       setIsOpen={setIsOpen}
       fisrtName={fisrtName}
       setFirstName={setFirstName}
       lastName={lastName}
       setLastName={setLastName}
       mobileNumber={mobileNumber}
       setMobileNumber={setMobileNumber}
       nationalCode={nationalCode}
       setNationalCode={setNationalCode}
      />
    </div>
    <Footer />
    </>
  );
}

export default Account;
