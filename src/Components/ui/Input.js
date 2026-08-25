import React, { useState } from "react";

function Input({
  placeholder,
  className,
  label,
  children,
  textarea = false,
  onChange,
  value,
  isNumber,
}) {
  const [error, setError] = useState("");

  const isEnglishNumber = (text) => /^[0-9]*$/.test(text);

  const handleChange = (e) => {
    const val = e.target.value;

    if (isNumber) {
      // Only English numbers are allowed
      if (isEnglishNumber(val)) {
        setError("");
        onChange(val);
      } else {
        setError("لطفاً عدد را با اعداد انگلیسی وارد کنید");
      }
      return;
    }

    onChange(val);
    setError("");
  };

  return (
    <div>
      {label && (
        <label className="block text-black_12 -top-2.5 mr-2 text-[14px] font-yekan">
          {label}
        </label>
      )}
      {textarea ? (
        <textarea
          rows="6"
          placeholder={placeholder}
          className={`p-4 py-[20px] font-yekan border-2 mt-2 border-light_brown_200 ${className} rounded-lg text-sm bg-[#EDEDED] resize-none`}
          value={value}
          onChange={handleChange}
        />
      ) : (
        <input
          placeholder={placeholder}
          className={`p-4 py-[20px] font-yekan border-2 mt-2 border-light_brown_200 ${className} rounded-lg text-sm bg-[#EDEDED]`}
          value={value}
          onChange={handleChange}
        />
      )}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-light_brown_600">
        {children}
      </div>
    </div>
  );
}

export default Input;
