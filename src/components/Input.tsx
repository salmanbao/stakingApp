import { FiChevronUp, FiChevronDown } from "react-icons/fi";

interface InputProps {
  type: "text" | "number" | "email" | "password";
  placeholder?: string;
  defaultValue?: string;
  value: string;
  min?: number | string;
  max?: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

interface NumberInputProps {
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  min?: number;
  max?: number;
  step: number;
  decimalpoints?: number;
  required?: boolean;
  className?: string;
}

export default function Input({ ...props }: InputProps) {
  return <input {...props} />;
}

export function NumberInput({ ...props }: NumberInputProps) {
  return (
    <div className={`counter ${props.className}`}>
      <input
        type="number"
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        onBlur={(e) =>
          props.setValue(
            parseFloat(e.target.value).toFixed(props.decimalpoints || 0)
          )
        }
        min={props.min}
        max={props.max}
        required={props.required}
      />
      <div>
        <button
          type="button"
          onClick={() =>
            props.setValue(
              `${(parseFloat(props.value) + props.step).toFixed(
                props.decimalpoints
              )}`
            )
          }
        >
          <FiChevronUp />
        </button>
        <button
          type="button"
          onClick={() =>
            props.setValue(
              `${(parseFloat(props.value) - props.step).toFixed(
                props.decimalpoints
              )}`
            )
          }
        >
          <FiChevronDown />
        </button>
      </div>
    </div>
  );
}
