import { useState, useEffect, useRef } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import cn from "classnames";
import { MultiSelectFieldItem } from "./MultiSelectFieldItem";
import { IMultiSelectItem } from "./type";
import { checkItems } from "./lib";
import { getWrapperEventCb } from "@shared/lib";

export interface MultiSelectFieldProps
  extends React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">> {
  items: IMultiSelectItem[];
  placeholder?: string;
  checked?: (string | number)[];
  onCheckValues?: (values: (string | number)[]) => void;
}

export const MultiSelectField = ({
  items,
  placeholder,
  checked = [],
  onCheckValues: onSelectValues,
  className,
  ...props
}: MultiSelectFieldProps) => {
  const [withCheckedItems, setWithCheckedItems] = useState<(IMultiSelectItem & {checked: boolean})[]>([]);
  const [listVisible, setListVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickCb = getWrapperEventCb(() => setListVisible(false), [contentRef.current as HTMLElement]);
    document.addEventListener('click', clickCb);
    return () => document.removeEventListener('click', clickCb);
  });

  useEffect(() => {
    const newItems = checkItems(items, checked);
    setWithCheckedItems(newItems);
  }, [checked, items]);

  function checkValue(value: string | number) {
    let newSelected: (string | number)[];

    if (checked.includes(value)) {
      newSelected = checked.filter((v) => v !== value);
    } else {
      newSelected = [...checked, value];
    }
    const newSelectedItems = checkItems(items, newSelected);
    setWithCheckedItems(newSelectedItems);
    onSelectValues && onSelectValues(newSelected);
  }

  const itemComponents = withCheckedItems.map((item) => (
    <MultiSelectFieldItem
      key={item.value}
      item={item}
      onCheckValue={checkValue}
    />
  ));

  return (
    <div className={`relative w-full text-white ${className}`} {...props} ref={contentRef}>
      <div
        className='cursor-pointer relative flex items-center px-[10px] py-[4px] h-[40px] border border-white border-solid bg-gray-900'
        onClick={() => setListVisible(!listVisible)}
      >
        {checked.length ? (
          <span>{checked.length} элемента</span>
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
