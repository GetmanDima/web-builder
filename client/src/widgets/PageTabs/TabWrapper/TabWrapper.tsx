import { PropsWithChildren } from 'react'

interface TabWrapperProps extends PropsWithChildren {
  title: string
}

export const TabWrapper = ({title, children}: TabWrapperProps) => {
  return (
    <div className="relative w-[400px] h-full py-[4px] px-[8px] bg-gray-900">
      <div className='mb-[16px] text-[16px] text-white'>{title}</div>
      {children}
    </div>
  )
}
