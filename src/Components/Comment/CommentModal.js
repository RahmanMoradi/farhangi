"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Rating } from "@mui/material";
import { useUser } from "@/Context/UserContext";
import Image from "next/image";
import Input from "../ui/Input";
import axios from "axios";
import useAlert from "@/Hooks/useAlert";

function CommentModal({ setIsOpen, productInfo }) {
  const [score, setScore] = useState(0);
  const [text, setText] = useState("");
  const { token } = useUser();
  const { showAlert } = useAlert();

  const createComment = () => {
    if (!token) {
      showAlert("برای ثبت دیدگاه، ابتدا وارد حساب کاربری خود شوید.", "error", 2300);
      return Promise.resolve(false);
    }

    let body = {
      score,
      text,
    };
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/products/comment/${productInfo?.id}`,
        body,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        showAlert(res.data.message, "success", 2300);
        return true;
      })
      .catch((err) => {
        showAlert(err.response.data.message, "error", 2300);
        return false;
      });
  };

  return (
    <div className="fixed inset-0 z-[1000] block w-screen overflow-y-auto bg-black bg-opacity-30 transition-all visible opacity-100">
      <div
        className={`md:left-1/2 md:-translate-x-1/2 md:right-auto md:w-[530px]
      fixed top-1/2 left-4 right-4 -translate-y-1/2 bg-white rounded-xl h-fit p-5 pb-7 z-50 transition-all duration-500 ease-in-out`}
      >
        <span
          className="flex-1 absolute right-5 top-5 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <Icon icon="ic:round-close" width="24" height="24" />
        </span>
        <div className="text-center font-yekan border-b border-[#e0e0e2] pb-4">
          ثبت دیدگاه
        </div>
        <div className="flex items-center mt-4">
          <div className="flex items-center rounded-xl w-full shrink-0 lg:w-full p-3 shadow-[0_2px_10px_0px_rgba(0,0,0,0.1)]">
            <Image
              width={100}
              height={100}
              src={productInfo?.images[0] ? productInfo?.images[0] : null}
              alt=""
              className="w-[56px]"
            />
            <p className="mr-4 text-[14px] font-yekan">{productInfo?.title}</p>
          </div>
        </div>
        <div className="mt-9">
          <label className="text-[#3f4064] text-[13px] font-bold font-yekan">
            نظر خود را درباره این محصول بنویسید.
          </label>
          <Input
            placeholder="توضیحات"
            textarea
            className="w-full bg-gradient-to-t from-[#efeff09c] via-[#efeff080] to-[#efeff03f] text-[#3f4064]"
            onChange={setText}
            value={text}
          />
        </div>
        <div className="mt-6 text-[12px] lg:text-[14px]">
          <span className="text-[#3f4064] text-[13px] font-bold font-yekan">امتیاز محصول</span>
          <div className="flex items-center justify-between">
            <div className="text-[#3f4064] text-[12px] font-yekan">امتیازی برای این محصول ثبت کنید.</div>
            <div dir="ltr">
              <Rating
                name="simple-controlled"
                value={score}
                onChange={(event, newValue) => {
                  setScore(newValue);
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <button
            className="bg-main_color text-[#F4F4F4] font-semibold font-yekan p-3 px-12 rounded-2xl ml-3"
            onClick={() => createComment().then((created) => created && setIsOpen(false))}
          >
            ثبت دیدگاه
          </button>
          <button
            className="bg-[#efeff0] text-[#3f4064] font-semibold font-yekan p-3 px-12 rounded-2xl"
            onClick={() => setIsOpen(false)}
          >
            لغو
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentModal;
