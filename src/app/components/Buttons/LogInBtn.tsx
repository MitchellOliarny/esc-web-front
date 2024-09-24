import React from "react";

const LogInBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <button
        className="w-full lg:w-auto btn text-white font-semibold py-4 px-8 bg-[#F5603C] hover:bg-[#AC442A] border-none"
        onClick={onClick}
      >
        Log In
      </button>
    </>
  );
};

export default LogInBtn;
