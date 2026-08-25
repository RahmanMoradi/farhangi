import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import { useUser } from "@/Context/UserContext";
import Input from "@/Components/ui/Input";
import SelectOption from "@/Components/ui/SelectOption";
import Button from "@/Components/ui/Button";
import useAlert from "@/Hooks/useAlert";
import axios from "axios";

function CreateAddress({ isOpen, setIsOpen, getAddresses }) {
  // City & Province State Managements
  const [cities, setCities] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [city_id, setCity_id] = useState(''); 
  const [province_id, setProvince_id] = useState('');
  
  // More Detailed State Managements
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [unit, setUnit] = useState('');
  const [postalCode, setPostalCode] = useState('');
  
  const { showAlert } = useAlert();
  const { token } = useUser();


  const getProvinces = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/provinces`)
      .then((res) => {
        setProvinces(res.data.data);
        console.log("provinces:", res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getCities = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/cities`)
      .then((res) => {
        setCities(res.data.data);
        console.log("cities:", res.data.data);
        Router.push()
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getProvinces();
    getCities();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      setProvince_id(selectedProvince.id);

      // Filter cities by province_id
      const filtered = cities.filter(
        (city) => city.province_id === selectedProvince.id
      );
      setFilteredCities(filtered);

      setSelectedCity(null);

      console.log("Filtered cities:", filtered);
    } else {
      setProvince_id('');
      setFilteredCities([]);
    }
  }, [selectedProvince, cities]);

  useEffect(() => {
    if (selectedCity) {
      setCity_id(selectedCity.id);
    } else {
      setCity_id('');
    }
  }, [selectedCity]);

  const createAddress = () => {
    let body = {
      province_id,
      city_id,
      street,
      house_number: houseNumber,
      unit,
      postal_code: postalCode,
    };

    axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/addresses`, body, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log("sending data to backend", body);
          showAlert("آدرس با موفقیت ساخته شد", "success", 2500);
          getAddresses();
          setIsOpen(false);
        })
        .catch((err) => {
          showAlert(err.response.data.message, "warning", 2500);
        });
  };

  return (
    <>
      <div
        className={`absolute left-0 top-0 right-0 bottom-0 transition-all duration-500 ease-in-out ${
          isOpen ? "blur-lg !bg-[#0A0A0A66] z-40" : "blur-none -z-10"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        className={`
      absolute bottom-0 left-0 right-0 !bg-light_brown_200 mx-2 rounded-t-3xl h-max p-5 pb-7 z-50 transition-all duration-500 ease-in-out ${
        isOpen ? "!bottom-0" : "!-bottom-full"
      }
      lg:top-1/2 lg:left-1/2 lg:bottom-0 lg:right-auto lg:-translate-y-1/2 lg:rounded-3xl lg:-translate-x-1/2 
      lg:w-[770px]
      ${isOpen ? "lg:block" : "lg:hidden"}
      `}
      >
        <span
          className="flex-1 absolute right-5 top-5 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <Icon icon="ic:round-close" width="24" height="24" />
        </span>
        <div className="text-center font-yekan border-b-2 border-b-light_brown_600 pb-4">
          افزودن آدرس
        </div>
        <div className="lg:flex lg:items-center lg:justify-between lg:mt-8">
          <div className="mt-8 lg:mt-0 lg:w-1/2">
            <SelectOption
              placeholder="استان محل زندگی خود را انتخاب کنید"
              classNameInput="!bg-[#E8E8E8]"
              className="w-full"
              label="استان"
              array={provinces}
              selectedOption={selectedProvince}
              setSelectedOption={setSelectedProvince}
            />
          </div>
          <span className="px-1 hidden lg:block"></span>
          <div className="mt-2 lg:mt-0 lg:w-1/2">
            <SelectOption
              placeholder="شهر محل زندگی خود را انتخاب کنید"
              classNameInput="!bg-[#E8E8E8]"
              className="w-full"
              label="شهر"
              array={filteredCities}
              selectedOption={selectedCity}
              setSelectedOption={setSelectedCity}
            />
          </div>
        </div>
        <div className="mt-2">
          <Input
            placeholder="نام خیابان و کوچه محل زندگی خود را وارد  کنید"
            className="!bg-[#E8E8E8] w-full"
            label="خیابان و کوچه"
            value={street}
            onChange={setStreet}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="w-1/2">
            <Input
              placeholder="پلاک خود را وارد کنید"
              className="!bg-[#E8E8E8] w-full"
              label="پلاک"
              value={houseNumber}
              onChange={setHouseNumber}
              isNumber={true}
            />
          </div>
          <span className="px-1"></span>
          <div className="w-1/2">
            <Input
              placeholder="واحد خود را وارد کنید"
              className="!bg-[#E8E8E8] w-full"
              label="واحد"
              value={unit}
              onChange={setUnit}
              isNumber={true}
            />
          </div>
        </div>
        <div className="mt-2">
          <Input
            placeholder="کد پستی محل زندگی خود را وارد کنید"
            className="!bg-[#E8E8E8] w-full"
            label="کد پستی"
            value={postalCode}
            onChange={setPostalCode}
            isNumber={true}
          />
        </div>
        <div className="flex items-center mt-3">
          <Button
            inner={true}
            text="افزودن"
            className="p-2.5 px-10 rounded-xl ml-2"
            onClick={createAddress}
          />
          <button
            className="!bg-light_brown_600 font-yekan p-3 px-12 rounded-xl"
            onClick={() => setIsOpen(false)}
          >
            لغو
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateAddress;
