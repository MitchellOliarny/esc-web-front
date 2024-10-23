import React from "react";

const SignUpBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <button
        className="w-full lg:w-auto btn text-white font-semibold py-4 px-8 signup-button border hover:border-slate-700 border-slate-700"
        onClick={onClick}
      >
        Sign Up
      </button>
    </>
  );
};

export default SignUpBtn;
