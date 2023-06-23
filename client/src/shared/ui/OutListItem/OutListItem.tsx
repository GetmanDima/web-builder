import { PropsWithChildren, ComponentPropsWithoutRef } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { ListItem } from "@shared/ui";

export interface OutListItemProps
  extends PropsWithChildren<ComponentPropsWithoutRef<"div">> {
  className?: string,
  onEditClick: () => void,
  onOutClick: () => void,
}

export const OutListItem = ({ children, onEditClick, onOutClick, ...props }: OutListItemProps) => {
  return (
    <ListItem {...props}>
      {children}
      <div className="ml-auto flex items-center">
        <SettingsIcon onClick={onEditClick} className="cursor-pointer mr-[5px]"/>
        <ArrowOutwardIcon onClick={onOutClick} className="cursor-pointer"/>
      </div>
    </ListItem>
  );
};
