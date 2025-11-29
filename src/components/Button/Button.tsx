import { ReactNode, ButtonHTMLAttributes } from "react";
import "./Button.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

const Button = ({ children, className = "", ...props }: ButtonProps) => (
  <button className={`btn ${className}`} {...props}>
    {children}
  </button>
);

export default Button;

