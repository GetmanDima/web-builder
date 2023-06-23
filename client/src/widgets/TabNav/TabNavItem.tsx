import classNames from "classnames";
import { ITabItem } from "./type";


interface TabsNavItemProps {
  item: ITabItem;
  active?: boolean;
  onClick?: () => void;
}

export const PropertyTabsNavItem = ({
  item,
  active = false,
  onClick,
}: TabsNavItemProps) => {
  return (
    <div
      className={classNames(
        "cursor-pointer py-[8px] pl-[3px] hover:bg-gray-900",
        active ? "bg-gray-900 text-blue-200" : 'text-white'
      )}
      style={{ writingMode: "vertical-lr" }}
      onClick={onClick}
    >
      {item.name}
    </div>
  );
};
