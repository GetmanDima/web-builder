import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalProps,
  Group,
  TextSelectField,
} from "@shared/ui";
import { ElParam } from "@shared/model/type/front.type";
import { SourceFieldGroup } from "@widgets/SourceFieldGroup/SourceFieldGroup";

interface ParamModalProps extends ModalProps {
  param?: ElParam;
  allowedParams: string[],
  onSave: (param: ElParam) => void;
  onRemove?: (paramName: string) => void;
}

export const ParamModal = ({
  closeModal,
  param,
  allowedParams,
  onSave,
  onRemove,
  ...props
}: ParamModalProps) => {
  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (param) {
      setName(param.name);
      setSource(param.source);
      setValue(param.value);
    }
  }, [param]);

  function saveFormData() {
    const newParam = {
      name,
      source,
      value,
    };

    onSave(newParam);
    closeModal();
  }

  function onRemoveClick() {
    if (param && onRemove) {
      onRemove(param.name);
      closeModal();
    }
  }

  return (
    <Modal className='w-[600px]' {...props} closeModal={closeModal}>
      <div className='w-full mt-[35px]'>
        <Group className='mb-[20px]'>
          <div className='mr-[20px] text-[16px]'>Название</div>
          <TextSelectField
            values={allowedParams}
            value={name}
            className='!w-[300px]'
            onChangeValue={setName}
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
          {param && (
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
