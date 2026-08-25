"use client";
import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import { useUser } from "@/Context/UserContext";
import AddressBox from "@/Components/Account/Address/AddressBox";
import CreateAddress from "@/Components/Account/Address/CreateAddress";
import SideBarAccount from "@/Components/Account/SideBarAccount/SideBarAccount";
import Navbar from "@/Components/Navbar/Navbar";
import Menu from "@/Components/menu/Menu";
import axios from "axios";
import Footer from "@/Components/Footer/Footer";

function Address() {
  const [isOpen, setIsOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const { token } = useUser();

  const getAddresses = () => {
    axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/addresses`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          const responseData = res.data.data;
          console.log("addresses:", res.data.data);

          setAddresses(responseData);
        })
        .catch((err) => {
          console.log(err.message);
        })
  };

  useEffect(() => {
    if (token) {
      getAddresses();
    }
  }, []);


  return (
    <>
      <div className="body mb-16">
        <Navbar />
        <div className="lg:flex main-style lg:gap-8 lg:mt-8">
          <div className="hidden lg:block lg:flex-1">
            <SideBarAccount />
          </div>
          <div className="lg:flex-[2.7]">
            <div className="text-center mb-4 mt-7 lg:text-[17px] font-bold font-yekan lg:flex lg:items-center lg:justify-between">
              آدرس ها
              <div>
                <button
                  className="w-full border border-light_brown_600 p-2.5 rounded-xl text-black_12 flex items-center justify-center text-[14px] font-medium font-yekan"
                  onClick={() => setIsOpen(true)}
                >
                  <Icon
                    icon="ic:round-plus"
                    width="25"
                    height="25"
                    className="ml-1"
                    alt="add address"
                  />
                  افزودن آدرس جدید
                </button>
              </div>
            </div>
            <div>
              <AddressBox addresses={addresses} />
            </div>
            <div className="lg:hidden">
              <button
                className="w-full border border-light_brown_600 p-2.5 rounded-xl text-black_12 font-yekan mt-2 flex items-center justify-center"
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
        <Menu select="account" />
      </div>
      <CreateAddress isOpen={isOpen} setIsOpen={setIsOpen} />
      <Footer />
    </>
  );
}

export default Address;
