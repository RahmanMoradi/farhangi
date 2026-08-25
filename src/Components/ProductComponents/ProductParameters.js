import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const ProductParameters = ({ parameters }) => {
    const [showAll, setShowAll] = useState(false);
    const visibleItems = showAll ? parameters : parameters.slice(0, 4);
    console.log("parameters", parameters);

    return (
        <div className="text-black_12 rounded-xl">
        {visibleItems.map((item, index) => {
            const valueObj = Array.isArray(item.parameter_values) ? item.parameter_values[0] : null;
            const value = valueObj?.parameter_value ?? "";
            const isLong = typeof value === "string" && value.length > 50;

            return (
                <div
                  key={item.id || index}
                  className={`mt-1 border-b border-b-light_brown_600 py-2 flex justify-between items-start ${
                      isLong ? 'flex-col gap-1' : 'flex-row items-center'
                    }`}
                >
                  <span className="text-Gray59 text-[14px]">{item.parameter_name}</span>
                  <span className="text-black_12 text-[14px]">{value}</span>
                </div>
            );
        })}

        {Array.isArray(parameters) && parameters.length > 4 && (
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="flex items-center gap-1 text-blue-600 text-sm mt-4"
            >
               {showAll ? "بستن مشخصات" : "مشاهده همه مشخصات"}
               {showAll ? <FiChevronUp /> : <FiChevronDown />}
            </button>
        )}
        </div>
    );
};

export default ProductParameters;