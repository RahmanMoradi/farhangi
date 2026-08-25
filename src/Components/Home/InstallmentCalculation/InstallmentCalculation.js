import React from "react";
import Title from "../Title/Title";
import Image from "next/image";

function InstallmentCalculation() {
  return (
    <div className="lg:mt-16 mt-8">
      <Title text="طرح های خرید اقساطی" style="h-[1px]" />
      <div className="lg:hidden">
        <div className="text-center mt-8 border border-gray rounded-lg p-4">
          <div className="flex items-center justify-center">
            <Image
              width={60}
              height={60}
              src="/images/home/installment/card.svg"
              className="w-12"
              alt="img1"
            />
          </div>
          <div className="text-black_12 mt-3 text-[15px] font-yekan">خرید اقساطی با طرح کسر از حقوق</div>
          <p className="text-Gray59 text-[13px] mt-2 font-yekan">
            افرادی که طلای معتبر دارند و از نظر مالی خوش‌نام هستند، می‌توانند از
            روش خرید با طلا استفاده کنند.
          </p>
          <div className="flex flex-col items-center mt-5">
            <span className="text-black_12 text-[15px] font-yekan">چه کسانی می توانند استفاده کنند؟</span>
            <div className="flex flex-col mt-2">
              <div className="flex gap-1 mt-2 text-start">
                <span className="w-3 mt-3 rounded-full h-0.5 bg-Gray59 ml-1.5 inline-block"></span>
                <span className="text-Gray59 text-[13px] font-yekan">تمام بازنشستگان تامین اجتماعی</span>
              </div>
              <div className="flex gap-1 mt-2 text-start">
                <span className="w-3 mt-3 rounded-full h-0.5 bg-Gray59 ml-1.5 inline-block"></span>
                <span className="text-Gray59 text-[13px] font-yekan">حقوق بگیران بانک رفاه کارگران</span>
              </div>
              <div className="flex gap-1 mt-2 text-start">
                <span className="w-4 mt-3 rounded-full h-0.5 bg-Gray59 ml-1.5 inline-block"></span>
                <span className="text-Gray59 text-[13px] font-yekan">سایر افرادی که شغل ثابت دارند و امکان ارائه نامه کسر از حقوق از محل کارشان را دارند.</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-5">
            <span className="text-black_12 font-yekan">شرایط خرید:</span>
            <div className="flex items-center justify-between mt-3">
              <span className="text-Gray59 text-[14px] font-yekan">تعداد اقساط:</span>
              <span className="text-second_color text-[13px] font-yekan">12 ماهه</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-Gray59 text-[14px] font-yekan">پیش پرداخت:</span>
              <span className="text-main_color text-[13px] font-yekan">نیاز نیست</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-Gray59 text-[14px] font-yekan">سقف خرید:</span>
              <span className="text-main_color text-[13px] font-yekan">تا 100 میلیون تومان</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-Gray59 text-[14px] font-yekan">چک و سفته</span>
              <span className="text-main_color text-[13px] font-yekan">بدون نیاز به چک و سفته</span>
            </div> 
          </div>
          <div className="flex flex-col gap-4 mt-5">
            <span className="text-Gray59 text-[14px] font-yekan">
              با این طرح، تنها با ارائه نامه کسر از حقوق می توانید خریدی مطمئن و آسان را از فروشگاه مهران تجربه کنید.
            </span>
          </div>
        </div>
        { /* */ }
        <div className="text-center mt-8 border border-gray rounded-lg p-4">
          <div className="flex items-center justify-center">
            <Image
              width={60}
              height={60}
              src="/images/home/installment/gold.svg"
              className="w-12"
              alt="img1"
            />
          </div>
          <div className="text-black_12 mt-1 text-[15px] font-yekan">خرید اقساطی با طلا</div>
          <p className="text-Gray59 text-[13px] mt-2 font-yekan">
            روش نوین خرید اقساطی با پشتوانه طلا، فرصتی است ویژه برای مشتریانی که می خواهند بدون نیاز به چک با سفته، خریدی مطمئن و آسان داشته باشند.
          </p>
          <div className="flex flex-col mt-5">
            <span className="text-black_12 text-[15px] font-yekan">چه کسانی می توانند استفاده کنند؟</span>
            <div className="flex flex-col mt-2">
              <div className="flex gap-1 mt-2 text-start">
                <span className="w-3 mt-3 rounded-full h-0.5 bg-Gray59 ml-1.5 inline-block"></span>
                <span className="text-Gray59 text-[13px] font-yekan">افرادی که طلای معتبر دارند و از اعتبار مناسبی برخوردارند،
                 می توانند از این روش خرید بهره مند شوند.</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-5">
            <span className="text-black_12 text-[15px] font-yekan">شرایط خرید:</span>
            <div className="flex items-center justify-between mt-3">
              <span className="text-Gray59 text-[14px] font-yekan">تعداد اقساط:</span>
              <span className="text-main_color text-[13px] font-yekan">12 ماه</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-Gray59 text-[14px] font-yekan">حداقل میزان خرید:</span>
              <span className="text-main_color text-[13px] font-yekan">معادل 80% ارزش طلا</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-Gray59 text-[14px] font-yekan">چک و سفته</span>
              <span className="text-main_color text-[13px] font-yekan">بدون نیاز به چک و سفته</span>
            </div>
            <div className="flex flex-col mt-3 items-start">
              <span className="text-Gray59 text-[14px] font-yekan">ضمانت:</span>
              <span className="text-main_color text-[13px] font-yekan text-start mt-1">طلا به صورت قانونی و قراردادی در فروشگاه به امانت می ماند
                و پس از تسویه کامل اقساط، به طور سالم بازگردانده می شود.
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-5">
            <span className="text-Gray59 text-[14px] font-yekan">
              با این روش، شما می توانید به راحتی تا 80% ارزش طلای خود از فروشگاه مهران خرید کنید و پرداخت را در اقساط دلخواه مدیریت نمایید.
            </span>
          </div>
        </div>
      </div>
      {/* Desktop */}
      <div className="hidden lg:flex items-center justify-between gap-5 xl:mx-24 mt-4">
        <div className="flex flex-col gap-5 text-center mt-4 bg-light_brown_200 p-4 rounded-xl h-[520px] w-[700px] justify-between">
          <div className="flex flex-col gap-4 items-center justify-center">
            <Image
              width={60}
              height={60}
              src="/images/home/installment/card.svg"
              alt="img4"
              className="w-16"
            />
            <div className="text-black_12 mt-3 font-yekan">گارانتی 3 ماهه</div>
            <p className="text-Gray59 text-[14px] font-yekan">
              تمامی محصولات شامل گارانتی 3 ماهه بدون هزینه می‌باشند. 
            </p>
          </div>
          <div className="flex flex-col items-center mt-3">
            <span className="text-black_12 font-yekan">چه کسانی می توانند استفاده کنند؟</span>
            <div className="flex flex-col mt-2">
              <div className="flex gap-1 mt-2 text-start">
                <span className="w-3 mt-3 rounded-full h-0.5 bg-Gray59 ml-1.5 inline-block"></span>
                <span className="text-Gray59 text-[14px] font-yekan">تمامی خریداران محصولات</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-2">
            <span className="text-Gray59 text-[14px] font-yekan">
              در این دوره، در صورت بروز هر گونه ایراد فنی، تعمیر یا تعویض کالا بدون دریافت هزینه انجام خواهد شد.
            </span>
          </div>
        </div>
        <div className="flex flex-col text-center mt-4 bg-light_brown_200 p-4 rounded-xl h-[520px] w-[700px] justify-between">
          <div className="flex flex-col gap-5 items-center justify-center pt-2.5">
            <Image
              width={60}
              height={60}
              src="/images/home/installment/check.svg"
              alt="img4"
              className="w-16 mb-2.5"
            />
            <div className="text-black_12 mt-3 font-yekan">گارانتی 1 ساله</div>
            <p className="text-Gray59 text-[14px] font-yekan">
              مشتریان می توانند با پرداخت 10 درصد از مبلغ فروش محصول، از گارانتی یکساله بهره‌مند شوند.
            </p>
          </div>
          <div className="flex flex-col mt-3">
            <span className="text-black_12 font-yekan">چه کسانی می توانند استفاده کنند؟</span>
            <div className="flex flex-col mt-2">
              <div className="flex gap-1 mt-2 text-start">
                <span className="w-3 mt-3 rounded-full h-0.5 bg-Gray59 ml-1.5 inline-block"></span>
                <span className="text-Gray59 text-[14px] font-yekan">خریدارانی که 10 درصد از مبلغ فروش محصول را پرداخت کرده باشند</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-2">
            <span className="text-Gray59 text-[14px] font-yekan">
              در این دوره، خدمات تعمیر و تعویض کالا در صورت بروز ایراد فنی، با اولویت و سرعت بیشتری انجام خواهد شد.
            </span>
          </div>
        </div>
        <div className="flex flex-col text-center mt-4 bg-light_brown_200 p-4 rounded-xl h-[520px] w-[700px] justify-between">
          <div className="flex flex-col gap-5 items-center justify-center">
            <Image
              width={60}
              height={60}
              src="/images/home/installment/gold.svg"
              alt="img4"
              className="w-16"
            />
            <div className="text-black_12 mt-1.5 font-yekan">شرایط خرید اقساطی</div>
            <p className="text-Gray59 text-[14px] font-yekan">
              امکان خرید اقساطی محصولات با همکاری موسسات اعتباری معتبر مانند قسطا، اسنپ پی و بانک ها، فراهم می شود. 
            </p>
          </div>
          <div className="flex flex-col mt-3">
            <span className="text-black_12 font-yekan">چه کسانی می توانند استفاده کنند؟</span>
            <div className="flex flex-col mt-2">
              <div className="flex gap-1 mt-2 text-start">
                <span className="w-3 mt-3 rounded-full h-0.5 bg-Gray59 ml-1.5 inline-block"></span>
                <span className="text-Gray59 text-[14px] font-yekan">
                  تمامی خریداران
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-black_12 font-yekan">شرایط اقساط:</span>
            <div className="flex items-center justify-between mt-3">
              <span className="text-Gray59 text-[14px] font-yekan">حداقل مبلغ خرید اقساطی:</span>
              <span className="text-second_color text-[14px] font-yekan">5 میلیون تومان</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-Gray59 text-[14px] font-yekan">مدت بازپرداخت:</span>
              <span className="text-second_color text-[14px] font-yekan">3 تا 24 ماه با نرخ سود رقابتی</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-Gray59 text-[14px] font-yekan">پیش نیازها</span>
              <span className="text-second_color text-[14px] font-yekan">احراز هویت مشتری (ارائه کد ملی و سوابق مالی)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstallmentCalculation;
