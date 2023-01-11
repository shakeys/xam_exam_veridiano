import React from "react";

/**
 * @summary Button component
 * @param {string} type Type of the button
 * @param {string} text Text to be displayed in the button
 * @param {onClick} function Action to be executed when button is clicked
 * @param {boolean} disabled Set to true to disable the button
 * @param {boolean} fullWidth Set to true to display a full width button
 * @param {color} color Color of the button
 * @returns {node} Button component
 */
interface Props  {
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  onClick: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  color?: string;
}

const Button: React.FC<Props> = ({ text, onClick, disabled = false, type = "button", fullWidth = false, color = "blue" }) => {
  let widthClass = ""
  if (fullWidth) widthClass = "w-full";

  let colorClass = "bg-blue-500 hover:bg-blue-700 text-white";
  if (color === "gray") {
    colorClass = "bg-gray-500 hover:bg-gray-700 text-black";
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={`disabled:bg-gray-200 disabled:cursor-default cursor-pointer border-none h-[40px] ${colorClass} text-white font-bold py-2 px-4 rounded-none ${widthClass}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
