import SettingsIcon from '@mui/icons-material/Settings';

interface ListItemProps {
  values: string[],
  onItemClick: () => void
}

export const ListItem = ({values, onItemClick}: ListItemProps) => {
  const valueComponents = values.map((value, i) => (
    <div key={i} className="flex items-center w-[45%] max-w-[45%] text-[14px]">
      {value}
    </div>
  ));

  return (
    <div className="flex h-[45px] px-[10px] border border-white border-solid">
      {valueComponents}
      <button className="ml-auto" onClick={onItemClick}>
        <SettingsIcon />
      </button>
    </div>
  )
}
