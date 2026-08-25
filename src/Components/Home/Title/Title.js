import React from "react";

function Title({ text, style, classNameText }) {
  return (
    <div className="mt-4 relative">
      <h2
        className={`text-[19px] font-bold font-yekan text-center w-[max-content] m-auto bg-[#FFFFFF] z-10 px-3 ${classNameText}`}
      >
        {text}
        <div
          className={`${style} rounded-r-full bg-[#DBDBDB] absolute px-2 left-1/2 top-1/2 -z-10 transform -translate-x-1/2 -translate-y-1/2 w-full`}
        ></div>
      </h2>
    </div>
  );
}

export default Title;
