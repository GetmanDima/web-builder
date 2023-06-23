import { Button } from "@shared/ui";

interface GlobalStateListItemProps {
  values: string[],
  onItemClick: () => void
}

export const GlobalStateListItem = ({values, onItemClick}: GlobalStateListItemProps) => {
  const valueComponents = values.map((value, i) => (
    <div key={i} className="w-[45%] max-w-[45%]">
      {value}
    </div>
  ));

  return (
    <div className="flex items-center p-[12px] border border-white border-solid">
      {valueComponents}
      <Button className="ml-auto" text="Выбрать" onClick={onItemClick} />
    </div>
  )
}