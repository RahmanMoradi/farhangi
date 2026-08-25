"use client";
import { useState } from "react";

const SelectOption = ({ className, placeholder, label, classNameInput, array, selectedOption, setSelectedOption }) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-black_12 -top-2.5 right-3.5 text-[14px] font-yekan">
          {label}
        </label>
      )}
      <div
        className={`flex justify-between items-center mt-2 bg-light_brown_200 rounded-lg cursor-pointer p-4 py-[20px] ${classNameInput}`}
        onClick={toggleSelect}
      >
        <span className="text-[14px] font-yekan text-[#acacac]">
          {selectedOption && selectedOption.name ? selectedOption.name : placeholder}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 10l5 5 5-5"
          />
        </svg>
      </div>
      <div
        className={`absolute z-10 py-2 w-full bg-light_brown_200 rounded-lg mt-1 transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-40 opacity-100 overflow-auto" : "max-h-0 opacity-0 overflow-hidden"
        }`}
        style={{ boxShadow: '0 6px 30px 0 #2E383F0F' }}
      >
        <ul>
          {array.map((option, index) => (
            <li
              key={option.id}
              className="p-2 cursor-pointer hover:bg-gray-200 py-3 text-black_12 text-[14px] font-yekan"
              onClick={() => {handleOptionClick(option)}}
            >
              {option.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectOption;
