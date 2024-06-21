import { Dispatch, SetStateAction } from "react";

interface BotaoProps {
  color?: "green" | "blue" | "gray";
  children: any;
  className?: string;
  onClick?: () => void;
}

const Button = (props: BotaoProps) => {
  const color = props.color ?? "gray";
  return (
    <button
      onClick={props.onClick}
      className={`bg-gradient-to-r from-${color}-400 to-${color}-700 text-white rounded-md px-4 py-2 mb-4 ${props?.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
