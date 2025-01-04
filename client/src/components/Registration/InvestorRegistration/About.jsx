import React, { useState } from 'react';
import { putInvestorDetails } from '../../../services/investorRegistration';
import axiosHeader from '../../../axiosHeader';

const About = ({ step, setStep, network }) => {
  const [details, setDetails] = useState({
    name: '',
    interest: '',
    logo: null,
    startupState: [],
    budget: '',
    investmentCategorysector: 'AYUSH',
    panCard: '',
    brief: '',
  });
  const [logo, setLogo] = useState(null);
  const [errors, setErrors] = useState({});

  const validatePAN = (pan) => {
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panPattern.test(pan);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    setDetails((prevDetails) => ({
      ...prevDetails,
      logo: file,
    }));
  };

  const handleStageClick = (stage) => {
    setDetails((prevDetails) => {
      const newStages = prevDetails.startupState.includes(stage)
        ? prevDetails.startupState.filter((s) => s !== stage)
        : [...prevDetails.startupState, stage];
      return { ...prevDetails, startupState: newStages };
    });
  };

  const putLogo = async () => {
    if (!logo) return;

    const formData = new FormData();
    formData.append('logo', logo);
    formData.append('userType', 'investor');

    try {
      const response = await axiosHeader.post('/documents/uploadimage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded successfully', response.data);
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    let hasErrors = false;
    const newErrors = {};

    // Validate PAN Card format
    if (!validatePAN(details.panCard)) {
      newErrors.panCard = 'PAN Card must be in the format "AAAAA1111A"';
      hasErrors = true;
    }

    // Check if all required fields are filled
    const requiredFields = ['name', 'interest', 'startupState', 'budget', 'investmentCategorysector', 'brief', 'logo'];
    requiredFields.forEach((field) => {
      if (!details[field] || (Array.isArray(details[field]) && details[field].length === 0)) {
        newErrors[field] = 'This field is required';
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
    } else {
      try {
        await putLogo(); // Ensure logo is uploaded before submitting details
        await putInvestorDetails({ details, step, network });
        setStep((prev) => prev + 1);
      } catch (error) {
        console.error('Error during submission', error);
      }
    }
  };

  return (
    <section className="h-screen bg-white overflow-hidden flex justify-center items-center w-100">
      <div className="container mx-auto p-4 max-h-full overflow-auto w-100">
        <h1 className="text-2xl font-bold mb-4">About Individual</h1>
        <p className="text-md mb-6">
          About Individual typically refers to the specific attributes or pieces of information that define.
        </p>
        <form onSubmit={submit}>
          <div className="grid grid-cols-1 gap-1">
            <div className="flex flex-row items-start mb-4 gap-6">
              <div className="flex flex-col justify-center items-center mr-4">
                <label
                  htmlFor="logo"
                  className="block font-bold mb-2 text-gray-700"
                >
                  Investor Logo:
                </label>
                <div className="w-24 h-24 rounded-md flex justify-center items-center">
                  <input
                    id="logo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoChange}
                    required
                  />
                  <label htmlFor="logo" className="cursor-pointer">
                    {details.logo ? (
                      <img
                        src={URL.createObjectURL(details.logo)}
                        alt="Company Logo"
                        className="w-24 h-24 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 rounded-md flex justify-center items-center text-2xl text-gray-500 cursor-pointer">
                        +
                      </div>
                    )}
                  </label>
                </div>
                {errors.logo && <p className="text-red-500 text-sm mt-2">{errors.logo}</p>}
              </div>

              <div className="flex flex-col items-center">
                <label
                  htmlFor="startupState"
                  className="block font-bold mb-2 text-gray-700"
                >
                  Startup Stage:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['ideathon', 'earlytraction', 'validation', 'scaling'].map((stage) => (
                    <div
                      key={stage}
                      className={`bg-white shadow-md rounded-lg p-2 cursor-pointer transform transition-transform hover:scale-105 ${
                        details.startupState.includes(stage) ? 'border-2 border-blue-600' : 'border border-gray-300'
                      }`}
                      onClick={() => handleStageClick(stage)}
                    >
                      <h5 className="text-sm font-semibold text-center text-gray-800">
                        {stage.charAt(0).toUpperCase() + stage.slice(1)}
                      </h5>
                    </div>
                  ))}
                </div>
                {errors.startupState && <p className="text-red-500 text-sm mt-2">{errors.startupState}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block font-bold mb-2 text-gray-700"
                  >
                    Name:
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Investor Name"
                    className="w-full p-3 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    name="name"
                    value={details.name}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="interest"
                    className="block font-bold mb-2 text-gray-700"
                  >
                    Interest:
                  </label>
                  <input
                    id="interest"
                    type="text"
                    placeholder="Interest"
                    className="w-full p-3 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    name="interest"
                    value={details.interest}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.interest && <p className="text-red-500 text-sm mt-2">{errors.interest}</p>}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="panCard"
                    className="block font-bold mb-2 text-gray-700"
                  >
                    PAN Card:
                  </label>
                  <input
                    id="panCard"
                    type="text"
                    placeholder="PAN Card"
                    className="w-full p-3 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    name="panCard"
                    value={details.panCard}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.panCard && <p className="text-red-500 text-sm mt-2">{errors.panCard}</p>}
                </div>
              </div>

              <div className="flex flex-col">
                <div className="mb-4">
                  <label
                    htmlFor="budget"
                    className="block font-bold mb-2 text-gray-700"
                  >
                    Budget:
                  </label>
                  <input
                    id="budget"
                    type="number"
                    placeholder="Budget"
                    className="w-full p-3 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    name="budget"
                    value={details.budget}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.budget && <p className="text-red-500 text-sm mt-2">{errors.budget}</p>}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="investmentCategorysector"
                    className="block font-bold mb-2 text-gray-700"
                  >
                    Investment Category/Sector:
                  </label>
                  <input
                    id="investmentCategorysector"
                    type="text"
                    placeholder="Investment Category/Sector"
                    className="w-full p-3 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    name="investmentCategorysector"
                    value={details.investmentCategorysector}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.investmentCategorysector && <p className="text-red-500 text-sm mt-2">{errors.investmentCategorysector}</p>}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="brief"
                    className="block font-bold mb-2 text-gray-700"
                  >
                    Brief:
                  </label>
                  <textarea
                    id="brief"
                    placeholder="Brief Description"
                    className="w-full p-3 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    name="brief"
                    value={details.brief}
                    onChange={handleInputChange}
                    rows="3"
                    required
                  />
                  {errors.brief && <p className="text-red-500 text-sm mt-2">{errors.brief}</p>}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 px-4 py-2 bg-blue-600 text-white font-bold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Continue
            </button>
            </div>
          </form>
        </div>
    </section>
  );
};

export default About;
