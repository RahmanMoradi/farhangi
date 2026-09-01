"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/Context/UserContext";
import { addProductsCart } from "@/lib/utils/addProductsCart";
import Button from "@/Components/ui/Button";
import Input from "@/Components/ui/Input";
import Image from "next/image";
import InputSignIn from "@/Components/SignIn/InputSignIn";
import axios from "axios";
import useAlert from "@/Hooks/useAlert";

function SignUpComponent() {
  const searchParams = useSearchParams();
  const number = searchParams.get("number");
  const router = useRouter();
  const { login } = useUser();

  const [isBtn, setIsBtn] = useState(false);
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const { showAlert } = useAlert();

  const register = () => {
    let body = {
      name,
      family,
      mobile,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, body)
      .then((res) => {
        showAlert(res.data.message, "success", 2500);
        router.push(`?number=${mobile}`);
      })
      .catch((err) => {
        showAlert(err.response.data.message, "warning", 2500);
      });
  };

  useEffect(() => {
    if (name && family && mobile.length === 11) {
      setIsBtn(false);
    } else {
      setIsBtn(true);
    }
  }, [name, family, mobile]);

  const verify = () => {
    let body = {
      mobile: number,
      code: code,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, body)
      .then((res) => {
        addProductsCart(`Bearer ${res.data.data.token}`);
        login(`Bearer ${res.data.data.token}`);
        showAlert(res.data.message, "success", 2500);
        router.push(`/`);
      })
      .catch((err) => {
        showAlert(err.response.data.message, "warning", 2500);
      });
  };

  return (
    <div className="xl:flex xl:items-center xl:justify-between">
      <div className="flex flex-col items-center justify-center h-screen text-center xl:flex-1">
        <div>
          <Image
            className="m-auto"
            width={190}
            height={190}
            alt="logo"
            src="/images/logo/logo.png"
            loading="eager"
          />
        </div>
        <p className="text-[24px] font-yekan mt-4">{number ? "کد ورود" : "وارد شوید"}</p>
        <p className="text-Gray59 mt-2">
          {number ? (
            <>
              کد ارسال شده به شماره
              <span className="text-main_color font-yekan mr-1">{number}</span> را وارد
              کنید
            </>
          ) : (
            <span className="font-yekan">
              "برای ورود به فروشگاه فرهنگی استور اطلاعات زیر را کامل کنید"
            </span>
          )}
        </p>
        {number && (
          <div
            className="mt-3 p-1 px-1.5 cursor-pointer rounded-xl text-[14px] font-yekan flex items-center border border-light_brown_600"
            onClick={() => {
              router.push("/sign-in");
            }}
          >
            <Icon icon="tabler:edit" width="22" height="22" className="ml-1" />
            ویرایش شماره
          </div>
        )}
        {/* {number && <div className="mt-2">1:25</div>} */}
        <div className="my-5">
          {number ? (
            <div className="flex items-center justify-between gap-3 w-[325px]">
              <InputSignIn code={code} setCode={setCode} />
            </div>
          ) : (
            <>
              <Input
                placeholder="نام خود را وارد کنید"
                className="mb-3 w-[300px] block font-yekan"
                value={name}
                onChange={setName}
              />
              <Input
                placeholder="نام خانوادگی خود را وارد کنید"
                className="mb-3 w-[300px] block font-yekan"
                value={family}
                onChange={setFamily}
              />
              <Input
                placeholder="شماره تلفن همراه خود را وارد کنید"
                className="w-[300px] block font-yekan"
                value={mobile}
                onChange={setMobile}
                isNumber={true}
              />
            </>
          )}
        </div>
        <div>
          {number ? (
            <Button
              onClick={verify}
              text="ورود"
              className="w-[325px] py-2"
              inner={true}
            />
          ) : (
            <div>
              <Button
                text="ثبت نام"
                inner={true}
                className="ml-3 w-36"
                disabled={isBtn}
                onClick={register}
              />
              <Button
                text="ورود"
                className="w-36 !bg-transparent"
                href="/sign-in"
              />
            </div>
          )}
        </div>
      </div>
      <div className="w-full xl:flex-1 hidden xl:block">
        <Image
          className="w-full h-dvh"
          width={100000000}
          height={100000000}
          alt="image"
          src="/images/sign-in/login.webp"
        />
      </div>
    </div>
  );
}

export default SignUpComponent;
