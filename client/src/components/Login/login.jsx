import { useEffect, useRef, useState } from "react";
import * as Components from "./css.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext.jsx";
import {
  register,
  login,
  verifyOtp,
  resetPassword,
} from "../../services/authService.jsx";

function Login({ isSignUp, onClose }) {
  const [signIn, toggle] = useState(!isSignUp);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [otpMode, setOtpMode] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpVerification, setOtpVerification] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mobile, setMobile] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const userNameRef = useRef();
  const signUpEmailRef = useRef();
  const signUpPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const mobileRef = useRef();
  const otpRef = useRef();
  const forgotPasswordMobileRef = useRef();
  const forgotPasswordOtpRef = useRef();

  const navigate = useNavigate();
  const { login: loginUser } = useAuth();

  useEffect(() => {
    setError("");
  }, [toggle]);

  const handleSignIn = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!email || !password) return;
    setError("");

    try {
      setIsLoading(true);
      const userData = await login({ email, password });
      loginUser(userData);
      onClose();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setError("");
    const mobile = forgotPasswordMobileRef.current.value;
    try {
      setIsLoading(true);
      //await sendOtp({ mobile });
      setIsOtpSent(true);
      alert("OTP sent successfully");
    } catch (error) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    const otp = forgotPasswordOtpRef.current.value;
    try {
      setIsLoading(true);
      // Assuming this endpoint verifies the OTP and returns a success response
      await verifyOtp({ mobile, otp });
      setOtpVerification(true);
      alert("OTP verified successfully");
    } catch (error) {
      setError("Invalid or expired OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError("");
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setIsLoading(true);
      console.log(mobile, newPassword);
      await resetPassword({
        mobile,
        otp: forgotPasswordOtpRef.current.value,
        newPassword,
      });
      alert("Password reset successful");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.msg || "Failed to reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    setError("");
    const username = userNameRef.current.value;
    const email = signUpEmailRef.current.value;
    const password = signUpPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const mobile = mobileRef.current.value;
    if (!username || !password || !email || !confirmPassword || !mobile) return;
    if (password !== confirmPassword) {
      setError("Passwords do not match");
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
      navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    if (!mobile) return;

    try {
      setIsLoading(true);
      //await sendOtp({ mobile }); // Adjust this if your forgot password endpoint is different
      alert("OTP sent to your mobile number.");
      setOtpMode(true);
      setIsForgotPassword(true);
    } catch (error) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
        <Components.Container>
          <Components.SignUpContainer signinIn={signIn}>
            {otpMode ? (
              <Components.Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleVerifyOtp();
                }}
              >
                <Components.Title>Verify OTP</Components.Title>
                <Components.Input
                  type="number"
                  placeholder="Enter OTP"
                  ref={otpRef}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Components.Button type="submit" disabled={isLoading}>
                  Verify
                </Components.Button>
              </Components.Form>
            ) : (
              <Components.Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSignUp();
                }}
              >
                <Components.Title>Create Account</Components.Title>
                <Components.Input
                  type="text"
                  placeholder="Name"
                  ref={userNameRef}
                />
                <Components.Input
                  type="email"
                  placeholder="Email"
                  ref={signUpEmailRef}
                />
                <Components.Input
                  type="password"
                  placeholder="Password"
                  ref={signUpPasswordRef}
                />
                <Components.Input
                  type="password"
                  placeholder="Confirm Password"
                  ref={confirmPasswordRef}
                />
                <Components.Input
                  type="text"
                  placeholder="Mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  ref={mobileRef}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Components.Button type="submit" disabled={isLoading}>
                  Sign Up
                </Components.Button>
              </Components.Form>
            )}
          </Components.SignUpContainer>

          <Components.SignInContainer signinIn={signIn}>
            {isForgotPassword ? (
              otpMode ? (
                <Components.Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleResetPassword();
                  }}
                >
                  <Components.Title>Reset Password</Components.Title>
                  <Components.Input
                    type="number"
                    placeholder="Enter OTP"
                    ref={forgotPasswordOtpRef}
                  />
                  <Components.Input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <Components.Input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <Components.Button type="submit" disabled={isLoading}>
                    {isLoading ? "Resetting..." : "Reset Password"}
                  </Components.Button>
                </Components.Form>
              ) : (
                <Components.Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleForgotPassword();
                  }}
                >
                  <Components.Title>Forgot Password</Components.Title>
                  <Components.Input
                    type="text"
                    placeholder="Mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    ref={mobileRef}
                  />
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <Components.Button type="submit" disabled={isLoading}>
                    {isLoading ? "Sending OTP..." : "Send OTP"}
                  </Components.Button>
                </Components.Form>
              )
            ) : (
              <Components.Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSignIn();
                }}
              >
                <Components.Title>Sign in</Components.Title>
                <Components.Input type="email" placeholder="Email" ref={emailRef} />
                <Components.Input
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Components.Anchor onClick={() => setIsForgotPassword(true)}>
                  Forgot your password?
                </Components.Anchor>
                <Components.Button type="submit" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Components.Button>
              </Components.Form>
            )}
          </Components.SignInContainer>

          <Components.OverlayContainer signinIn={signIn}>
            <Components.Overlay signinIn={signIn}>
              <Components.LeftOverlayPanel signinIn={signIn}>
                <Components.Title>Welcome Back!</Components.Title>
                <Components.Paragraph>
                  To keep connected with us please login with your personal info
                </Components.Paragraph>
                <Components.Button onClick={() => toggle(true)} className="ghost">
                  Sign In
                </Components.Button>
              </Components.LeftOverlayPanel>
              <Components.RightOverlayPanel signinIn={signIn}>
                <Components.Title>Hello, Friend!</Components.Title>
                <Components.Paragraph>
                  Enter your personal details and start journey with us
                </Components.Paragraph>
                <Components.Button onClick={() => toggle(false)} className="ghost">
                  Sign Up
                </Components.Button>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>
        </Components.Container>
    </div>
  );
}

export default Login;
