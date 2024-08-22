import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import PropTypes from "prop-types";

const StepViewer = ({ steps, active }) => {
  return (
    <Stepper
      activeStep={active}
      alternativeLabel
      sx={{
        fontSize: '1.2rem', // Increase font size
        padding: '0.6rem',    // Increase padding
        '& .MuiStepLabel-label': {
          fontSize: '1.2rem', // Increase label font size
        },
        '& .MuiSvgIcon-root': {
          fontSize: '2rem', // Increase icon size
        },
      }}
    >
      {steps.map((step, index) => (
        <Step key={index}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

StepViewer.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
  active: PropTypes.number.isRequired,
};

export default StepViewer;
