import React, { useState, useEffect } from "react";
import poster from "../../assets/poster.jpg";
import Post from "../social/posts";
import axiosHeader from "../../axiosHeader";
import { useParams } from "react-router-dom";

const Startup = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [startupData, setStartupData] = useState(null); // Initialize with null for loading check
  const { id } = useParams();
  const handleToggle = () => setIsExpanded(!isExpanded);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ message: "", error: false });
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
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
      await axiosHeader.post("/startups/sendmail", {
        to: email,
        subject: "Welcome to Ayush Startup Registration",
        text: "Thank you for subscribing to our newsletter! Stay tuned for the latest updates.",
        html: "<p>Thank you for subscribing to our newsletter! Stay tuned for the latest updates.</p>",
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosHeader.get(`/startups/${id}`);
        setStartupData(response.data);
      } catch (error) {
        console.error("Error fetching startup data:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!startupData) return <div>Loading...</div>; // Ensure loading is handled properly
  console.log(startupData);
  return (
    <>
      <div className="flex flex-col md:flex-row bg-gray-100 p-6 rounded-lg shadow-md">
        {/* Left Side - Info */}
        <div className="flex flex-col md:w-1/3 bg-white p-6 rounded-lg mb-6 md:mb-0 shadow-lg">
          <div className="flex flex-col items-center">
            {/* Logo */}
            <img
              src={startupData.logo || ""}
              alt="Company Logo"
              className="w-32 h-32 mb-4 rounded-full border border-gray-300 shadow-md"
            />
            {/* Company Name */}
            <h1 className="text-3xl font-bold mb-2 text-gray-800">
              {startupData.name || "Unknown Startup"}
            </h1>
            {/* Founder Details */}
            <div className="text-gray-700 text-base mb-4 mt-4 w-full">
              <div className="flex items-center mb-3">
                <p className="text-lg font-semibold">
                  Founder: {startupData.Person[0].name || "N/A"}
                </p>
              </div>
              <div className="flex items-center mb-3">
                <p className="text-lg font-semibold">
                  Email: {`${startupData.Person[0].name}@gmail.com` || "N/A"}
                </p>
              </div>
              <div className="flex items-center mb-3">
                <p className="text-lg font-semibold">
                  Product Category: {startupData.productCategory || "N/A"}
                </p>
              </div>
              <div className="flex items-center mb-3">
                <p className="text-lg font-semibold">
                  Location: {`${startupData.Address[0].addressLine} ${startupData.Address[0].district}`|| "N/A"}
                </p>
              </div>
            </div>
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {startupData.socialMedia?.map((item, index) => (
                <a
                  href={item.url}
                  key={index}
                  className="relative rounded-full transition-transform transform hover:scale-110"
                >
                  <img
                    src={item.icon}
                    alt="Social Icon"
                    className="w-11 h-11 rounded-full transition-transform"
                  />
                  <span className="absolute inset-0 rounded-full bg-blue-500 opacity-20 blur-sm transition-opacity"></span>
                </a>
              )) || <p>No social media available.</p>}
            </div>
          </div>
        </div>

        {/* Right Side - Company Overview */}
        <div className="flex-1 md:w-2/3 bg-white p-6 rounded-lg">
          {/* Poster */}
          <img
            src={poster}
            alt="Poster"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <div>
            <h2 className="text-2xl font-bold mb-4">Company Overview</h2>
            <p className="text-gray-700 text-sm">
              {isExpanded
                ? startupData.overviewText
                : `${startupData.overviewText?.slice(0, startupData.overviewText.length * 0.3)}...`}
            </p>
            <button
              onClick={handleToggle}
              className="text-blue-500 mt-4 inline-block hover:underline"
            >
              {isExpanded ? "Show Less" : "Read More"}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-200 p-4 rounded-lg text-center">
                <p className="text-gray-700 text-sm">Stage</p>
                <p className="font-bold text-lg">{startupData.Stage}</p>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg text-center">
                <p className="text-gray-700 text-sm">Sector</p>
                <p className="font-bold text-lg">{startupData.sector}</p>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg text-center">
                <p className="text-gray-700 text-sm">Capital</p>
                <p className="font-bold text-lg">{startupData.capitalInvestment}</p>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg text-center">
                <p className="text-gray-700 text-sm">Sector</p>
                <p className="font-bold text-lg">{startupData.sector}</p>
              </div>
          </div>
          {/* Newsletter Subscription */}
          <div className="w-full px-6 py-10 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg mt-8 shadow-lg">
            <div className="mx-auto max-w-screen-lg lg:grid lg:grid-cols-5 lg:gap-6 items-center">
              <div className="lg:col-span-3 text-white">
                <h1 className="text-2xl font-extrabold sm:text-3xl mb-2">
                  Stay Updated with Us
                </h1>
                <p className="font-medium text-lg mb-4">
                  Subscribe to our newsletter for expert tips and latest updates on how to successfully register your Ayush startup.
                </p>
              </div>

              {/* Newsletter Form */}
              <div className="lg:col-span-2">
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row items-center justify-center w-full"
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow rounded-lg p-3 text-black mb-4 sm:mb-0 sm:mr-4 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-white text-indigo-600 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-all"
                    disabled={loading}
                  >
                    {loading ? "Subscribing..." : "Subscribe"}
                  </button>
                </form>
                {status.message && (
                  <p className={`text-${status.error ? "red" : "green"}-500 mt-4`}>
                    {status.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Posts */}
      <div className="container mx-auto mt-12">
        <Post />
      </div>
    </>
  );
};

export default Startup;
