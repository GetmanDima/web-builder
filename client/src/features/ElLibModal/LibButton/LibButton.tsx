import React from 'react';
import { LibElement } from "@shared/model/type/front.type";

interface LibButtonProps {
  element: LibElement,
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export const LibButton = ({element, onClick}: LibButtonProps) => {
  const titleElement = (
    <span>
      {element.title.split(' ').map((word, i) => (
        <span key={i}>
          {word}
          <br/>
        </span>
      ))}
    </span>
  )
  
  return (
    <div className="cursor-pointer px-[10px] flex flex-col items-center hover:bg-gray-300" onClick={onClick}>
      {element.img}
      <div className="text-center">{titleElement}</div>
    </div>
  )
}
