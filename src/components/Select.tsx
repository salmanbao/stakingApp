import { FiChevronDown } from "react-icons/fi";

interface SelectProps {
  options: Array<{
    value: string;
    label: string;
  }>;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  required?: boolean;
}

export default function Select({ options, ...props }: SelectProps) {
  return (
    <div className={`select ${props.className}`}>
      <select
        onChange={props.onChange}
        value={props.value}
        required={props.required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div>
        <FiChevronDown />
      </div>
    </div>
  );
}
