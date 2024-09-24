"use client";
import React, { useState } from "react";
import doForgotPassword from "./doForgotPassword";
import toast from "react-hot-toast";
import { Spinner } from "@nextui-org/react";
import { set } from "zod";
import Link from "next/link";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleForgotPassword = async (formData: FormData) => {
    setIsLoading(true);
    const response = await doForgotPassword(formData);

    if (response?.success === true) {
      setTimeout(() => {
        setIsSuccess(true);
        setIsLoading(false);
        console.log("success");
        setTimeout(() => {
          window.location.href = "/";
        }, 5000);
      }, 2000);
    } else {
      setIsLoading(false);
      console.log("failure");
      toast.error("Invalid Email Address");
    }
  };

  return (
    <form id="loginForm" action={handleForgotPassword}>
      <div className="w-full h-screen pt-40 bg-">
        <div className="w-full max-w-lg mx-auto bg-[#1D2F44] px-6 py-8 rounded-2xl drop-shadow-lg shadow-md">
          {isSuccess ? (
            <h1 className="text-white text-3xl font-bold">Email sent!</h1>
          ) : (
            <h1 className="text-white text-3xl font-bold">Forgot Password?</h1>
          )}
          <div className="my-6"></div>
          {isSuccess ? (
            <p className="text-white">
              If an account is associated with the email address that you
              provided, a password reset link will be sent to your email
              address.
              <br />
              <br />
              <Link
                href="/"
                className="text-sm text-blue-500 italic hover:underline hover:text-blue-400 transition-all"
              >
                Redirecting to home page in 5 seconds
              </Link>
            </p>
          ) : (
            <div>
              <p className="text-white">
                To reset your password, enter the email address you use to
                sign-in below.
              </p>
              <div className="my-4"></div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                className="input input-bordered w-full bg-[#1D232A] text-slate-300"
              />
              <div className="label">
                <span
                  id="email-error"
                  className="label-text-alt text-sm text-red-600 italic"
                ></span>
              </div>
              <div className="my-4"></div>
              <button
                type="submit"
                className="btn w-full rounded-lg text-white bg-[#F5603C] hover:bg-[#AC442A] border-none"
              >
                {isLoading ? <Spinner color="default" /> : "Reset Password"}
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
