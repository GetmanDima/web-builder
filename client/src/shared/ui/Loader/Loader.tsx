import {CSSProperties} from 'react';
import AutorenewIcon from '@mui/icons-material/Autorenew';

export interface LoaderProps {
  className?: string,
  style?: CSSProperties
}

export const Loader = (props: LoaderProps) => {
  return (
    <AutorenewIcon {...props} />
  )
}
