import { useEffect, useRef } from "react";
import cn from "classnames";

export interface TextFieldProps extends React.ComponentPropsWithoutRef<"input"> {
  value?: string;
  error?: boolean;
  disabled?: boolean,
  onChangeValue?: (value: string) => void;
}

export const TextField = ({
  type = "text",
  value = "",
  error,
  disabled = false,
  className,
  onChangeValue,
  ...props
}: TextFieldProps) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.value = value;
    }
  }, [value]);

  return (
    <input
      type={type}
      ref={ref}
      disabled={disabled}
      className={cn([
        "w-full h-[40px] px-[10px] py-2 border border-white border-solid rounded bg-gray-900 text-[14px] text-white focus:border-blue-200 focus:outline-none",
        {'!border-red-700': error},
        className,
      ])}
      onChange={(e) => onChangeValue && !disabled && onChangeValue(e.target.value)}
      {...props}
    />
  );
};
