import React from 'react';

/**
 * @summary Alert component
 * @param {string} type Type of the Alert to be displayed
 * @param {string} text Text to be displayed in the Alert
 * @returns {node} Alert component
 */
interface Props {
  text: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}

const Alert: React.FC<Props> = ({ text, type = 'info' }) => {
  let classes = 'bg-blue-500 text-white p-2 rounded-none';

  switch (type) {
    case "success":
      classes = 'bg-green-500 text-white p-2 rounded-none';
      break;
    case "warning":
      classes = 'bg-yellow-500 text-black p-2 rounded-none';
      break;
    case "error":
      classes = 'bg-red-500 text-white p-2 rounded-none';
      break;
    default:
      return null;
  }

  return (
    <div className={classes} role="alert">
      <p className="font-body text-center">{text}</p>
    </div>
  );
};

export default Alert;
