import { Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, Box } from '@chakra-ui/react'
import PropTypes from "prop-types";

const StepViewer = ({ steps, active }) => {
  return (
    <Stepper size='lg' index={active}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink='0'>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
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
