import React from "react";

const InputFields = ({
  value,
  onChange,
  type,
  label,
  placeholder,
  className,
  onFocus,
  autoFocus,
}) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <input
        value={value}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500"
        onChange={onChange}
        type={type}
        onFocus={onFocus}
        autoFocus={autoFocus}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputFields;
