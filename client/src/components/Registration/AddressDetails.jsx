import { useState, useEffect } from "react";
import { putEntityDetails } from "../../services/registrationService";

const AddressDetails = ({ step, setStep }) => {
  const [officeAddress, setOfficeAddress] = useState({
    addressLine: "",
    state: "",
    district: "",
    pincode: "",
  });

  const [manufacturingAddress, setManufacturingAddress] = useState({
    addressLine: "",
    state: "",
    district: "",
    pincode: "",
  });

  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    // Check if all fields are filled in both addresses
    const isOfficeAddressComplete = Object.values(officeAddress).every(field => field.trim() !== "");
    const isManufacturingAddressComplete = Object.values(manufacturingAddress).every(field => field.trim() !== "");
    setIsFormComplete(isOfficeAddressComplete && isManufacturingAddressComplete);
  }, [officeAddress, manufacturingAddress]);

  const submit = async () => {
    console.log(officeAddress);
    console.log(manufacturingAddress);
    await putEntityDetails({ officeAddress, manufacturingAddress, step });
    setStep(prev => prev + 1);
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

  const handleAddressChange = (setAddress) => (e) => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AddressForm
            address={officeAddress}
            setAddress={setOfficeAddress}
            districts={districts}
            states={states}
            label="Office Address"
            handleAddressChange={handleAddressChange}
          />
          <AddressForm
            address={manufacturingAddress}
            setAddress={setManufacturingAddress}
            districts={districts}
            states={states}
            label="Manufacturing Address"
            handleAddressChange={handleAddressChange}
          />
        </div>
      </div>
      <button
        className={`bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500 m-5 ${isFormComplete ? '' : 'opacity-50 cursor-not-allowed'}`}
        onClick={submit}
        disabled={!isFormComplete}
      >
        Continue
      </button>
    </section>
  );
};

const AddressForm = ({ address, setAddress, districts, states, label, handleAddressChange }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-1">{label}</h2>
      <label
        htmlFor={`${label.toLowerCase().replace(" ", "")}Line`}
        className="block font-bold mb-1 text-gray-700 text-sm"
      >
        Address Line:
      </label>
      <textarea
        id={`${label.toLowerCase().replace(" ", "")}Line`}
        name="addressLine"
        value={address.addressLine}
        onChange={handleAddressChange(setAddress)}
        className="w-full p-2 pl-4 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      />
      <label
        htmlFor={`${label.toLowerCase().replace(" ", "")}State`}
        className="block font-bold mb-1 text-gray-700 text-sm mt-2"
      >
        State:
      </label>
      <select
        id={`${label.toLowerCase().replace(" ", "")}State`}
        name="state"
        value={address.state}
        onChange={handleAddressChange(setAddress)}
        className="w-full p-2 pl-4 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      >
        <option value="">Select a State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      {address.state && (
        <>
          <label
            htmlFor={`${label.toLowerCase().replace(" ", "")}District`}
            className="block font-bold mb-1 text-gray-700 text-sm mt-2"
          >
            District:
          </label>
          <select
            id={`${label.toLowerCase().replace(" ", "")}District`}
            name="district"
            value={address.district}
            onChange={handleAddressChange(setAddress)}
            className="w-full p-2 pl-4 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          >
            <option value="">Select a District</option>
            {districts["TamilNadu"].map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </>
      )}
      <label
        htmlFor={`${label.toLowerCase().replace(" ", "")}Pincode`}
        className="block font-bold mb-1 text-gray-700 text-sm mt-2"
      >
        Pincode:
      </label>
      <input
        id={`${label.toLowerCase().replace(" ", "")}Pincode`}
        type="text"
        name="pincode"
        value={address.pincode}
        onChange={handleAddressChange(setAddress)}
        className="w-full p-2 pl-4 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      />
    </div>
  );
};

export default AddressDetails;
