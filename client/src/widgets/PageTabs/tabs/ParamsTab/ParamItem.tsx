import SettingsIcon from '@mui/icons-material/Settings';
import { TextField } from "@shared/ui";
import { ElParam } from '@shared/model/type/front.type';

interface ParamItemProps {
  param: ElParam,
  onChange: (param: ElParam) => void,
  onEditClick: () => void
}

export const ParamItem = ({ param, onChange, onEditClick }: ParamItemProps) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='mr-[10px]'>{param.name}</div>
      <TextField
        value={param.value}
        className='!w-[180px] ml-auto'
        onChangeValue={(value) => onChange({ ...param, value})}
      />
      <button className="ml-[20px]" onClick={onEditClick}>
        <SettingsIcon />
      </button>
    </div>
  );
};
