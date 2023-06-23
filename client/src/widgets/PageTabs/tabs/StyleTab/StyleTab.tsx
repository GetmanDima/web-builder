import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@app";
import { removeElStyle, setElStyle } from "@entities/Front/model/frontReducer";
import { selectedElementSelector } from "@entities/Page/model/pageReducer";
import { SearchField } from "@shared/ui";
import { TabWrapper } from "../../TabWrapper";
import { IStyleItem } from "./type";
import { StyleItem } from "./StyleItem";
import { StyleModal } from "./StyleModal/StyleModal";

export const StyleTab = () => {
  const dispatch = useAppDispatch();
  const selectedElement = useSelector(selectedElementSelector);
  const [search, setSearch] = useState("");
  const [modalProperty, setModalProperty] = useState<string>();
  const [modalVisible, setModalVisible] = useState(false);

  const style = selectedElement?.style;

  let styleItemComponents: ReactNode[] = [];

  if (style) {
    const searchedStyle = Object.keys(style).filter((property) => property.includes(search)).reduce((res: any, property) => {
      res[property] = style[property];
      return res;
    }, {});

    styleItemComponents = Object.keys(searchedStyle).map((property) => (
      <div className='mb-[15px]' key={property}>
        <StyleItem
          item={{property, ...style[property]}}
          onEditClick={() => showEditModal(property)}
          onChange={saveStyle}
        />
      </div>
    ));
  }

  function saveStyle(item: IStyleItem) {
    if (!selectedElement) {
      return;
    }

    dispatch(
      setElStyle({
        elementId: selectedElement.id,
        style: { ...style, [item.property]: {source: item.source, value: item.value} },
      })
    );
  }

  function closeModal() {
    setModalVisible(false);
    setModalProperty(undefined);
  }

  function removeStyle() {
    if (selectedElement && modalProperty) {
      dispatch(removeElStyle({elementId: selectedElement.id, property: modalProperty}));
    }
  }

  function showEditModal(property: string) {
    setModalProperty(property);
    setModalVisible(true);
  }

  return (
    <TabWrapper title='Стили'>
      <AddCircleOutlineIcon
        className='cursor-pointer absolute right-[5px] top-[4px]'
        style={{ fill: "white" }}
        onClick={() => setModalVisible(true)}
      />
      <div className='mt-[30px]'>
        <div className='text-white'>
          <div className='mb-[20px]'>
            <SearchField value={search} onChangeValue={setSearch} />
          </div>
          <div>
            {styleItemComponents}
          </div>
        </div>
      </div>
      <StyleModal
        visible={modalVisible}
        title={`Редактировать ${style?.property ?? ''}`}
        item={modalProperty && style ? {property: modalProperty, ...style[modalProperty]} : undefined}
        onSave={saveStyle}
        onRemove={() => removeStyle()}
        closeModal={closeModal}
      />
    </TabWrapper>
  );
};
