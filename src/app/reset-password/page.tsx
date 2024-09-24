"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import doResetPassword from "./doResetPassword";
import { Spinner } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

const ResetPassword = () => {

  const searchParams = useSearchParams();
  const userID = searchParams.get("user_id");
  const token = searchParams.get("token");

  if(!userID || !token) {
    window.location.href ='/';
  }

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleResetPassword = async (formData: FormData) => {
    //@ts-ignore
    const response = await doResetPassword(formData, token, userID);
    setIsSuccess(true);
    if (response?.success === true) {
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => {
          window.location.href = "/login";
        }, 5000);
      }, 2000);
    } else {
      setIsLoading(false);

      const error_text = document.getElementsByClassName('error-message');
      for(const x in error_text) {
        if(typeof error_text[x] != 'number')
          error_text[x].innerHTML = '';
      }

      //@ts-ignore
      if(response.errors) {
        //@ts-ignore
        for(const x in response.errors) {
          //@ts-ignore
          const error_element = document.getElementById(response.errors[x].param + '-error');
          //@ts-ignore
          error_element.innerHTML += "<li>" +  response.errors[x].msg + "</li>";
        }
      }
      toast.error("Error. Try again.");
    }
  };

  return (
    <form id="reset-form" action={handleResetPassword}>
      <div className="w-full h-screen pt-40">
        <div className="w-full max-w-lg mx-auto bg-[#1D2F44] px-6 py-8 rounded-2xl drop-shadow-lg shadow-md">
          <h1 className="text-white text-3xl font-bold">
            {isSuccess ? "Password Reset!" : "Create New Password"}
          </h1>

          <div className="my-6"></div>

          {isSuccess ? (
            <p>Your password has been successfully changed. Redirecting...</p>
          ) : (
            <div>
              <p className="text-white">
                Your password should be different from passwords you previously
                used. It must be at least 8 characters long and must include a
                number and an uppercase.
              </p>

              <div className="my-4"></div>

              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="New Password"
                className="input input-bordered w-full bg-[#1D232A] text-slate-300"
              />
              <div className="label">
                <span
                  id="newPassword-error"
                  className="label-text-alt text-sm text-red-600 italic error-message"
                ></span>
              </div>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                placeholder="Confirm New Password"
                className="input input-bordered w-full bg-[#1D232A] text-slate-300"
              />
              <div className="label">
                <span
                  id="confirmNewPassword-error"
                  className="label-text-alt text-sm text-red-600 italic error-message"
                ></span>
              </div>

              <div className="my-4"></div>

              <button
                type="submit"
                id="resetpass"
                className="btn w-full rounded-lg text-white bg-[#F5603C] hover:bg-[#AC442A] border-none"
              >
                {isLoading ? <Spinner color="default" /> : "Save New Password"}
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default ResetPassword;
