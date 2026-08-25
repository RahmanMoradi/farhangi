import React from "react";

const ChatBotOptionsList = ({ options, onSelect, disabled }) => {
    console.log("options:", options);
    return (
        <div className="text-black_12">
        {options?.map((option) => (
            <button
               key={option.id}
               disabled={disabled}
               onClick={() => onSelect(option)}
               className={`text-center block w-full mt-5 p-3 rounded-xl cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : "bg-light_brown_200"}`}
            >
              {option.name}
            </button>
        ))}
        </div>
    );
};

export default ChatBotOptionsList;