import React from "react";

const Filter = ({
  onChange,
}: {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  const divisionOptions = [
    { value: "All Teams", text: "All Teams" },
    { value: "A", text: "Orange Division" },
    { value: "B", text: "Blue Division" },
  ];

  return (
    <>
      <div className="border-b border-t">
        <div className="flex justify-center w-full p-6 2xl:!px-40">
          {/* Location Dropdown */}
          <select
            id="location"
            className="hidden select select-bordered !bg-[#1D232A] text-slate-200 w-full max-w-xs"
          >
            <option disabled value="All Teams"></option>
          </select>

          {/* Division Dropdown */}
          <select
            onChange={onChange} // Pass the onChange event here
            className="select select-bordered !bg-[#1D232A] text-slate-200 w-full max-w-xs"
          >
            {divisionOptions.map((division) => (
              <option key={division.value} value={division.value}>
                {division.text}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default Filter;
