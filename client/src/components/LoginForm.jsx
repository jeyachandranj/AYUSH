import { useNavigate } from "react-router-dom";
import API from "../axios";
import { useRef } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ isLoading, setIsLoading }) => {
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const submit = async () => {
    const username = userNameRef.current.value;
    const password = passwordRef.current.value;
    const email = emailRef.current.value;

    if (!username || !password || !email) return;
    try {
      setIsLoading(true);
      const res = await API.post("/user/login", {
        username,
        password,
        email,
      });

      if (res.status === 200) navigate("/");
    } catch (error) {
      console.error(error);
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

LoginForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default LoginForm;
