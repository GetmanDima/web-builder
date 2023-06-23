import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalProps,
  Group,
  TextSelectField,
} from "@shared/ui";
import { IStyleItem } from "../type";
import { SourceFieldGroup } from "@widgets/SourceFieldGroup/SourceFieldGroup";

const propertyValues = [
  "width",
  "height",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "paddingTop",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "borderWidth",
  "borderColor",
  "borderStyle",
  "borderRadius",
  "backgroundColor",
  "backgroundImage",
  "fontSize",
  "fontFamily",
  "fontStyle",
  "fontWeight",
  "display",
  "top",
  "bottom",
  "left",
  "right",
  "flexDirection",
  "flexWrap",
  "alignItems",
  "justifyContent",
  "color",
];

interface StyleModalProps extends ModalProps {
  item?: IStyleItem;
  onSave: (item: IStyleItem) => void;
  onRemove?: (property: string) => void;
}

export const StyleModal = ({
  closeModal,
  item,
  onSave,
  onRemove,
  ...props
}: StyleModalProps) => {
  const [property, setProperty] = useState("");
  const [source, setSource] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    setProperty(item?.property ?? "");
    setSource(item?.source ?? "");
    setValue(item?.value ?? "");
  }, [item]);

  function saveFormData() {
    const newItem = {
      property,
      source,
      value,
    };

    onSave(newItem);
    setProperty("");
    setSource("");
    setValue("");
    closeModal();
  }

  function onRemoveClick() {
    if (item && onRemove) {
      onRemove(item.property);
      closeModal();
    }
  }

  return (
    <Modal className='w-[600px]' {...props} closeModal={closeModal}>
      <div className='w-full mt-[35px]'>
        <Group className='mb-[20px]'>
          <div className='mr-[20px] text-[16px]'>Свойство</div>
          <TextSelectField
            values={propertyValues}
            value={property}
            className='!w-[300px]'
            onChangeValue={(v) => setProperty(v.toString())}
          />
        </Group>
        <SourceFieldGroup
          source={source}
          value={value}
          onChange={({source, value}) => {
            setSource(source);
            setValue(value);
          }}
        />
        <div className='mt-[25px] flex justify-end'>
          {item && (
            <Button
              theme='red'
              text='Удалить'
              className='mr-[10px]'
              onClick={onRemoveClick}
            />
          )}
          <Button text='Сохранить' onClick={saveFormData} />
        </div>
      </div>
    </Modal>
  );
};
