import React from "react";

const SignUpBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <button
        className="w-full lg:w-auto btn text-white font-semibold py-4 px-8 bg-[#0C131D] hover:bg-[#18263A] border hover:border-slate-700 border-slate-700"
        onClick={onClick}
      >
        Sign Up
      </button>
    </>
  );
};

export default SignUpBtn;
