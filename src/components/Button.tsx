import { Link } from "react-router-dom";

interface ButtonProps {
  children: React.ReactNode | string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
  className?: string;
  asLink?: string;
  disabled?: boolean;
}

export default function Button({ children, ...props }: ButtonProps) {
  if (props.asLink) {
    return (
      <Link to={props.asLink} {...props}>
        {children}
      </Link>
    );
  } else {
    return <button {...props}>{children}</button>;
  }
}
