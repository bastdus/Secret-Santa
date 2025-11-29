import type { ReactNode } from "react";
import "./styles.css";

interface CardProps {
  title: ReactNode;
  description: ReactNode;
  children: ReactNode;
}

export const Card = ({ title, description, children }: CardProps) => (
  <article className="card">
    <h1 className="card-title">{title}</h1>
    <p className="card-description">{description}</p>
    <div className="card-content">{children}</div>
  </article>
);
