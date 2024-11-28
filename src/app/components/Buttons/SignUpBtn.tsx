import React from "react";

const SignUpBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <button
        className="mx-auto w-full lg:w-24 btn 2xl:text-sm text-xs text-frost font-semibold 2xl:py-2 py-1 2xl:px-8 px-2 whitespace-nowrap signup-button border hover:border-slate-700 border-slate-700"
        onClick={onClick}
      >
        Sign Up
      </button>
    </>
  );
};

export default SignUpBtn;
