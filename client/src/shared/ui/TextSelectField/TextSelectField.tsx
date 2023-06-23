import { useState, useEffect, useRef } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import cn from "classnames";
import { TextSelectFieldItem } from "./TextSelectFieldItem";
import { getWrapperEventCb } from "@shared/lib";

export interface TextSelectFieldProps
  extends React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">> {
  values: string[];
  placeholder?: string;
  value?: string;
  onChangeValue?: (value: string) => void;
}

export const TextSelectField = ({
  values,
  placeholder,
  value,
  onChangeValue,
  className,
  ...props
}: TextSelectFieldProps) => {
  const [listVisible, setListVisible] = useState(false);
  const [currValue, setCurrValue] = useState("");
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
    setCurrValue(value ?? "");
  }, [value]);

  const searchedValues = values.filter((v) => v.includes(currValue));
  const itemComponents = searchedValues.map((v) => (
    <TextSelectFieldItem
      key={v}
      value={v}
      onSelectValue={() => {
        setCurrValue(v);
        setListVisible(false);
        onChangeValue && onChangeValue(v);
      }}
    />
  ));

  let fieldComponent = <div className='py-[4px]'>{placeholder}</div>;

  if (listVisible) {
    fieldComponent = (
      <input
        type='text'
        className='w-full h-full mr-[40px] px-0 outline-none border-none bg-gray-900'
        value={currValue}
        ref={searchRef}
        onChange={(e: any) => {
          setCurrValue(e.target.value);
          onChangeValue && onChangeValue(e.target.value);
        }}
        onClick={(e) => e.stopPropagation()}
      />
    );
  } else if (currValue) {
    fieldComponent = (
      <div
        className='py-[4px]'
        onClick={(e) => {
          e.stopPropagation();
          setListVisible(true);
        }}
      >
        {currValue}
      </div>
    );
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
        className='z-[10001] absolute w-full max-h-[200px] overflow-auto mt-[2px] border border-white border-solid bg-gray-800'
        style={{
          display: listVisible ? "block" : "none",
        }}
      >
        {itemComponents}
      </div>
    </div>
  );
};
