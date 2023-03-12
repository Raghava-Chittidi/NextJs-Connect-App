import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react";
import AuthContext from "../store/AuthContext";

const Signup = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  if (authCtx.isLoggedIn) {
    router.push("/");
  }

  const [loginMode, setLoginMode] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const signupHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/signup", {
        name: nameInputRef.current?.value,
        email: emailInputRef.current?.value,
        password: passwordInputRef.current?.value,
        image: imageInputRef.current?.value,
      });
      console.log(response);
      if (response.status === 201) {
        const name = response.data.name;
        const id = response.data.id;
        const image = response.data.image;
        authCtx.login({ name, id, image }, response.data.token);
        router.push("/");
      } else {
        throw new Error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      setError(error.response.data.message || error.message);
    }
  };

  const loginHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/login", {
        email: emailInputRef.current?.value,
        password: passwordInputRef.current?.value,
      });
      console.log(response.data);
      if (response.status === 200) {
        const name = response.data.name;
        const id = response.data.id;
        const image = response.data.image;
        authCtx.login({ name, id, image }, response.data.token);
        router.push("/");
      } else {
        throw new Error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      setError(error.response.data.message || error.message);
    }
  };

  if (authCtx.isLoggedIn) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={loginMode ? loginHandler : signupHandler}>
      <div className="flex flex-col p-5 pt-1 text-lg bg-white rounded-lg w-1/2 m-auto mt-[10%] text-center md:w-1/3">
        <h1 className="text-3xl">{loginMode ? "Login" : "Sign Up"}</h1>
        <div className="mt-5">
          {!loginMode ? (
            <>
              <input
                className="input-login-signup"
                type="text"
                id="name"
                placeholder="Name"
                ref={nameInputRef}
              />
              <input
                className="input-login-signup"
                type="text"
                id="image"
                placeholder="Image Url"
                ref={imageInputRef}
              />
            </>
          ) : (
            ""
          )}
          <input
            className="input-login-signup"
            type="text"
            id="email"
            placeholder="Email"
            ref={emailInputRef}
          />
          <input
            className="input-login-signup"
            type="password"
            id="password"
            placeholder="Password"
            ref={passwordInputRef}
          />
          {error ? <p className="text-red-500">{error}</p> : ""}
        </div>
        <button className="bg-blue-500 w-full mt-5 m-auto rounded-lg text-white h-10 hover:bg-blue-600">
          {loginMode ? "Login" : "Sign Up"}
        </button>
        <button
          type="button"
          onClick={() => {
            setLoginMode((prevState) => !prevState);
            setError(null);
          }}
          className="text-base m-auto mt-2 hover:underline text-blue-400"
        >
          {loginMode
            ? "Don't have an account? Create one here"
            : "Already have an account? Login here"}
        </button>
      </div>
    </form>
  );
};

export default Signup;
