import { useState } from "react";
import { ProgressBar } from "../Home";
import { putEntityDetails } from "../../services/registrationService";
import axiosHeader from "../../axiosHeader";

const EntityDetails = ({ step, setStep }) => {
  const [details, setDetails] = useState({
    name: "",
    typeOfEntity: "private",
    CINNumber: "",
    capitalInvestment: "",
    sector: "Ayurvedha",
    panCard: "",
  });
  const [logo, setLogo] = useState(null);

  const validatePAN = (pan) => {
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panPattern.test(pan);
  };

  const validateCIN = (cin) => {
    const cinPattern = /^[LU][0-9]{5}[A-Z]{3}[0-9]{6}$/;
    return cinPattern.test(cin);
  };

  const areAllInputsFilled = () => {
    return (
      details.name &&
      details.typeOfEntity &&
      details.CINNumber &&
      details.capitalInvestment &&
      details.sector &&
      details.panCard &&
      logo
    );
  };

  const submit = async () => {
    if (areAllInputsFilled() && validatePAN(details.panCard) && validateCIN(details.CINNumber)) {
      setStep((prev) => prev + 1);
      await putEntityDetails({ details, step });
      await putLogo();
      console.log(details);
    } else {
      alert("Please fill all the inputs and ensure PAN and CIN numbers are valid.");
    }
  };

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
    console.log(logo);
  };

  const putLogo = async () => {
    const formData = new FormData();
    if (logo) {
      formData.append("logo", logo);
    }
    // Create a new FormData object to include userType
    const userType = "startup"; // Set this dynamically if needed
    formData.append("userType", userType);

    try {
      const response = await axiosHeader.post("/documents/uploadimage", formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log('Image uploaded successfully', response.data);
      } catch (error) {
        console.error('Error uploading image', error);
      }
    };
  
    return (
      <section className="h-screen bg-white overflow-y-auto w-100">
        <div className="container mx-auto p-4 w-75">
          <h1 className="text-2xl font-bold mb-4">Entity Details</h1>
          <p className="text-md mb-6">
            Entity details typically refer to the specific attributes or pieces of information that define 
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <label
                htmlFor="name"
                className="block font-bold mb-2 text-gray-700"
              >
                Name:
              </label>
              <input
                id="name"
                type="text"
                placeholder="Company Name"
                className="w-full p-3 pl-5 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                onChange={(e) => setDetails({ ...details, name: e.target.value })}
                required
              />
              <label
                htmlFor="typeOfEntity"
                className="block font-bold mb-2 text-gray-700 mt-4"
              >
                Type of Entity:
              </label>
              <select
                id="typeOfEntity"
                placeholder="Select option"
                className="w-full p-3 pl-5 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                onChange={(e) => setDetails({ ...details, typeOfEntity: e.target.value })}
                required
              >
                <option value="private">Private Limited</option>
                <option value="partnership">Partnership</option>
              </select>
              <label
                htmlFor="CINNumber"
                className="block font-bold mb-2 text-gray-700 mt-4"
              >
                CIN Number:
                {details.CINNumber && !validateCIN(details.CINNumber) ? (
                  <span className="text-red-500">Invalid CIN number</span>
                ) : null}
              </label>
              <input
                id="CINNumber"
                type="text"
                placeholder="CIN Number"
                className="w-full p-3 pl-5 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                onChange={(e) => setDetails({ ...details, CINNumber: e.target.value })}
                required
              />
              <label
                htmlFor="capitalInvestment"
                className="block font-bold mb-2 text-gray-700 mt-4"
              >
                Capital Investment:
              </label>
              <input
                id="capitalInvestment"
                type="number"
                placeholder="Capital Investment"
                className="w-full p-3 pl-5 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                onChange={(e) => setDetails({ ...details, capitalInvestment: e.target.value })}
                required
              />
            </div>
            <div>
              <label
                htmlFor="logo"
                className="block font-bold mb-2 text-gray-700"
              >
                Company Logo:
              </label>
              <div className="w-full p-3 rounded-md flex justify-right items-center h-24">
                <input
                  id="logo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                  required
                />
                <label
                  htmlFor="logo"
                  className="cursor-pointer"
                >
                  {logo ? (
                    <img src={URL.createObjectURL(logo)} alt="Company Logo" className="w-24 h-24 object-cover rounded-md" />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-md flex justify-center items-center text-2xl text-gray-500 cursor-pointer">
                      +
                    </div>
                  )}
                </label>
              </div>
              <label
                htmlFor="sector"
                className="block font-bold mb-2 text-gray-700 mt-4"
              >
                Sector:
              </label>
              <select
                id="sector"
                placeholder="Select option"
                className="w-full p-3 pl-5 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                onChange={(e) => setDetails({ ...details, sector: e.target.value })}
                required
              >
                <option value="Ayurvedha">AYURVEDA</option>
                <option value="Yoga">YOGA</option>
                <option value="Unani">UNANI</option>
                <option value="Sidha">SIDHA</option>
                <option value="Homeopathy">HOMOEPATHY</option>
              </select>
              <label
                htmlFor="panCard"
                className="block font-bold mb-2 text-gray-700 mt-4"
              >
                PAN:
                {details.panCard && !validatePAN(details.panCard) ? (
                  <span className="text-red-500">Invalid PAN number</span>
                ) : null}
              </label>
              <input
                id="panCard"
                type="text"
                placeholder="PAN"
                className="w-full p-3 pl-5 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                onChange={(e) => setDetails({ ...details, panCard: e.target.value })}
                required
              />
            </div>
          </div>
          <button
            className="bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500 w-100 mt-3"
            onClick={submit}
          >
            Continue
          </button>
        </div>
      </section>
    );
  };
  
  export default EntityDetails;