import { useState } from "react";
import { putMentorDetails } from "../../../services/mentorRegistration";

const ContactInfo = ({ step, setStep }) => {
  const [address, setAddress] = useState({
    addressLine: "",
    state: "",
    district: "",
    pincode: "",
    linkedin: "",
    website: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const validateForm = () => {
    const { addressLine, state, district, pincode, linkedin, website } = address;
    if (addressLine && state && district && pincode && linkedin && website) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
    validateForm();
  };

  const submit = async () => {
    console.log(address);
    await putMentorDetails({ step, address });
    setStep((prev) => prev + 1);
  };

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
    "Uttarakhand", "West Bengal"
  ];

  const districts = {
    "Tamil Nadu": ["Ariyalur", "Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
    // Add other districts for each state
  };

  return (
    <section className="h-screen bg-white overflow-y-auto flex flex-col w-100 pt-5">
      <div className="container mx-auto p-2 flex-grow w-75">
        <h1 className="text-xl font-bold mb-2">Address Details</h1>
        <p className="text-sm mb-4">
          Please provide the information below to validate the address details of your startup company.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <AddressForm
            address={address}
            setAddress={setAddress}
            districts={districts}
            states={states}
            handleAddressChange={handleAddressChange}
          />
        </div>
      </div>
      <button
        className={`bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500 m-5 ${isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={submit}
        disabled={isButtonDisabled}
      >
        Continue
      </button>
    </section>
  );
};

const AddressForm = ({ address, states, handleAddressChange, districts }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-1">Address</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="addressLine" className="block font-bold mb-1 text-gray-700 text-sm">
            Address Line:
          </label>
          <textarea
            id="addressLine"
            name="addressLine"
            value={address.addressLine}
            onChange={handleAddressChange}
            className="w-full p-2 pl-4 text-sm text-gray-700 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="state" className="block font-bold mb-1 text-gray-700 text-sm mt-2">
            State:
          </label>
          <select
            id="state"
            name="state"
            value={address.state}
            onChange={handleAddressChange}
            className="w-full p-2 pl-4 text-sm text-gray-700 border border-gray-300 rounded-md"
          >
            <option value="">Select a State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>
      {address.state && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="district" className="block font-bold mb-1 text-gray-700 text-sm mt-2">
              District:
            </label>
            <select
              id="district"
              name="district"
              value={address.district}
              onChange={handleAddressChange}
              className="w-full p-2 pl-4 text-sm text-gray-700 border border-gray-300 rounded-md"
            >
              <option value="">Select a District</option>
              {districts[address.state]?.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pincode" className="block font-bold mb-1 text-gray-700 text-sm mt-2">
              Pincode:
            </label>
            <input
              id="pincode"
              type="number"
              name="pincode"
              value={address.pincode}
              onChange={handleAddressChange}
              className="w-full p-2 pl-4 text-sm text-gray-700 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="linkedin" className="block font-bold mb-1 text-gray-700 text-sm mt-2">
            LinkedIn:
          </label>
          <input
            id="linkedin"
            type="text"
            name="linkedin"
            value={address.linkedin}
            onChange={handleAddressChange}
            className="w-full p-2 pl-4 text-sm text-gray-700 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="website" className="block font-bold mb-1 text-gray-700 text-sm mt-2">
            Website:
          </label>
          <input
            id="website"
            type="text"
            name="website"
            value={address.website}
            onChange={handleAddressChange}
            className="w-full p-2 pl-4 text-sm text-gray-700 border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
