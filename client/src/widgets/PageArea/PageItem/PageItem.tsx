import { useState } from "react";
import cn from "classnames";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useAppDispatch } from "@app";
import { setElLibModalVisible } from "@entities/Page/model/pageReducer";
import { PageElement } from "./PageElement/PageElement";
import { BasicElement } from "@shared/model/type/front.type";
import { removeElement } from "@entities/Front/model/frontReducer";

interface PageItemProps {
  element: BasicElement;
  selectElement: (element: BasicElement) => void;
}

export const PageItem = ({ element, selectElement }: PageItemProps) => {
  const dispatch = useAppDispatch();
  const [settingsVisible, setSettingsVisible] = useState(false);

  //const width = element.style?.width?.value ?? "auto";

  return (
    <div
      className='relative hover:border hover:border-black'
      style={{ width: '100%' }}
      onMouseEnter={() => {
        setSettingsVisible(true);
      }}
      onMouseLeave={() => {
        setSettingsVisible(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        selectElement(element);
      }}
    >
      <div
        className={cn({
          "z-[1000] absolute right-0 bg-gray-900 p-[5px]": true,
          hidden: !settingsVisible,
        })}
      >
        {element.withChildren && (
          <AddCircleOutlineIcon
            style={{ fill: "white" }}
            className='cursor-pointer'
            onClick={() => {
              selectElement(element);
              dispatch(setElLibModalVisible(true));
            }}
          />
        )}
        <SettingsIcon style={{ fill: "white" }} className='cursor-pointer' />
        <button onClick={() => dispatch(removeElement(element.id))}>
          <DeleteOutlineIcon
            style={{ fill: "white" }}
            className='cursor-pointer'
          />
        </button>
      </div>
      <PageElement element={element} selectElement={selectElement} />
    </div>
  );
};
