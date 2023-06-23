import { useState, useEffect, useRef } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import cn from "classnames";
import { SelectFieldItem } from "./SelectFieldItem";
import { ISelectItem } from "./type";
import { findItem } from "./lib";
import { getWrapperEventCb } from "@shared/lib";

export interface SearchSelectFieldProps
  extends React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">> {
  items: ISelectItem[];
  placeholder?: string;
  selected?: string | number;
  onSelectValue?: (value: string | number) => void;
}

export const SearchSelectField = ({
  items,
  placeholder,
  selected,
  onSelectValue,
  className,
  ...props
}: SearchSelectFieldProps) => {
  const [selectedItem, setSelectedItem] = useState<ISelectItem>();
  const [listVisible, setListVisible] = useState(false);
  const [search, setSearch] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const clickCb = getWrapperEventCb(
      () => setListVisible(false),
      [contentRef.current as HTMLElement]
    );
    document.addEventListener("click", clickCb);
    return () => document.removeEventListener("click", clickCb);
  });

  useEffect(() => {
    if (listVisible) {
      searchRef.current?.focus();
    }
  }, [listVisible]);

  useEffect(() => {
    if (!selected) {
      setSelectedItem(undefined);
      return;
    }

    const newSelectedItem = findItem(items, selected);
    setSelectedItem(newSelectedItem);
  }, [selected, items]);

  const searchedItems = items.filter((item) => item.title.includes(search));
  const itemComponents = searchedItems.map((item) => (
    <SelectFieldItem key={item.value} item={item} onSelectValue={selectValue} />
  ));

  let fieldComponent = <div className='py-[4px]'>{placeholder}</div>;

  if (listVisible) {
    fieldComponent = (
      <input
        type='text'
        className='w-full h-full mr-[40px] px-0 outline-none border-none bg-gray-900'
        value={search}
        ref={searchRef}
        onInput={(e: any) => setSearch(e.target.value)}
        onClick={(e) => e.stopPropagation()}
      />
    );
  } else if (selectedItem) {
    fieldComponent = (
      <div
        className='py-[4px]'
        onClick={(e) => {
          e.stopPropagation();
          setListVisible(true);
        }}
      >
        {selectedItem.title}
      </div>
    );
  }

  function selectValue(value: string | number) {
    const newSelectedItem = findItem(items, value);
    setSelectedItem(newSelectedItem);
    setListVisible(false);
    onSelectValue && onSelectValue(value);
  }

  return (
    <div
      className={`relative w-full text-white ${className}`}
      {...props}
      ref={contentRef}
    >
      <div
        className='cursor-pointer relative flex items-center px-[10px] h-[40px] border border-white border-solid bg-gray-900'
        onClick={() => setListVisible(!listVisible)}
      >
        {fieldComponent}
        <KeyboardArrowDownIcon
          className={cn("absolute right-[8px]", { "rotate-180": listVisible })}
        />
      </div>
      <div
        className='z-[10001] absolute w-full mt-[2px] border border-white border-solid bg-gray-800'
        style={{
          display: listVisible ? "block" : "none",
        }}
      >
        {itemComponents}
      </div>
    </div>
  );
};
