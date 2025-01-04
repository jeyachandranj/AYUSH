import React, { useState, useEffect } from "react";
import './register.css'; // Assuming you have a separate CSS file
import { putEntityDetails } from "../../services/registrationService";

function FounderDetails({ setStep, step }) {
  const [founders, setFounders] = useState([]);
  const [newFounder, setNewFounder] = useState({
    dinDpin: "",
    name: "",
    gender: "",
    mobile: "",
    email: "",
    designation: "",
    postalAddress: "",
  });

  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    // Regular expression for DPIN/DIN validation (8-digit number)
    const dpinPattern = /^\d{8}$/;

    // Check if all fields are filled and DPIN is valid
    const allFieldsFilled = Object.values(newFounder).every(field => field.trim() !== "");
    const isDpinValid = dpinPattern.test(newFounder.dinDpin);

    setIsFormComplete(allFieldsFilled && isDpinValid);
  }, [newFounder]);

  const handleAddFounder = () => {
    if (isFormComplete) {
      setFounders([...founders, newFounder]);
      setNewFounder({
        dinDpin: "",
        name: "",
        gender: "",
        mobile: "",
        email: "",
        designation: "",
        postalAddress: "",
      });
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  const handleChange = (field, value) => {
    setNewFounder({ ...newFounder, [field]: value });
  };

  const handleEdit = (index) => {
    setNewFounder(founders[index]);
    setFounders(founders.filter((_, i) => i !== index));
  };

  const handleDelete = (index) => {
    setFounders(founders.filter((_, i) => i !== index));
  };

  const submit = () => {
    if (founders.length > 0) {
      putEntityDetails({ founders, step });
      console.log(founders);
      setStep((prev) => prev + 1);
    } else {
      alert("Please add at least one founder.");
    }
  };

  return (
    <section className="h-screen bg-white overflow-y-auto flex flex-col w-100 pl-5">
      <div className="container mx-auto p-5 flex-grow w-100">
        <h2>Founder Details</h2>
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="dinDpin">DIN/DPIN Number:</label>
              <input
                type="number"
                id="dinDpin"
                value={newFounder.dinDpin}
                onChange={(e) => handleChange("dinDpin", e.target.value)}
                className="w-full border border-gray-500 p-2"
              />
              {!/^\d{8}$/.test(newFounder.dinDpin) && newFounder.dinDpin.length > 0 && (
                <p className="text-red-500 text-sm">DPIN must be an 8-digit number.</p>
              )}
            </div>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={newFounder.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full border border-gray-500 p-2"
              />
            </div>
            <div>
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                value={newFounder.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                className="w-full border border-gray-500 p-2"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="mobile">Mobile:</label>
              <input
                type="number"
                id="mobile"
                value={newFounder.mobile}
                onChange={(e) => handleChange("mobile", e.target.value)}
                className="w-full border border-gray-500 p-2"
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={newFounder.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full border border-gray-500 p-2"
              />
            </div>
            <div>
              <label htmlFor="designation">Designation:</label>
              <select
                id="designation"
                value={newFounder.designation}
                onChange={(e) => handleChange("designation", e.target.value)}
                className="w-full border border-gray-500 p-2"
              >
                <option value="">Select Designation</option>
                <option value="Founder">Founder</option>
                <option value="Director">Director</option>
              </select>
            </div>
            <div>
              <label htmlFor="postalAddress">Postal Address:</label>
              <textarea
                id="postalAddress"
                value={newFounder.postalAddress}
                onChange={(e) => handleChange("postalAddress", e.target.value)}
                className="w-full border border-gray-500 p-2"
              />
            </div>
          </div>
          <button
            onClick={handleAddFounder}
            className="p-2 bg-blue-500 text-white rounded"
            disabled={!isFormComplete}
          >
            Add Founder
          </button>
        </div>
        <div className="table-container">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-500 p-2">S.No</th>
                <th className="border border-gray-500 p-2">DIN/DPIN</th>
                <th className="border border-gray-500 p-2">Name</th>
                <th className="border border-gray-500 p-2">Gender</th>
                <th className="border border-gray-500 p-2">Mobile</th>
                <th className="border border-gray-500 p-2">Email</th>
                <th className="border border-gray-500 p-2">Designation</th>
                <th className="border border-gray-500 p-2">Postal Address</th>
                <th className="border border-gray-500 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {founders.map((founder, index) => (
                <tr key={index}>
                  <td className="border border-gray-500 p-2">{index + 1}</td>
                  <td className="border border-gray-500 p-2">{founder.dinDpin}</td>
                  <td className="border border-gray-500 p-2">{founder.name}</td>
                  <td className="border border-gray-500 p-2">{founder.gender}</td>
                  <td className="border border-gray-500 p-2">{founder.mobile}</td>
                  <td className="border border-gray-500 p-2">{founder.email}</td>
                  <td className="border border-gray-500 p-2">{founder.designation}</td>
                  <td className="border border-gray-500 p-2">{founder.postalAddress}</td>
                  <td className="border border-gray-500 p-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="p-1 bg-yellow-500 text-white rounded m-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="p-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end mt-8 mr-8 mb-8">
        <button
          type="button"
          className={`bg-green-600 text-white p-3 rounded-md cursor-pointer hover:opacity-90 ${founders.length > 0 ? '' : 'opacity-50 cursor-not-allowed'}`}
          onClick={submit}
          disabled={founders.length === 0}
        >
          CONTINUE
        </button>
      </div>
    </section>
  );
}

export default FounderDetails;
