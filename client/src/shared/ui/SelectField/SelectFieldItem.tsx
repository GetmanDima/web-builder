import { ISelectItem } from "./type"

interface SelectFieldItemProps {
  item: ISelectItem,
  onSelectValue: (value: string | number) => void
}

export const SelectFieldItem = ({item, onSelectValue}: SelectFieldItemProps) => {
  return (
    <div className="cursor-pointer px-[10px] py-[5px] hover:bg-gray-900" onClick={() => onSelectValue(item.value)}>
      {item.title}
    </div>
  )
}
