"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@/Context/UserContext";
import Navbar from "@/Components/Navbar/Navbar";
import OrderProduct from "@/Components/Account/Orders/OrderProduct";
import SideBarAccount from "@/Components/Account/SideBarAccount/SideBarAccount";
import Menu from "@/Components/menu/Menu";
import axios from "axios";
import Footer from "@/Components/Footer/Footer";

function Orders() {
  const [orders, setOrders] = useState([]);
  const { token } = useUser();

  const getOrders = () => {
    axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          const resData = res.data.data;
          console.log("orders:", resData);

          setOrders(resData);
        })
        .catch((err) => {
          console.log(err.response);
        });
  };

  useEffect(() => {
    if (token) {
      getOrders();
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
            <span className="text-center mb-4 mt-7 lg:text-start lg:text-[18px] font-bold font-yekan">سفارشات</span>
              <div>
                <OrderProduct orders={orders} />
              </div>
            </div>
        </div>
        <Menu select="account" />
      </div>
      <Footer />
    </>
  )
}

export default Orders;
