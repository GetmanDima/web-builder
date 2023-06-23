import { PropsWithChildren, ComponentPropsWithoutRef } from "react";
import cn from "classnames";

export interface FormProps extends PropsWithChildren<ComponentPropsWithoutRef<"div">> {
  title?: string,
  className?: string
}

export const Form = ({title, className, children, ...props}: FormProps) => {
  return (
    <div
      className={cn(
        "py-[15px] px-[20px] pt-1 border border-gray-900 border-solid rounded bg-gray-700 text-white",
        className
      )}
      {...props}
    >
      {title && <div className='text-[18px] mt-[5px] mb-[20px]'>{title}</div>}
      <div className='mt-2'>{children}</div>
    </div>
  );
};
