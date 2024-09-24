"use client";
import React, { useState, useEffect, Suspense } from "react";
import Login from "./login";
import SignUp from "./signup";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const FormMenu = () => {
  const searchParams = useSearchParams();
  const [selectedMenu, setSelectedMenu] = useState("Log-In");
  const form = searchParams.get("form");

  useEffect(() => {
    if (!searchParams) return;
    if (form) {
      setSelectedMenu(form as string);
    }
  }, [form, searchParams]);

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  return (
    <Suspense>
      <>
        <div className="h-screen items-center text-center flex justify-center align-middle !bg-[#141414]">
          <div className="align-middle items-center justify-center h-auto drop-shadow-lg w-[600px] border-2 border-white rounded-xl loginForm">
            <div className="flex h-[85px] items-center text-center justify-center align-middle border-b-2">
              <div className="grid grid-cols-2 grow h-full items-center text-center justify-center align-middle rounded-xl">
                <div
                  onClick={() => handleMenuClick("Log-In")}
                  className={`border-r-2 h-full flex items-center text-center justify-center align-middle cursor-pointer hover:bg-[#386b6a] transition-all rounded-tl-lg ${
                    selectedMenu === "Log-In" ? "loginButton" : ""
                  }`}
                >
                  <p className="font-bold text-3xl">LOG-IN</p>
                </div>
                <div
                  onClick={() => handleMenuClick("Sign-Up")}
                  className={`h-full flex items-center text-center justify-center align-middle cursor-pointer inactive hover:bg-[#f5603c] transition-all rounded-tr-lg ${
                    selectedMenu === "Sign-Up" ? "registerButton" : ""
                  } `}
                >
                  <p className="font-bold text-3xl">SIGN-UP</p>
                </div>
              </div>
            </div>
            {selectedMenu === "Log-In" ? <Login /> : <SignUp />}
          </div>
        </div>
      </>
    </Suspense>
  );
};

export default FormMenu;
