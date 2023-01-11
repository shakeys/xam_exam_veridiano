import React, { useState } from "react";

/**
 * @summary Textfield component
 * @param {string} type Type of field to be used. ie. text or password
 * @param {function} onChange Function that handles user typed characters
 * @param {string} value Value of the field.
 * @param {string} placeholder Label that describes the field
 * @param {string} id ID or Name of the field
 * @param {string} error Text to be displayed when field has validation error
 * @returns {node} Textfield component
 */
interface Props {
  type?: string;
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
  value: string;
  placeholder: string;
  id: string;
  error?: string;
}

const TextField: React.FC<Props> = ({
  type = "text",
  onChange,
  onBlur,
  value,
  placeholder,
  id,
  error
}) => {
  return (
    <div className="mb-4">
      <input
        className={`font-body bg-white border h-[40px] border-gray-400 rounded-none py-2 px-4 block w-full appearance-none leading-normal ${error && 'border-red-500'}`}
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {error && <label className="font-body text-xs text-red-500">{error}</label>}
    </div>
  );
};

export default TextField;
