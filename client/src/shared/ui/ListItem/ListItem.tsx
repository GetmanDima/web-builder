import cn from "classnames";
import { PropsWithChildren, ComponentPropsWithoutRef } from "react";

export interface ListItemProps
  extends PropsWithChildren<ComponentPropsWithoutRef<"div">> {
  className?: string;
}

export const ListItem = ({ children, className, ...props }: ListItemProps) => {
  return (
    <div
      className={cn(
        "h-[40px] px-[20px] flex items-center border border-gray-900 border-solid bg-gray-700 text-white text-[16px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
