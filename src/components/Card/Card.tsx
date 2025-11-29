import { ReactNode } from "react";
import "./Card.css";

type CardProps = {
  title: ReactNode;
  description: ReactNode;
  children: ReactNode;
};

const Card = ({ title, description, children }: CardProps) => (
  <div className="card">
    <h1 className="card-title">{title}</h1>
    <p className="card-description">{description}</p>
    <div className="card-content">{children}</div>
  </div>
);

export default Card;

