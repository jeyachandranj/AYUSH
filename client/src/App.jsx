import { Home, S"../axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
} from "@mui/material";

const StatusCheck = () => {
  const { id } = useParams();
  const [status, setStatus] = useState({
    formSubmitted: false,
    documnetUploaded: false,
    aiVerified: false,
    certificateVerified: false,
    eligibilityChecked: false,
    paymentDone: false,
    finalSubmission: false,
  });
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Form submission",
    "Document upload",
    "AI verification",
    "Certificate verification",
    "Eligibility check",
    "Payment status",
    "Final submission",
  ];

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const timeoutId = setTimeout(async () => {
        try {
          const res = await API.get(`/check-status/${id}`);
          const newStatus = res.data;
          setStatus(newStatus);

          const newActiveStep = Object.values(newStatus).filter(
            (val) => val,
          ).length;
          setActiveStep(newActiveStep);

          // Break the timeout if all values are true
          if (Object.values(newStatus).every((val) => val)) {
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
    <div className="screen center gap-3">
      <div className="flex flex-col gap-3 p-3">
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            fontSize: "1.2rem", // Increase font size
            padding: "0.6rem", // Increase padding
            "& .MuiStepLabel-label": {
              fontSize: "1.2rem", // Increase label font size
            },
            "& .MuiSvgIcon-root": {
              fontSize: "2rem", // Increase icon size
            },
          }}
        >
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* status */}
        {Object.values(status).every((val) => val) ? (
          <section className="full flex justify-center items-center flex-col gap-1">
            <Typography align="center" variant="h6" component="strong">
              Verified Successfully
            </Typography>

            <div>
              <Button variant="contained" onClick={submitAction}>
                Proceed to payment
              </Button>
            </div>
          </section>
        ) : (
          <Typography align="center" variant="h6" component="strong">
            In Progress
          </Typography>
        )}
      </div>
