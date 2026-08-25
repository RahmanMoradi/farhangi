import React, { useRef, useEffect, useState } from "react";

const InputSignIn = ({ setCode }) => {
  const inputRefs = useRef([]);
  const [change, setChange] = useState("");

  // تابع برای به‌روزرسانی کد هرگاه مقادیر input تغییر کند
  useEffect(() => {
    const values = inputRefs.current.map((input) => input?.value || "");
    setCode(values.join(""));
  }, [change]);

  const handleChange = (event, index) => {
    const value = event.target.value;
    setChange(value);

    if (!/^[0-9]*$/.test(value)) {
      event.target.value = "";
      return;
    }

    if (value.length === 1) {
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && event.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex items-center justify-between gap-3" dir="ltr">
      {Array.from({ length: 4 }, (_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          className="w-full text-center border-2 border-light_brown_600 !bg-transparent p-4 py-[20px] rounded-lg text-sm bg-light_brown_200"
          onChange={(event) => handleChange(event, index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          maxLength={1}
          type="text"
          inputMode="numeric"
        />
      ))}
    </div>
  );
};

export default InputSignIn;