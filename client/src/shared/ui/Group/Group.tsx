import classNames from 'classnames';
import { ReactNode } from 'react'

export interface GroupProps {
  className?: string,
  children: [ReactNode, ReactNode]
}

export const Group = ({children, className}: GroupProps) => {
  return (
    <div className={classNames([
      "flex justify-between items-center",
      className,
    ])}>
      <div className='mr-6'>
        {children[0]}
      </div>
      {children[1]}
    </div>
  );
};
