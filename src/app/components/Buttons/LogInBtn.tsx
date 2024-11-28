import React from "react";

const LogInBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <button
        className="mx-auto w-full lg:w-24 btn 2xl:text-sm text-xs text-frost font-semibold 2xl:py-2 py-1 2xl:px-8 px-2 whitespace-nowrap bg-[#F5603C] hover:bg-[#AC442A] border-none"
        onClick={onClick}
      >
        Log In
      </button>
    </>
  );
};

export default LogInBtn;
