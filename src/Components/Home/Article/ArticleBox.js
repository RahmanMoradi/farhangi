import { Icon } from "@iconify/react";
import Image from "next/image";
import React from "react";

function ArticleBox() {
  return (
    <div className="p-5">
      <div className="w-full">
        <Image
          width={20000}
          height={20000}
          src="/images/home/article/image.webp"
          className="w-full h-[145px]"
          alt=""
        />
      </div>
      <h4 className="mt-3 block font-yekan">مک بوک ایر؛ بررسی تخصصی و نکات خرید</h4>
      <p className="text-[12px] mt-1.5 text-Gray59 font-yekan">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
        از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
        متنوع با هدف بهبود ابزارهای کاربردی...
      </p>
      <div className="flex items-center justify-between text-second_color mt-2.5">
        <span className="flex">
          <Icon icon="uiw:date" width="20" height="20" />
          <span className="mr-1.5 font-yekan">18 اردیبهشت 1404</span>
        </span>
        <span className="flex">
          <Icon icon="iconamoon:eye-light" width="24" height="24" />
          <span className="mr-1.5 font-yekan">220</span>
        </span>
      </div>
    </div>
  );
}

export default ArticleBox;
