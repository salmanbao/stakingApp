interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return <div className={`card-1 ${className}`}>{children}</div>;
}
