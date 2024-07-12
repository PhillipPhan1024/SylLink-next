import React from "react";
import "@/app/globals.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: "blue" | "green";
}

const SyllabusButton: React.FC<ButtonProps> = ({ color, children, ...props }) => {
  const colorClass = color === "blue" ? "button-blue" : "button-green";

  return (
    <button className={`button ${colorClass}`} {...props}>
      {children}
    </button>
  );
};

export default SyllabusButton;
