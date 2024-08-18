import { useNavigate } from "react-router-dom";
import API from "../../axios";
import { useRef } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ isLoading, setIsLoading }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const submit = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) return;
    try {
      setIsLoading(true);
      const res = await API.post("http://localhost:5000/api/login", { email, password });

      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-white text-secondary w-96 p-4 rounded-md border-2 border-emerald-400 flex flex-col gap-4">
      <section className="flex flex-col gap-1">
        <label htmlFor="email" className="font-bold">
          EMAIL:{" "}
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter email"
          className="p-2 border-2 border-emerald-400 rounded-md focus:outline-none"
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
          className="p-2 border-2 border-emerald-400 rounded-md focus:outline-none"
          ref={passwordRef}
        />
      </section>

      <section className="full center">
        <button
          type="button"
          className="bg-emerald-400 text-primary p-2 px-3 rounded-md cursor-pointer hover:opacity-90"
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
