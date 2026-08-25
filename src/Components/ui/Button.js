import Link from "next/link";
import React from "react";

function Button({ text, inner, className, href, disabled, onClick }) {
  return href ? (
    <Link href={href}>
      <button
        disabled={disabled}
        className={`${
          inner ? "bg-main_color text-white" : "bg-white text-main_color"
        } border-2 p-1.5 rounded-lg border-main_color font-yekan ${className} ${
          disabled && "opacity-50"
        }`}
      >
        {text}
      </button>
    </Link>
  ) : (
    <button
      className={`${
        inner ? "bg-main_color text-white" : "bg-white text-main_color"
      } border-2 p-1.5 rounded-lg border-main_color font-yekan ${className} ${
        disabled && "opacity-50"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
