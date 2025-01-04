import React, { useState } from 'react';

const Network = ({ setStep, step, network, setNetwork }) => {

  const handleInputChange = (event) => {
    setNetwork(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the network is selected
    if (network) {
      setStep(prev => prev + 1);  // Move to the next step if all fields are filled
    } else {
      console.log("Fill all the details");
      alert('Please select a network before proceeding.');
    }
  };

  return (
    <div className="p-4 pt-6 pb-8 mb-4 bg-white rounded shadow-md w-100">
      <h2 className="text-2xl font-bold mb-4">Your Network</h2>
      <form onSubmit={handleSubmit} className='mt-5 h-50 d-flex flex-column justify-between'>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-5"
              htmlFor="network"
            >
              Are you a member of:
            </label>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="TE"
                name="network"
                value="TE"
                checked={network === 'TE'}
                onChange={handleInputChange}
                className="mr-2"
                required
              />
              <label
                className="text-gray-700 text-sm"
                htmlFor="TE"
              >
                TE
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="LetsVenture"
                name="network"
                value="Let's Venture"
                checked={network === "Let's Venture"}
                onChange={handleInputChange}
                className="mr-2"
                required
              />
              <label
                className="text-gray-700 text-sm"
                htmlFor="LetsVenture"
              >
                Let's Venture
              </label>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          //disabled={!network}  // Button disabled if no network is selected
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default Network;
