import { useEffect, useState } from "react";
import { StateVar } from "@shared/model/type/front.type";
import {
  Button,
  Modal,
  ModalProps,
  Group,
  TextField,
  CodeTextField
} from "@shared/ui";

interface GlobalStateModalProps extends ModalProps {
  stateVar?: StateVar;
  onSave: (value: StateVar) => void;
  onRemove?: (value: string) => void
}

export const GlobalStateModal = ({
  closeModal,
  stateVar,
  onSave,
  onRemove,
  ...props
}: GlobalStateModalProps) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (stateVar) {
      setName(stateVar.name);
      setValue(stateVar.value);
    }
  }, [stateVar])

  function saveFormData() {
    const newStateVar = {
      name,
      value,
    };

    onSave(newStateVar);
    closeModal();
  }

  function onRemoveClick() {
    if (stateVar && onRemove) {
      onRemove(stateVar.name);
      closeModal();
    }
  }

  return (
    <Modal className='w-[600px]' {...props} closeModal={closeModal}>
      <div className='w-full mt-[35px]'>
        <Group className='mb-[20px]'>
          <div className='mr-[20px] text-[16px]'>Название</div>
          <TextField
            value={name}
            className='!w-[300px]'
            onChangeValue={setName}
          />
        </Group>
        <Group>
          <div className='mr-[20px] text-[16px]'>Значение по умолчанию</div>
          <CodeTextField
            value={value}
            className='!w-[300px]'
            onChangeValue={setValue}
          />
        </Group>
        <div className='mt-[25px] flex justify-end'>
          {stateVar && <Button theme="red" text='Удалить' className="mr-[10px]" onClick={onRemoveClick} />}
          <Button text='Сохранить' onClick={saveFormData} />
        </div>
      </div>
    </Modal>
  );
};
