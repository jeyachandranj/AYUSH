import { useNavigate } from "react-router-dom";
import API from "../axios";
import { useRef } from "react";
import PropTypes from "prop-types";

const SignUpForm = ({ isLoading, setIsLoading }) => {
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const mobileRef = useRef();
  const navigate = useNavigate();

  const submit = async () => {
    const username = userNameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const mobile = mobileRef.current.value;
    const email = emailRef.current.value;

    if (!username || !password || !email || !confirmPassword || !mobile) return;
    try {
      setIsLoading(true);
      if (password !== confirmPassword) throw new Error("Passwords do not match");
      const res = await API.post("http://localhost:5000/api/register", {
        username,
        password,
        mobile,
        email,
      });

      if (res.status === 200) navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-white text-secondary w-96 p-4 rounded-md border-2 border-ascent flex flex-col gap-4">
      <section className="flex flex-col gap-1">
        <label htmlFor="username" className="font-bold">
          USERNAME:{" "}
        </label>
        <input
          id="username"
          type="text"
          placeholder="Enter user name"
          className="p-2 border-2 border-ascent rounded-md focus:outline-none"
          ref={userNameRef}
        />
      </section>

      <section className="flex flex-col gap-1">
        <label htmlFor="email" className="font-bold">
          EMAIL:{" "}
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter email"
          className="p-2 border-2 border-ascent rounded-md focus:outline-none"
          ref={emailRef}
        />
      </section>

      <section className="flex flex-col gap-1">
        <label htmlFor="password" className="font-bold">
          PASSWORD:{" "}
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          className="p-2 border-2 border-ascent rounded-md focus:outline-none"
          ref={passwordRef}
        />
      </section>

      <section className="flex flex-col gap-1">
        <label htmlFor="confirm password" className="font-bold">
          CONFIRM PASSWORD:{" "}
        </label>
        <input
          id="confirm password"
          type="password"
          placeholder="Enter confirm password"
          className="p-2 border-2 border-ascent rounded-md focus:outline-none"
          ref={confirmPasswordRef}
        />
      </section>

      <section className="flex flex-col gap-1">
        <label htmlFor="mobile" className="font-bold">
          MOBILE:{" "}
        </label>
        <input
          id="mobile"
          type="number"
          placeholder="Enter number"
          className="p-2 border-2 border-ascent rounded-md focus:outline-none"
          ref={mobileRef}
        />
      </section>

      <section className="full center">
        <button
          type="button"
          className="bg-ascent text-primary p-2 px-3 rounded-md cursor-pointer hover:opacity-90"
          onClick={submit}
          disabled={isLoading}
        >
          SUBMIT
        </button>
      </section>
    </main>
  );
};

SignUpForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default SignUpForm;
