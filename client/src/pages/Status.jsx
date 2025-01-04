import React, { useEffect, useState } from 'react';
import Header from '../components/Landing/Header';
import './Status.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CertificateGenerator from './CertificateGenerator';
function RegistrationProcess() {
  const [status, setStatus] = useState(0);
  const [company,setCompany]= useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const data = JSON.parse(localStorage.getItem('data'));

      const response = await axios.get(`http://localhost:5000/api/status/startup/${data._id}`, {
        headers: {
          'x-auth-token': user.token,
        },
      });

      console.log(response.data.company.message); // Logging the data status for debugging

      switch (response.data.status) {
        case "initial":
          setStatus(1);
          break;
        case "pending":
          setStatus(2);
          break;
        case "proceed":
          setStatus(5);
          break;
        case "approved":
          setStatus(7);
          break;
        case "rejected":
          setStatus(-1); // Special case for "rejected"
          break;
        default:
          setStatus(0);
          break;
      }
      setCompany(response.data.company)
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const stepsData = [
    { number: 1, title: "Document Verify", active: status >= 1 },
    { number: 2, title: "Form Submission", active: status >= 2 },
    { number: 3, title: "Certificate Verification", active: status >= 4 },
    { number: 4, title: "Eligibility Check", active: status >= 5 },
    { number: 5, title: "Authorize", active: status >= 6 },
    { number: 6, title: "Recognize", active: status >= 7 },
  ];

  return (
    <>
      <Header />
      <div className="container1">
        <button className="mt-5 mb-5 bg-secondary p-4 pt-2 pb-2 text-white" onClick={() => navigate('/')}>
          Back
        </button>

        <div className="header1">
          <div className="title1">Registration Process</div>
        </div>

        <div className="steps1">
          {stepsData.map((step, index) => (
            <div
              key={index}
              className={`step1 ${step.active ? "active1" : ""} ${status > index && "bg-primary text-white"}`}
            >
              <div className={`number1 ${status > index && "bg-primary text-white"}`}>{step.number}</div>
              <div className={`title1 ${status > index && "bg-primary text-white"}`}>{step.title}</div>
            </div>
          ))}

          {/* Render the Rejected section if status is rejected */}
          {status === -1 && (
            <div className="step1 rejected">
              <div className="number1">X</div>
              <div className="title1">Application Rejected</div>
            </div>
          )}
        </div>

        {/* Conditionally show status text based on the current status */}
        {status > 0 && status < 7 && (
          <div className="status1">
            <div className="title1">Verification in Progress</div>
            <div className="status-text">Status: On Process</div>
          </div>
        )}
        {status === 7 && (
          <div className="status1">
            <div className="title1">Verification Completed</div>
            <div className="status-text">Status: Approved</div>
          </div>
        )}

        {/* Rejection message for rejected status */}
        {status === -1 && (
          <div className="status1 bg-danger text-white p-4 rounded-lg">
            <h2 className="font-bold">Your Application has been Rejected</h2>
            <p className="mt-2">
              {`Unfortunately, your application was rejected by the government officials. The reason was ${company.message}`}
            </p>
            <div className="mt-4">
              <button className="bg-warning text-dark p-2 rounded" onClick={() => navigate('/')}>
                Go to Home
              </button>
            </div>
          </div>
        )}

        {/* Conditionally render the download button if status is approved */}
        {status === 7 && (
          <div className="download-button1 mt-5">
            <button className="bg-success text-white p-3 rounded-md">
              <CertificateGenerator />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default RegistrationProcess;
