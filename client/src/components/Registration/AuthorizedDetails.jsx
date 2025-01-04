import React, { useState, useEffect } from 'react';
import { putEntityDetails } from '../../services/registrationService';

const AuthorizedDetails = ({ setStep, step }) => {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    mobile: '',
    gender: '',
    email: '',
    postalAddress: ''
  });

  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    // Check if all fields are filled
    const allFieldsFilled = Object.values(formData).every(field => field.trim() !== "");
    setIsFormComplete(allFieldsFilled);
  }, [formData]);

  const handleSubmit = async () => {
    console.log(formData);
    await putEntityDetails({ ...formData, step });
    setStep(prev => prev + 1);
  };

  const handleChange = (e) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="bg-white text-secondary w-full p-5 rounded-md flex flex-col gap-6" style={{ height: '100vh', overflowY: 'auto' }}>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Authorized Representative</h2>
        <p className="text-sm text-gray-600 mb-6">Details of authorized person</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <label htmlFor="authorizedName" className="font-bold">Name:</label>
            <input
              id="authorizedName"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="authorizedDesignation" className="font-bold">Designation:</label>
            <select
              id="authorizedDesignation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none"
            >
              <option value="">Select Designation</option>
              <option value="Founder">Founder</option>
              <option value="Director">Director</option>
            </select>
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="authorizedMobile" className="font-bold">Mobile No.:</label>
            <input
              id="authorizedMobile"
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none"
              placeholder="Enter your mobile number"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="gender" className="font-bold">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="authorizedEmail" className="font-bold">Email:</label>
            <input
              id="authorizedEmail"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="postalAddress" className="font-bold">Address:</label>
            <input
              id="postalAddress"
              type="text"
              name="postalAddress"
              value={formData.postalAddress}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none"
              placeholder="Enter your Address"
            />
          </div>
        </div>
        <button
          className={`bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500 ${isFormComplete ? '' : 'opacity-50 cursor-not-allowed'}`}
          onClick={handleSubmit}
          disabled={!isFormComplete}
        >
          Continue
        </button>
      </div>
    </section>
  );
};

export default AuthorizedDetails;
