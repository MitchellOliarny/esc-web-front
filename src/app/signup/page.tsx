"use client";
import React, { useState, useEffect, Suspense } from "react";
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
      <div className="h-screen items-center text-center flex justify-center align-middle !bg-[#141414]" style={{backgroundImage: 'url(/backgrounds/login_back.png)', backgroundSize: 'cover'}}>
          <div className="align-middle items-center justify-center h-auto drop-shadow-lg w-[600px] rounded-xl loginForm">
            <div className="flex h-[85px] items-center text-center justify-center align-middle">
              <div className="flex grow h-full items-center text-center justify-center align-middle rounded-xl">
                <img src={'/esports-clubs-logo-2.png'} className="absolute top-0 w-[40%] h-auto translate-y-[-1.5em]"></img>
              </div>
            </div>
            <SignUp />
          </div>
        </div>
      </>
    </Suspense>
  );
};

export default FormMenu;
