import { IMultiSelectItem } from "./type";

interface MultiSelectFieldItemProps {
  item: IMultiSelectItem & { checked: boolean };
  onCheckValue: (value: string | number) => void;
}

export const MultiSelectFieldItem = ({
  item,
  onCheckValue,
}: MultiSelectFieldItemProps) => {
  return (
    <div
      className='px-[10px] py-[5px] flex items-center hover:bg-gray-900'
      onClick={() => onCheckValue(item.value)}
    >
      <input
        type='checkbox'
        checked={item.checked}
        className="cursor-pointer w-[15px] h-[15px] mr-[5px]"
        style={{accentColor: '#3b82f6'}}
        onChange={() => onCheckValue(item.value)}
      />
      {item.title}
    </div>
  );
};
