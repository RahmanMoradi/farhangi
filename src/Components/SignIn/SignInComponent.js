"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useUser } from "@/Context/UserContext";
import { useRouter, useSearchParams } from "next/navigation";
import { addProductsCart } from "@/lib/utils/addProductsCart";
import InputSignIn from "@/Components/SignIn/InputSignIn";
import Button from "@/Components/ui/Button";
import Input from "@/Components/ui/Input";
import Image from "next/image";
import axios from "axios";
import useAlert from "@/Hooks/useAlert";

function SignInComponent() {
  const searchParams = useSearchParams();
  const number = searchParams.get("number");
  const router = useRouter();
  const { login } = useUser();

  const [isBtn, setIsBtn] = useState(false);
  const [phone_number, setPhone_number] = useState("");
  const [code, setCode] = useState("");
  const { showAlert } = useAlert();

  const loginFunc = () => {
    setIsBtn(false);
    let body = {
      mobile: phone_number,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, body)
      .then((res) => {
        showAlert(res.data.message, "success", 2300);
        router.push(`?number=${phone_number}`);
      })
      .catch((err) => {
        showAlert(err.response.data.message, "warning", 2300);
      });
  };

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

  useEffect(() => {
    if (phone_number.length === 11) {
      setIsBtn(false);
    } else {
      setIsBtn(true);
    }
  }, [phone_number]);

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
        <p className="text-Gray59 font-yekan mt-2">
          {number ? (
            <>
              کد ارسال شده به شماره
              <span className="text-main_color mr-1">{number}</span> را وارد
              کنید
            </>
          ) : (
            "برای ورود به فروشگاه مهران استور اطلاعات زیر را کامل کنید"
          )}
        </p>
        {number && (
          <div
            className="mt-3 p-1 px-1.5 cursor-pointer rounded-xl text-[14px] flex items-center border border-light_brown_600"
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
            <Input
              placeholder="شماره تلفن همراه خود را وارد کنید"
              className="w-[325px] block"
              onChange={setPhone_number}
              value={phone_number}
              isNumber={true}
            />
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
            <Button
              text="ارسال کد"
              className="w-[325px] !text-black_12 py-2 !bg-[#F2F2F2]"
              disabled={isBtn}
              onClick={loginFunc}
            />
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

export default SignInComponent;