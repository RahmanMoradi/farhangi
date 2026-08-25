import React from "react";
import Button from "@/Components/ui/Button";

function BlogBox() {
  return (
    <div className="p-5 mt-8 rounded-lg w-full relative box-shadow">
      <div className="bg-[#D9D9D9] rounded-lg w-full h-32">
        {/* <Image height={100} width={100} src="" alt="" /> */}
      </div>
      <div className="text-light_brown_600 text-[14px] my-2 font-yekan">
        منتشر شده در 27 اسفند 1403
      </div>
      <h4 className="font-bold font-yekan">مک بوک ایر؛ بررسی تخصصی و نکات خرید</h4>
      <div className="text-[#909090] mt-2 text-[13px] text-justify font-yekan">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
        از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
        متنوع با هدف بهبود ابزارهای کاربردی...
      </div>
      {/*  */}
      <Button inner={true} text="بیشتر بخوانید" className="w-full mt-4" />
    </div>
  );
}

export default BlogBox;
