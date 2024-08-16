import { useState } from 'react';
import { LoginForm, SignUpForm } from '../components';

const Login = () => {
  const [mode, setMode] = useState("login");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="screen bg-primary center flex-col gap-3">
      <section className="w-96 bg-black text-white rounded-md flex">
        <button
          className={`flex-1 center p-2 ${mode === 'login' && 'bg-ascent'}`}
          onClick={() => setMode('login')}
        >
          Login
        </button>

        <button
          className={`flex-1 center p-2 ${mode === 'signup' && 'bg-ascent'}`}
          onClick={() => setMode('signup')}
        >
          Signup
        </button>
      </section>

      {mode === "login" ? (
        <LoginForm loading={isLoading} setIsLoading={setIsLoading} />
      ) : (
        <SignUpForm loading={isLoading} setIsLoading={setIsLoading} />
      )}
    </div>
  )
}

export default Login
