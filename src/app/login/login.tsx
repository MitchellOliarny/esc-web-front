import React, { useState } from "react";
import Link from "next/link";
import doSignInAction from "./userActions/doSignIn";
import { toast } from "react-hot-toast";
import { Spinner } from "@nextui-org/react";

interface SignInData {
  email: string;
  password: string;
}

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let previousPath = '/';

  try {
    previousPath = document ? document.referrer : '/';
  }
  catch{
    
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData: SignInData = { email, password };
    const response = await doSignInAction(formData);


    if (response?.success === true) {
      console.log("success");
      {
        previousPath
          ? (window.location.href = previousPath)
          : (window.location.href = "/");
      }
    } else {
      setIsLoading(false);
      toast('Something went wrong. Check your form and try again.')
      for (const error of response.errors) {
        const errorElement = document.getElementById((error.param ? error.param : error.path) + "-error");
        if (errorElement) {
          errorElement.innerHTML = error.msg;
        }
      }
      console.log("failure");
    }
  };

  return (
    <>
      <form id="loginForm" onSubmit={handleSubmit}>
        <div className={"p-10"}>
          <div className="mb-14 hiddden">
            <h1 className="text-5xl font-bold mt-4">ESPORTS CLUBS</h1>
            <p className="text-lg mt-2">Where every game is a good game!</p>
          </div>
          <div className="mb-6 grid">
            <div
              id="email-error"
              className="italic float-left text-red-500 error-message"
            ></div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="enter your email..."
              className="input w-full bg-transparent border border-white mb-4"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* <div className="">
                            <p className="italic float-left text-red-500">Enter a valid email address</p>
                        </div> */}
            <input
              type="password"
              name="password"
              id="password"
              placeholder="enter your password..."
              className="input w-full bg-transparent border border-white"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* <div className="">
                            <p className="italic float-left text-red-500">Enter a valid password</p>
                        </div> */}
          </div>
          <div className="mb-14">
            <Link
              href="/forgot-password"
              className="hover:text-blue-500 w-auto transition-all"
            >
              Having trouble signing in?
            </Link>
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn w-56 h-14 text-2xl text-white bg-[#F5603C] hover:bg-[#AC442A] drop-shadow-lg border border-white hover:border-white"
            >
              {isLoading ? <Spinner color="default" /> : " SIGN-IN"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
