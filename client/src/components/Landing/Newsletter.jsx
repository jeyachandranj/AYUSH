import React, { useState } from "react";
import axios from "axios";
import axiosHeader from '../../axiosHeader';
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ message: "", error: false });
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    // Simple email validation regex
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };
  const handleSubscribe = async (e) => {
    e.preventDefault();
  
    if (!validateEmail(email)) {
      setStatus({ message: "Please enter a valid email address.", error: true });
      return;
    }
  
    setLoading(true);
    setStatus({ message: "", error: false });
  
    try {
      const response = await axiosHeader.post("/startups/sendmail", { 
        to: email, 
        subject: "Welcome to Ayush Startup Registration", 
        text: "Thank you for subscribing to our newsletter! Stay tuned for the latest updates.", 
        html: "<p>Thank you for subscribing to our newsletter! Stay tuned for the latest updates.</p>"
      });
  
      setStatus({
        message: "Subscription successful! Please check your email for confirmation.",
        error: false,
      });
      setEmail("");
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      setStatus({
        message: error.response?.data?.message || "An error occurred. Please try again later.",
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 py-12 text-white bg-gray-800 m-2">
      <div className="mx-auto grid max-w-screen-xl lg:grid-cols-5">
        <div className="my-4 lg:col-span-3">
          <h1 className="py-2 text-xl font-bold sm:text-2xl md:text-3xl">
            Need help navigating Ayush startup registration?
          </h1>
          <p className="font-bold">
            Sign up for our newsletter to get the latest updates and expert tips on successfully registering your Ayush startup.
          </p>
        </div>
        <div className="my-4 lg:col-span-2">
          <form
            onSubmit={handleSubscribe}
            className="flex w-full flex-col items-center justify-between sm:flex-row"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex w-full rounded-xl p-3 font-medium text-black focus:outline-none"
              required
            />
            <button
              type="submit"
              className="my-6 ml-0 w-full rounded-xl bg-emerald-400 px-6 py-3 font-bold text-black transition ease-in-out hover:scale-105 hover:bg-emerald-500 active:bg-emerald-600 sm:ml-4 sm:w-auto"
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Notify me"}
            </button>
          </form>
          {status.message && (
            <p
              className={`mt-2 text-center ${
                status.error ? "text-red-500" : "text-green-500"
              }`}
            >
              {status.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
