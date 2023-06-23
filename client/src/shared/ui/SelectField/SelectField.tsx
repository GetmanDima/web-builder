import { useState, useEffect, useRef } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import cn from "classnames";
import { SelectFieldItem } from "./SelectFieldItem";
import { ISelectItem } from "./type";
import { findItem } from "./lib";
import { getWrapperEventCb } from "@shared/lib";

export interface SelectFieldProps
  extends React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">> {
  items: ISelectItem[];
  placeholder?: string;
  selected?: string | number;
  onSelectValue?: (value: string | number) => void;
}

export const SelectField = ({
  items,
  placeholder,
  selected,
  onSelectValue,
  className,
  ...props
}: SelectFieldProps) => {
  const [selectedItem, setSelectedItem] = useState<ISelectItem>();
  const [listVisible, setListVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickCb = getWrapperEventCb(() => setListVisible(false), [contentRef.current as HTMLElement]);
    document.addEventListener('click', clickCb);
    return () => document.removeEventListener('click', clickCb);
  });

  useEffect(() => {
    const newSelectedItem = selected ? findItem(items, selected) : undefined;
    setSelectedItem(newSelectedItem);
  }, [selected, items]);

  function selectValue(value: string | number) {
    const newSelectedItem = findItem(items, value);
    setSelectedItem(newSelectedItem);
    setListVisible(false);
    onSelectValue && onSelectValue(value);
  }

  const itemComponents = items.map((item) => (
    <SelectFieldItem
      key={item.value}
      item={item}
      onSelectValue={selectValue}
    />
  ));

  return (
    <div className={`relative w-full text-white ${className}`} {...props} ref={contentRef}>
      <div
        className='cursor-pointer relative flex items-center px-[10px] py-[4px] h-[40px] border border-white border-solid bg-gray-900'
        onClick={() => setListVisible(!listVisible)}
      >
        {selectedItem ? (
          <span>{selectedItem.title}</span>
        ) : (
          <span>{placeholder}</span>
        )}
        <KeyboardArrowDownIcon className={cn("absolute right-[8px]", {"rotate-180": listVisible})}/>
      </div>
      <div
        className='z-[1001] absolute w-full mt-[2px] border border-white border-solid bg-gray-800'
        style={{
          display: listVisible ? "block" : "none",
        }}
      >
        {itemComponents}
      </div>
    </div>
  );
};
