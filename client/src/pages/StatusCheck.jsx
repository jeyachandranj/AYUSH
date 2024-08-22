import API from '../axios';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Stepper, Step, StepLabel, Box, Button } from '@mui/material';

const StatusCheck = () => {
  const { id } = useParams();
  const [status, setStatus] = useState({
    formSubmitted: false,
    documnetUploaded: false,
    aiVerified: false,
    certificateVerified: false,
    eligibilityChecked: false,
    paymentDone: false,
    finalSubmission: false
  });
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Form submission", "Document upload", "AI verification", "Certificate verification", "Eligibility check", "Payment status", "Final submission"]

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const timeoutId = setTimeout(async () => {
        try {
          const res = await API.get(`/check-status/${id}`);
          const newStatus = res.data;
          setStatus(newStatus);

          const newActiveStep = Object.values(newStatus).filter(val => val).length;
          setActiveStep(newActiveStep);

          // Break the timeout if all values are true
          if (Object.values(newStatus).every(val => val)) {
            clearTimeout(timeoutId);
          }
        } catch (error) {
          console.log(error);
        }
      }, 3000);
    };

    fetchData();
  }, [id]);

  const submitAction = async () => console.log("submitted");

  return (
    <div className='screen center bg-[#eee]'>
      <div className="flex flex-col gap-6 p-9 px-1 bg-white shadow-black" style={{ boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.1)', margin: '20px', padding: '20px' }}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            fontSize: '1.2rem', // Increase font size
            padding: '0.1rem',    // Increase padding
            '& .MuiStepLabel-label': {
              fontSize: '1.2rem', // Increase label font size
            },
            '& .MuiSvgIcon-root': {
              fontSize: '2rem', // Increase icon size
            }
          }}
        >
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* status */}
        {Object.values(status).every(val => val) ? (
          <section className='full flex justify-center items-center flex-col gap-1'>
            <Typography align='center' variant='h6' component='strong'>
              Verified Successfully
            </Typography>

            <Typography align='center' variant='subtitle1' component='strong'>
              Status: Completed
            </Typography>
          </section>
        ) : (
          <section className='full flex justify-center items-center flex-col gap-1'>
            <Typography align='center' variant='h6' component='strong'>
                In Progress
            </Typography>

            <Typography align='center' variant='subtitle1' component='strong'>
              Status: Incomplete
            </Typography>
          </section>
        )}

        {/* download certificate button */}
        <div className="w-full flex justify-start items-center">
          <Button variant='contained'>
            Download Ceretificate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatusCheck;
