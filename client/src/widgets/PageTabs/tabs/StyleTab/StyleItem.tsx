import SettingsIcon from "@mui/icons-material/Settings";
import { TextField } from "@shared/ui";
import { IStyleItem } from "./type";

interface StyleItemProps {
  item: IStyleItem;
  onChange: (item: IStyleItem) => void;
  onEditClick: () => void;
}

export const StyleItem = ({ item, onChange, onEditClick }: StyleItemProps) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='mr-[10px]'>{item.property}</div>
      <TextField
        value={item.value}
        className='!w-[180px] ml-auto'
        onChangeValue={(value) => onChange({ ...item, value})}
      />
      <button className='ml-[20px]' onClick={onEditClick}>
        <SettingsIcon />
      </button>
    </div>
  );
};
