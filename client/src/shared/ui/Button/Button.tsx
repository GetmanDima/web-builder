import classNames from "classnames"
import { getTypeClassName } from "./lib"
import { Loader } from "../Loader/Loader";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  text: string,
  theme?: 'blue' | 'red' | 'white',
  loading?: boolean,
  disabled?: boolean
}

export const Button = ({text, theme = 'blue', loading, disabled, className, ...props}: ButtonProps) => {
  const typeClassName = getTypeClassName(theme);

  const content = loading ? <Loader /> : text;
  
  return (
    <button 
      className={classNames([
        'cursor-pointer h-[35px] px-5 py-2 border border-solid rounded flex justify-center items-center',
        typeClassName,
        className
      ], {
        '!cursor-default': disabled,
        'hover:!bg-blue-500': disabled && theme === 'blue',
        'hover:!bg-red-500': disabled && theme === 'red',
        'hover:!bg-white': disabled && theme === 'white',
      })}
      {...props}
    >
      {content}
    </button>
  )
}
