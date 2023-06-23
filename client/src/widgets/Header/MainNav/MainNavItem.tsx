import { useState } from "react";
import classNames from "classnames";
import { IMainNavItem } from "./type";

interface MainNavItemProps {
  item: IMainNavItem,
  active?: boolean,
  onClick?: () => void
}

export const MainNavItem = ({ item, active = false, onClick }: MainNavItemProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={classNames(
        "cursor-pointer box-border h-[59px] relative flex items-center text-[15px]",
        active ? "text-blue-200" : "text-white"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {item.name}
      <div
        className={classNames(
          "w-full h-[4px] absolute bottom-0",
          hovered ? "block" : "hidden",
          active ? 'bg-blue-200' : 'bg-white'
        )}
      ></div>
    </div>
  );
};
