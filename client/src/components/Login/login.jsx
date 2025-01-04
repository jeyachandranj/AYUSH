import React, { useEffect, useRef, useState } from "react";
import * as Components from './css.js';
import { useNavigate } from 'react-router-dom';
import {useAuth}  from "../../services/AuthContext.jsx";
import { register, login ,sendOtp,verifyOtp} from "../../services/authService.jsx";
function Login({ isSignUp, onClose }) {
    const [signIn, toggle] = useState(!isSignUp);
    const navigate = useNavigate();
    const { login: loginUser } = useAuth();
    const [otpMode,setOtpMode]=useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otpVerifcation,setOtpVerification]=useState(false);
    const [error,setError]=useState('');
    const emailRef = useRef();
    const passwordRef = useRef();
    const userNameRef = useRef();
    const signUpEmailRef = useRef();
    const signUpPasswordRef = useRef();
    const confirmPasswordRef = useRef();
    const mobileRef = useRef();
    const otpRef = useRef();
    const [mobile, setMobile] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      setError('');
    },[toggle])
    const handleSignIn = async () => {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      if (!email || !password) return;
      setError('');
      try {
          setIsLoading(true);
          console.log("Attempting to log in...");
          // Await the login request to complete
          const userData = await login({ email, password });
          // Log in the user if login was successful
          loginUser(userData);
          console.log("Logged in successfully");
          onClose(); // Close the login modal
      } catch (error) {
          if (error.response && error.response.status === 400) {
              setError("Invalid email or password. Please try again.");
          } else {
              setError('An unexpected error occurred. Please try again later.');
          }
      } finally {
          setIsLoading(false);
      }
  };
 
      const handleSendOtp = async () => {
        setError('');
        const mobile = mobileRef.current.value;
        const user = userNameRef.current.value;
        try {
          setIsLoading(true);
          await sendOtp({ mobile ,user});
          setIsOtpSent(true);
          alert("OTP sent successfully");
        } catch (error) {
          console.error('Error sending OTP:', error);
          setError('Failed to send OTP. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };
      const handleVerifyOtp = async () => {
        setError('');
        const otp = otpRef.current.value;
        try {
          setIsLoading(true);
          await verifyOtp({ mobile, otp });
          setOtpVerification(true);
          alert("OTP verified successfully");
          navigate('/login');
          toggle(true);
        } catch (error) {
          console.error('Error verifying OTP:', error);
          setError('Invalid or expired OTP. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };
   
      const handleSignUp = async () => {
        setError('');
        const username = userNameRef.current.value;
        const email = signUpEmailRef.current.value;
        const password = signUpPasswordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        const mobile = mobileRef.current.value;
        if (!username || !password || !email || !confirmPassword || !mobile) return;
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
   
        try {
          setIsLoading(true);
          await register({ name: username, email, password, mobile });
          setOtpMode(true);
          alert("Registration successful. Please verify your OTP");
          if (!isOtpSent) {
            handleSendOtp();
            return;
          }
          navigate('/login');
          //navigate('/');
          //onClose();
        } catch (error) {
          console.error('Error during registration:', error);
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };
   
    return (
        <Components.Container>
            <Components.SignUpContainer signinIn={signIn}>
                {otpMode?
                  <Components.Form onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(); }}>
                    <Components.Title>Verify OTP</Components.Title>
                    <Components.Input type='text' placeholder='Enter OTP' ref={otpRef} />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Components.Button type="submit" disabled={isLoading}>Verify</Components.Button>
                  </Components.Form>
                :
                <Components.Form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type='text' placeholder='Name' ref={userNameRef} />
                    <Components.Input type='email' placeholder='Email' ref={signUpEmailRef} />
                    <Components.Input type='password' placeholder='Password' ref={signUpPasswordRef} />
                    <Components.Input type='password' placeholder='Confirm Password' ref={confirmPasswordRef} />
                    <Components.Input
                      type='text'
                      placeholder='Mobile'
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      ref={mobileRef}
                    />
                    {error && toggle && <p style={{ color: 'red' }}>{error}</p>}
                    <Components.Button type="submit" disabled={isLoading}>Sign Up</Components.Button>
                </Components.Form>}
            </Components.SignUpContainer>
            <Components.SignInContainer signinIn={signIn}>
                <Components.Form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
                    <Components.Title>Sign in</Components.Title>
                    <Components.Input type='email' placeholder='Email' ref={emailRef} />
                    <Components.Input type='password' placeholder='Password' ref={passwordRef} />
                    {error && toggle && <p style={{ color: 'red' }}>{error}</p>}
                    <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                    <Components.Button type="submit" disabled={isLoading}>{!isLoading?"Sign in":"Signing in..."}</Components.Button>
                </Components.Form>

   
       
         
   
 
            </Components.SignInContainer>
            <Components.OverlayContainer signinIn={signIn}>
                <Components.Overlay signinIn={signIn}>
                    <Components.LeftOverlayPanel signinIn={signIn}>
                        <Components.Title>Welcome Back!</Components.Title>
                        <Components.Paragraph>
                            To keep connected with us please login with your personal info
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => {toggle(true);setOtpMode(false);setError('')}}>
                            Sign In
                        </Components.GhostButton>
                    </Components.LeftOverlayPanel>
                    <Components.RightOverlayPanel signinIn={signIn}>
                        <Components.Title>Hello, Friend!</Components.Title>
                        <Components.Paragraph>
                            Enter Your personal details and start journey with us
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => {toggle(false);setError('')}}>
                          Sign up
                        </Components.GhostButton>
                    </Components.RightOverlayPanel> 
                </Components.Overlay>
            </Components.OverlayContainer>
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-600">X</button>
        </Components.Container>
    )
}
export default Login;