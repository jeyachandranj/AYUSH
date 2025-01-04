import styled from "styled-components";

export const Container = styled.div`
  background-color: black;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 90%; /* Changed for mobile */
  max-width: 700px; /* For larger screens */
  margin: 20px auto; /* Center alignment */
  min-height: 500px;

  @media (min-width: 768px) {
    margin-left: 400px; /* Reset to original margin on larger screens */
    margin-top: 150px;
  }

  @media (min-width: 768px) {
    margin-left: 400px; /* Reset to original margin on larger screens */
    margin-top: 150px;
  }
`;

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;

  ${(props) =>
    props.signinIn !== true &&
    `  
    transform: translateX(100%);  
    opacity: 1;  
    z-index: 5;  
  `}

  @media (max-width: 768px) {
    width: 100%; /* Stack vertically on mobile */
    transform: translateX(0); /* Reset translation */
  }
`;

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;

  ${(props) =>
    props.signinIn !== true ? `transform: translateX(100%);` : null}

  @media (max-width: 768px) {
    width: 100%; /* Stack vertically on mobile */
    transform: translateX(0); /* Reset translation */
  }
`;

export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px; /* Adjusted padding for mobile */
  height: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
  color: black;
  font-size: 1.5rem; /* Adjusted for smaller screens */

  @media (min-width: 768px) {
    font-size: 2rem; /* Larger sizes for bigger screens */
  }
`;

export const Input = styled.input`
  background-color: #eee;
  border: 1px solid black;
  padding: 12px 15px;
  margin: 8px 0;
  width: 80%; /* Adjusted for mobile */

  @media (min-width: 768px) {
    width: 100%; /* Full width on larger screens */
  }
`;

export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid black;
  background-color: #030712;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    width: 80%; /* Adjust button size on mobile */
    padding: 10px; /* Reduced padding */
  }
`;

export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
`;

export const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;

  ${(props) =>
    props.signinIn !== true ? `transform: translateX(-100%);` : null}

  @media (max-width: 768px) {
    width: 100%; /* Stack on mobile */
    transform: translateX(0); /* Reset translation */
  }
`;

export const Overlay = styled.div`
  background: #34d399;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;

  ${(props) => (props.signinIn !== true ? `transform: translateX(50%);` : null)}

  @media (max-width: 768px) {
    width: 100%; /* Stack on mobile */
    transform: translateX(0); /* Reset translation */
  }
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;

  @media (max-width: 768px) {
    width: 100%; /* Stack on mobile */
  }
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${(props) => (props.signinIn !== true ? `transform: translateX(0);` : null)}

  @media (max-width: 768px) {
    transform: translateX(0); /* Reset translation */
  }
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${(props) => (props.signinIn !== true ? `transform: translateX(20%);` : null)}

  @media (max-width: 768px) {
    transform: translateX(0); /* Reset translation */
  }
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;

  @media (max-width: 768px) {
    font-size: 12px; /* Smaller font size on mobile */
    margin: 15px 0 25px; /* Adjust margin */
  }
`;
