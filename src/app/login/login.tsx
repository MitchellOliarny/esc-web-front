
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
        <div className={"px-20 py-8 font-bold"}>
          <div className="my-4 relative">
            <button type="button" className="back-riot btn w-full h-14 text-xl font-bold text-white coming-soon-new-line">
            <img
                alt="riot games logo"
                width={1000}
                height={1000}
                src="/logos/riot-games.png"
                className="w-auto h-full cursor-pointer"
              />
              <p>Log In with Riot Account</p>
            </button>
          </div>
          <p className="text-ash">— or —</p>
          <div className="mb-6 grid gap-6">
            <div
              id="email-error"
              className="italic float-left text-red-500 error-message"
            ></div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="text input input-bordered w-full border h-16 game-row-border back-obsidian text-frost text-lg my-auto px-8"
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
              placeholder="Password"
              className="text input input-bordered w-full border h-16 game-row-border back-obsidian text-frost text-lg my-auto px-8"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* <div className="">
                            <p className="italic float-left text-red-500">Enter a valid password</p>
                        </div> */}
          </div>
          <div>
          <div className="-mt-4 mb-4 text-center w-full">
            <Link
              href="/forgot-password"
              className="hover:text-blue-500 w-auto transition-all text-voltage"
            >
              Forgot Password?
            </Link>
          </div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn w-full h-16 text-2xl text-white bg-[#F5603C] hover:bg-[#AC442A] drop-shadow-lg border hover:border-white"
            >
              {isLoading ? <Spinner color="default" /> : "Log In"}
            </button>
          </div>
          <div className="mt-6 mb-4">
            <Link
              href="/signup"
              className="hover:text-blue-500 w-auto transition-all text-voltage"
            >
              <span className="text-frost font-[400]">Need an account?</span> <span className="font-bold">Sign Up</span>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
