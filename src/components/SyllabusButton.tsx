import React from "react";
import "@/app/globals.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: "blue" | "green";
}

const SyllabusButton: React.FC<ButtonProps> = ({
  color,
  children,
  ...props
}) => {
  const colorClass =
    color === "blue"
      ? "bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300"
      : "bg-green-500 hover:bg-green-600";

  return (
    <button
      className={`flex items-center justify-center px-4 py-2 rounded text-white transition-colors duration-300 ${colorClass}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default SyllabusButton;
