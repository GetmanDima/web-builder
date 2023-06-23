import classNames from 'classnames';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { TextField, TextFieldProps } from "@shared/ui"

export interface SearchFieldProps extends TextFieldProps {}

export const SearchField = ({className, ...props}: SearchFieldProps) => {
  return (
    <div className="relative">
      <TextField {...props} className={classNames('!pr-[30px]', className)} />
      <div className="absolute top-[6px] right-[5px]">
        <SearchOutlinedIcon />
      </div>
    </div>
  )
}
