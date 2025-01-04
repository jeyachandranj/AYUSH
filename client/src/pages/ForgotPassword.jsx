import React, { useRef, useState } from "react";
import { sendOtp, resetPassword } from "../services/authService";
import { Button, TextField, CircularProgress, Alert } from "@mui/material"; // Assuming Material-UI is used
import { LockReset, PhoneAndroid } from "@mui/icons-material"; // Assuming you want to use Material-UI icons

function ForgotPassword() {
  const mobileRef = useRef();
  const otpRef = useRef();
  const newPasswordRef = useRef();
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    const mobile = mobileRef.current.value;
    setError("");
    setIsLoading(true);

    try {
      await sendOtp({ mobile });
      setOtpSent(true);
      alert("OTP sent successfully");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    const mobile = mobileRef.current.value;
    const otp = otpRef.current.value;
    const newPassword = newPasswordRef.current.value;
    setError("");
    setIsLoading(true);

    try {
      await resetPassword({ mobile, otp, newPassword });
      alert("Password reset successfully");
      // Navigate to login or other page
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Forgot Password
        </h2>
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}
        {!otpSent ? (
          <form onSubmit={(e) => { e.preventDefault(); handleSendOtp(); }}>
            <div className="mb-4">
              <TextField
                fullWidth
                label="Enter mobile number"
                placeholder="Enter mobile number"
                inputRef={mobileRef}
                variant="outlined"
                InputProps={{
                  startAdornment: <PhoneAndroid className="mr-2" />,
                }}
              />
            </div>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </form>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }}>
            <div className="mb-4">
              <TextField
                fullWidth
                label="Enter OTP"
                placeholder="Enter OTP"
                inputRef={otpRef}
                variant="outlined"
                InputProps={{
                  startAdornment: <LockReset className="mr-2" />,
                }}
              />
            </div>
            <div className="mb-4">
              <TextField
                fullWidth
                label="Enter new password"
                placeholder="Enter new password"
                type="password"
                inputRef={newPasswordRef}
                variant="outlined"
              />
            </div>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
