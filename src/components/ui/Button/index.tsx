import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./styles.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button = ({ children, className = "", ...props }: ButtonProps) => (
  <button className={`btn ${className}`.trim()} {...props}>
    {children}
  </button>
);
