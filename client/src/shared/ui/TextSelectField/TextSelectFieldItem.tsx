interface TextSelectFieldItemProps {
  value: string,
  onSelectValue: () => void
}

export const TextSelectFieldItem = ({value, onSelectValue}: TextSelectFieldItemProps) => {
  return (
    <div className="cursor-pointer px-[10px] py-[5px] hover:bg-gray-900" onClick={onSelectValue}>
      {value}
    </div>
  )
}
