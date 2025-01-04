import React, { useState } from 'react';
import { putInvestorDetails } from "../../../services/investorRegistration";

const ContactInfo = ({ step, setStep }) => {
  const [address, setAddress] = useState({
    addressLine: "",
    state: "",
    district: "",
    pincode: "",
    linkedin: "",
    website: "",
  });

  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!address.addressLine) newErrors.addressLine = "Address Line is required.";
    if (!address.state) newErrors.state = "State is required.";
    if (!address.district) newErrors.district = "District is required.";
    if (!address.pincode) newErrors.pincode = "Pincode is required.";
    if (!address.linkedin) newErrors.linkedin = "LinkedIn is required.";
    if (!address.website) newErrors.website = "Website is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (event) => {
    event.preventDefault();
    if (validateFields()) {
      try {
        await putInvestorDetails({ address, step });
        setStep((prev) => prev + 1);
      } catch (error) {
        console.error('Error during submission', error);
      }
    }
  };

  const states = ["Tamil Nadu"];

  const districts = {
    TamilNadu: [
      "Ariyalur",
      "Chengalpattu",
      "Chennai",
      "Coimbatore",
      "Cuddalore",
      "Dharmapuri",
      "Dindigul",
      "Erode",
      "Kallakurichi",
      "Kancheepuram",
      "Karur",
      "Krishnagiri",
      "Madurai",
      "Nagapattinam",
      "Namakkal",
      "Nilgiris",
      "Perambalur",
      "Pudukkottai",
      "Ramanathapuram",
      "Ranipet",
      "Salem",
      "Sivaganga",
      "Tenkasi",
      "Thanjavur",
      "Theni",
      "Thoothukudi",
      "Tiruchirappalli",
      "Tirunelveli",
      "Tirupathur",
      "Tiruppur",
      "Tiruvallur",
      "Tiruvannamalai",
      "Tiruvarur",
      "Vellore",
      "Viluppuram",
      "Virudhunagar",
    ],
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    if (name === "state" && value !== "Tamil Nadu") {
      alert("Please select Tamil Nadu as the state. This page only works for Tamil Nadu.");
      setAddress((prevAddress) => ({ ...prevAddress, state: "", district: "" }));
    } else {
      setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
    }
  };

  return (
    <section className="h-screen bg-white overflow-y-auto flex flex-col w-100 pt-5">
      <div className="container mx-auto p-2 flex-grow w-75">
        <h1 className="text-xl font-bold mb-2">Address Details</h1>
        <p className="text-sm mb-4">
          Please provide the information below to validate the address details of your startup company.
        </p>
        <form onSubmit={submit}>
          <AddressForm
            address={address}
            setAddress={setAddress}
            districts={districts}
            states={states}
            handleAddressChange={handleAddressChange}
            errors={errors}
          />
          <button
            type="submit"
            className="bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500 m-5"
          >
            Continue
          </button>
        </form>
      </div>
    </section>
  );
};

const AddressForm = ({ address, handleAddressChange, districts, states, errors }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-1">Address</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="addressLine"
            className="block font-bold mb-1 text-gray-700 text-sm"
          >
            Address Line:
          </label>
          <textarea
            id="addressLine"
            name="addressLine"
            value={address.addressLine}
            onChange={handleAddressChange}
            className="w-full p-2 pl-4 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          {errors.addressLine && <p className="text-red-500 text-sm mt-2">{errors.addressLine}</p>}
        </div>
        <div>
          <label
            htmlFor="state"
            className="block font-bold mb-1 text-gray-700 text-sm mt-2"
          >
            State:
          </label>
          <select
            id="state"
            name="state"
            value={address.state}
            onChange={handleAddressChange}
            className="w-full p-2 pl-4 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          >
            <option value="">Select a State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && <p className="text-red-500 text-sm mt-2">{errors.state}</p>}
        </div>
      </div>
      {address.state && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="district"
              className="block font-bold mb-1 text-gray-700 text-sm mt-2"
            >
              District:
            </label>
            <select
              id="district"
              name="district"
              value={address.district}
              onChange={handleAddressChange}
              className="w-full p-2 pl-4 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              <option value="">Select a District</option>
              {districts["TamilNadu"].map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
            {errors.district && <p className="text-red-500 text-sm mt-2">{errors.district}</p>}
          </div>
          <div>
            <label
              htmlFor="pincode"
              className="block font-bold mb-1 text-gray-700 text-sm mt-2"
            >
              Pincode:
            </label>
            <input
              id="pincode"
              type="number"
              name="pincode"
              value={address.pincode}
              onChange={handleAddressChange}
              className="w-full p-2 pl-4 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            {errors.pincode && <p className="text-red-500 text-sm mt-2">{errors.pincode}</p>}
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="linkedin"
            className="block font-bold mb-1 text-gray-700 text-sm mt-2"
          >
            LinkedIn:
          </label>
          <input
            id="linkedin"
            type="text"
            name="linkedin"
            value={address.linkedin}
            onChange={handleAddressChange}
            className="w-full p-2 pl-4 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          {errors.linkedin && <p className="text-red-500 text-sm mt-2">{errors.linkedin}</p>}
        </div>
        <div>
          <label
            htmlFor="website"
            className="block font-bold mb-1 text-gray-700 text-sm mt-2"
          >
            Website:
          </label>
          <input
            id="website"
            type="text"
            name="website"
            value={address.website}
            onChange={handleAddressChange}
            className="w-full p-2 pl-4 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          {errors.website && <p className="text-red-500 text-sm mt-2">{errors.website}</p>}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
