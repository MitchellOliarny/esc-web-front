import React, { useState } from "react";
import Link from "next/link";

// import { Orbitron } from "next/font/google";
import PrivacyPolicy from "../components/Legal/PrivacyPolicy";
import Terms from "../components/Legal/Terms";
import doSignUpAction from "./userActions/doSignUp";
import { Spinner } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import doSignInAction from "./userActions/doSignIn";

// const orbitron = Orbitron({
//   subsets: ["latin"],
//   display: "swap",
//   adjustFontFallback: false,
// });

interface SignInData {
  email: string;
  password: string;
}

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  let previousPath = '/';

  try {
    previousPath = document ? document.referrer : '/';
  }
  catch{
    
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    let formData = new FormData(event.target);
    formData.set(
      "TOS",
      (document.getElementById("TOS") as HTMLInputElement).checked
        ? "true"
        : "false"
    );
    formData.set(
      "News",
      (document.getElementById("News") as HTMLInputElement).checked
        ? "true"
        : "false"
    );

    const response = await doSignUpAction(formData);
    if (response?.success == true) {
      console.log("success");
      //@ts-ignore
      toast.success(response?.message)
      const emailElement = document.getElementById(
        "Email"
      ) as HTMLInputElement;
      const email = emailElement ? emailElement.value : "";
      const passwordElement = document.getElementById(
        "newPassword"
      ) as HTMLInputElement;
      const password = passwordElement ? passwordElement.value : "";
      const formData: SignInData = { email, password };

      // Perform sign-in action after successful sign-up
      const signInResponse = await doSignInAction(formData);
      if (signInResponse?.success === true) {
        {
          previousPath
            ? (window.location.href = previousPath)
            : (window.location.href = "/");
        }
      } else {
        // Handle sign-in failure
        setIsLoading(false);
        toast('Profile Created. Please sign in.')
        console.log("Sign-in after registration failed");
      }
    } else {
      toast('Something went wrong. Check your form and try again.')
      const errorFields = document.getElementsByClassName('error-message');
      for (let x = 0; x < errorFields.length; x++) {
        errorFields[x].innerHTML = "";
      }
      for (const x in response.errors) {
        const errorElement = document.getElementById(
          (response.errors[x].param ? response.errors[x].param : response.errors[x].path) + "-error"
        );
        if (errorElement) {
          errorElement.innerHTML += "<li>" + response.errors[x].msg + "</li>";
        }
      }
      console.log(response.errors);
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: any) => {
    const errorElement1 = document.getElementById("email-error");
    const errorElement2 = document.getElementById("confirmNewEmail-error");
    if (errorElement2 && errorElement1) {
      errorElement1.innerHTML = "";
      errorElement2.innerHTML = "";
    }
  };

  const handleRiotChange = (e: any) => {
    const errorElement = document.getElementById("riotName-error");
    if (errorElement) {
      errorElement.innerHTML = "";
    }
  };

  const handleTagChange = (e: any) => {
    const errorElement = document.getElementById("riotTag-error");
    if (errorElement) {
      errorElement.innerHTML = "";
    }
  };

  const handleFirstNameChange = (e: any) => {
    const errorElement = document.getElementById("firstName-error");
    if (errorElement) {
      errorElement.innerHTML = "";
    }
  };

  const handleLastNameChange = (e: any) => {
    const errorElement = document.getElementById("lastName-error");
    if (errorElement) {
      errorElement.innerHTML = "";
    }
  };

  const handleZipcodeChange = (e: any) => {
    const errorElement = document.getElementById("zipcode-error");
    if (errorElement) {
      errorElement.innerHTML = "";
    }
  };

  const handlePasswordChange = (e: any) => {
    const errorElement = document.getElementById("newPassword-error");
    if (errorElement) {
      errorElement.innerHTML = "";
    }
  };

  const handleConfirmPasswordChange = (e: any) => {
    const errorElement = document.getElementById("confirmNewPassword-error");
    if (errorElement) {
      errorElement.innerHTML = "";
    }
  };

  return (
    <>
      <form id="registerForm" className="py-10" onSubmit={handleSubmit}>
        <div id="emailLine" className="px-10 mb-4 gap-2 grid grid-cols-1">
          <div>
            <input
              type="email"
              id="Email"
              name="newEmail"
              placeholder="Email"
              autoComplete="email"
              className="input w-full bg-transparent border border-white"
              required
              onChange={handleEmailChange}
            />
            <div
              id="newEmail-error"
              className="italic float-left text-red-500 error-message"
            ></div>
          </div>
        </div>

        <div
          id="confirmEmailLine"
          className="px-10 mb-4 gap-2 grid grid-cols-1"
        >
          <div>
            <input
              type="email"
              name="confirmNewEmail"
              id="confirmNewEmail"
              placeholder="Confirm Email"
              className="input w-full bg-transparent border border-white"
              required
              onChange={handleEmailChange}
            />
            <div
              id="confirmNewEmail-error"
              className="italic float-left text-red-500 error-message !-mb-3"
            ></div>
          </div>
        </div>


        {/* <div id="firstNameLine" className="px-10 mb-4 grid grid-cols-2 gap-2">
          <div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name... (optional)"
              autoComplete="firstName"
              className="input w-full bg-transparent border border-white"
              onChange={handleFirstNameChange}
            />
            <div
              id="firstName-error"
              className="italic float-left text-red-500 error-message !-mb-3"
            ></div>
          </div>
          <div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name... (optional)"
              autoComplete="lastName"
              className="input w-full bg-transparent border border-white"
              onChange={handleLastNameChange}
            />
            <div
              id="lastName-error"
              className="italic float-left text-red-500 error-message !-mb-3"
            ></div>
          </div>
        </div>

        <div id="zipLine" className="px-10 mb-4 grid grid-cols-2 gap-2">
          <div>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              placeholder="Zipcode... (optional)"
              autoComplete="zipcode"
              className="input w-full bg-transparent border border-white"
              onChange={handleZipcodeChange}
            />
            <div
              id="zipcode-error"
              className="italic float-left text-red-500 error-message !-mb-3"
            ></div>
          </div>
          <div></div>
        </div> */}

        <div id="passwordLine" className="px-10 mb-4 grid grid-cols-2 gap-2">
          <div>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Password"
              className="input w-full bg-transparent border border-white"
              required
              autoComplete="new-password"
              onChange={handlePasswordChange}
            />
            <div
              id="newPassword-error"
              className="italic float-left text-red-500 error-message !-mb-3"
            ></div>
          </div>
          <div>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              placeholder="Confirm Password"
              className="input w-full bg-transparent border border-white"
              required
              autoComplete="new-password"
              onChange={handleConfirmPasswordChange}
            />
            <div
              id="confirmNewPassword-error"
              className="italic float-left text-red-500 error-message !-mb-3"
            ></div>
          </div>
        </div>

        <div id="riotLine" className="px-10 mb-4 grid grid-cols-2 gap-2">
          <div>
            <input
              type="text"
              id="riotName"
              name="riotName"
              placeholder="Riot Username"
              autoComplete="off"
              className="input w-full bg-transparent border border-white"
              required
              onChange={handleRiotChange}
            />
            <div
              id="riotName-error"
              className="italic float-left text-red-500 error-message !-mb-3"
            ></div>
          </div>
          <div>
            <input
              type="text"
              id="riotTag"
              name="riotTag"
              placeholder="Riot Tag (no #)"
              autoComplete="off"
              className="input w-full bg-transparent border border-white"
              required
              onChange={handleTagChange}
            />
            <div
              id="riotTag-error"
              className="italic float-left text-red-500 error-message !-mb-3"
            ></div>
          </div>
        </div>
        <div className="form-control mx-24 my-8">
          <div className="form-control items-start mb-4">
            <div className="flex items-start">
              <input
                type="checkbox"
                name="TOS"
                id="TOS"
                className="checkbox mr-4 bg-transparent border-slate-400"
                required
              />
              <span className="text-white text-sm font-medium">
                I agree to the{" "}
                <span
                  onClick={() =>
                    (
                      document?.getElementById("tos") as HTMLDialogElement
                    )?.showModal()
                  }
                  className="text-blue-500 cursor-pointer"
                >
                  Terms of Services
                </span>{" "}
                &
                <span
                  onClick={() =>
                    (
                      document.getElementById("privacy") as HTMLDialogElement
                    )?.showModal()
                  }
                  className="text-blue-500 cursor-pointer"
                >
                  {" "}
                  Privacy Policy
                </span>
              </span>
            </div>
            <div
              id="TOS-error"
              className="italic text-red-500 error-message"
            ></div>
          </div>

          <div
            className="form-control items-center"
            style={{ width: "100%" }}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                name="News"
                id="News"
                className="checkbox mr-4 bg-transparent border-slate-400"
              />
              <span className="text-white text-sm font-medium text-left">
                I agree to receive newsletters, marketing promotions and other
                information
              </span>
              <div
                id="News-error"
                className="italic float-left text-red-500 error-message"
              ></div>
            </div>
          </div>

        </div>

        <div>
          <button
            id="submitSignUp"
            type="submit"
            disabled={isLoading}
            className="btn text-white w-56 h-14 text-2xl bg-[#F5603C] hover:bg-[#AC442A] drop-shadow-lg border border-white hover:border-white"
          >
            {isLoading ? "": "SIGN-UP"}
            <Spinner color="default" size={'sm'} className={`${isLoading ? '' : 'hidden'}`} /> 
          </button>
        </div>
      </form>
      <dialog id="privacy" className="modal text-left">
        <div className="modal-box w-full h-fit bg-[#0C131D] overflow-y-auto">
          <h3 className={`font-bold text-2xl font-orbitron pb-2`}>
            Privacy Policy
          </h3>
          <PrivacyPolicy />
          <div className="modal-action py-2">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn bg-[#F5603C] hover:bg-[#AC442A] text-white px-8 justify-start">
                Done
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="tos" className="modal text-left">
        <div className="modal-box w-full h-fit bg-[#0C131D] overflow-y-auto">
          <h3 className={`font-bold text-2xl font-orbitron pb-2`}>
            Terms and Conditions
          </h3>
          <Terms />
          <div className="modal-action py-2">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn bg-[#F5603C] hover:bg-[#AC442A] text-white px-8 justify-start">
                Done
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default SignUp;
