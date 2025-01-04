import React, { useState, useEffect } from 'react';
import axiosHeader from '../../axiosHeader';

const CertificateDetails = ({ setStep }) => {
  const [details, setDetails] = useState({
    gmpCertificate: { file: null, number: '', uploaded: false },
    coppCertificate: { file: null, number: '', uploaded: false },
    ayushLicenseCertificate: { file: null, number: '', uploaded: false },
    manufacturingLicense: { file: null, number: '', uploaded: false },
    companyIncorporationCertificate: { file: null, number: '', uploaded: false },
    bankDetails: {
      name: '',
      accountNo: '',
      ifscCode: '',
    },
  });

  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const certificatePatterns = {
    manufacturingLicense: /^MANF\d{5}$/,
    gmpCertificate: /^GMP\d{5}$/,
    coppCertificate: /^COPP\d{5}$/,
    companyIncorporationCertificate: /^COMP\d{5}$/,
    ayushLicenseCertificate: /^AYUSH\d{5}$/,
  };

  const validateCertificates = () => {
    const invalidCertificates = Object.keys(certificatePatterns).filter(
      (key) => !certificatePatterns[key].test(details[key].number)
    );
    if (invalidCertificates.length > 0) {
      setError(`Please use the correct format for: ${invalidCertificates.join(', ')}`);
      return false;
    } else {
      setError('');
      return true;
    }
  };

  const areAllFieldsFilled = () => {
    const certificatesFilled = Object.keys(certificatePatterns).every(
      (key) => details[key].number.trim() !== '' && details[key].file
    );
    const bankDetailsFilled =
      details.bankDetails.name.trim() !== '' &&
      details.bankDetails.accountNo.trim() !== '' &&
      details.bankDetails.ifscCode.trim() !== '';

    return certificatesFilled && bankDetailsFilled;
  };

  useEffect(() => {
    // Check if all fields are filled and valid
    const allFilled = areAllFieldsFilled();
    const certificatesValid = validateCertificates();
    setIsValid(allFilled && certificatesValid);
  }, [details]);

  const handleCertificateChange = (e, field) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [field]: { ...prevDetails[field], file: e.target.files[0], uploaded: true },
    }));
  };

  const handleCertificateNumberChange = (e, field) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [field]: { ...prevDetails[field], number: e.target.value },
    }));
  };

  const handleBankDetailsChange = (e, field) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      bankDetails: { ...prevDetails.bankDetails, [field]: e.target.value },
    }));
  };

  const submit = async () => {
    if (!isValid) {
      setError('Please fill all the fields with valid details before proceeding.');
      return;
    }

    const formData = new FormData();
    for (const [key, { file }] of Object.entries(details)) {
      if (key !== 'bankDetails' && file) {
        formData.append(`${key}`, file);
      }
    }
    const certificatesNumbers = {
      gmpCertificateNumber: details.gmpCertificate.number,
      coppCertificateNumber: details.coppCertificate.number,
      ayushLicenseCertificateNumber: details.ayushLicenseCertificate.number,
      manufacturingLicenseNumber: details.manufacturingLicense.number,
      companyIncorporationCertificateNumber: details.companyIncorporationCertificate.number,
    };

    for (const [key, value] of Object.entries(certificatesNumbers)) {
      formData.append(key, value);
    }

    try {
      const verifyResponse = await axiosHeader.post('documents/verifyDocument', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (verifyResponse.status === 200) {
        setStep((prev) => prev + 1);
        const uploadResponse = await axiosHeader.post('documents/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (uploadResponse.status === 200) {
          const data = {
            bankDetails: {
              bankName: details.bankDetails.name,
              accountNumber: details.bankDetails.accountNo,
              ifscCode: details.bankDetails.ifscCode,
            },
            documents: certificatesNumbers,
          };

          const createStartupResponse = await axiosHeader.post('startups/createStartup', { step: 6, data }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (createStartupResponse.status !== 200) {
            setError(createStartupResponse.data.message);
            console.error('Failed to create startup:', createStartupResponse.data);
          }
        } else {
          setError(uploadResponse.data.message);
          console.error('Failed to upload certificates:', uploadResponse.data);
        }
      } else {
        setError('Failed to verify certificates. Please try again.');
        console.error('Failed to verify certificates:', verifyResponse.data);
      }
    } catch (err) {
      setError(err.response.data);
      console.error('Error uploading certificates or creating startup:', err);
    }
  };

  return (
    <div className="bg-white text-secondary w-full p-6 rounded-md flex flex-col gap-6" style={{ height: '100vh', overflowY: 'auto' }}>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Certificate Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            'gmpCertificate',
            'coppCertificate',
            'ayushLicenseCertificate',
            'manufacturingLicense',
            'companyIncorporationCertificate',
          ].map((certificate, index) => (
            <section key={index} className="flex items-center gap-4">
              <label htmlFor={`${certificate}File`} className="font-bold w-1/3">
                {certificate.replace(/([A-Z])/g, ' $1').trim()}:
              </label>
              <div className="relative">
                <input
                  id={`${certificate}File`}
                  name="file"
                  type="file"
                  accept=".pdf"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleCertificateChange(e, certificate)}
                />
                <label
                  htmlFor={`${certificate}File`}
                  className={`w-10 h-10 rounded-md flex justify-center items-center cursor-pointer ${details[certificate].uploaded ? 'bg-green-400' : 'bg-gray-200'}`}
                >
                  📁
                </label>
              </div>
              <input
                id={`${certificate}Number`}
                name="number"
                type="text"
                placeholder="Certificate Number"
                className="w-full p-2 border rounded-md focus:outline-none"
                value={details[certificate].number}
                onChange={(e) => handleCertificateNumberChange(e, certificate)}
              />
            </section>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Bank Details</h2>
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <label htmlFor="bankName" className="font-bold w-1/3">Bank Name:</label>
            <input
              id="bankName"
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none"
              onChange={(e) => handleBankDetailsChange(e, 'name')}
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="accountNo" className="font-bold w-1/3">Account Number:</label>
            <input
              id="accountNo"
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none"
              onChange={(e) => handleBankDetailsChange(e, 'accountNo')}
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="ifscCode" className="font-bold w-1/3">IFSC Code:</label>
            <input
              id="ifscCode"
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none"
              onChange={(e) => handleBankDetailsChange(e, 'ifscCode')}
            />
          </div>
        </section>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      <button
        className={`bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500 ${!isValid && 'opacity-50 cursor-not-allowed'}`}
        onClick={submit}
        disabled={!isValid}
      >
        Continue
      </button>
    </div>
  );
};

export default CertificateDetails;
