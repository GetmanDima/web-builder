import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectedEventSelector } from "@entities/Page/model/pageReducer";
import { ElAction } from "@shared/model/type/event.type";
import {
  Button,
  Modal,
  ModalProps,
  Group,
  SearchSelectField,
} from "@shared/ui";
import { StateForm } from "./actionForms/StateForm/StateForm";
import { ServerRequestForm } from "./actionForms/ServerRequestForm/ServerRequestForm";

const actionTypeItems = [
  { title: "Установить состояние", value: "setState" },
  { title: "Запрос к серверу", value: "serverRequest" },
];

interface ActionModalProps extends ModalProps {
  action?: ElAction;
  onSave: (action: ElAction) => void;
  onRemove?: (actionId: number) => void;
}

export const ActionModal = ({
  closeModal,
  action,
  onSave,
  onRemove,
  ...props
}: ActionModalProps) => {
  const selectedEvent = useSelector(selectedEventSelector);

  const [typeValue, setTypeValue] = useState("");
  const [order, setOrder] = useState(0);
  const [value, setValue] = useState<any>();

  useEffect(() => {
    setTypeValue(action?.type ?? "");
    setOrder(action?.order ?? 0);
    setValue(action?.value);
  }, [action]);

  const saveFormData = () => {
    const actionId: number = action
      ? action.id
      : selectedEvent?.actions.reduce(
          (max, a) => (a.id > max ? a.id : max),
          1
        ) ?? 1;
    const newAction = {
      id: actionId,
      type: typeValue,
      order,
      value,
    };

    onSave(newAction);
    closeModal();
  };

  const onRemoveClick = () => {
    if (action && onRemove) {
      onRemove(action.id);
      closeModal();
    }
  };

  const changeTypeValue = (newTypeValue: string) => {
    setTypeValue(newTypeValue);

    if (newTypeValue === "setState") {
      setValue({ varName: "", source: "", value: "" });
    }

    if (newTypeValue === "serverRequest") {
      setValue({
        requestName: "",
        paramMatches: {},
        responseMatches: {},
        successStates: [],
        errorStates: [],
      });
    }
  };

  let formComponent = null;

  if (typeValue === "setState") {
    formComponent = <StateForm value={value} setValue={setValue} />;
  }

  if (typeValue === "serverRequest") {
    formComponent = <ServerRequestForm value={value} setValue={setValue} />;
  }

  return (
    <Modal className='w-[600px]' {...props} closeModal={closeModal}>
      <div className='w-full mt-[35px]'>
        <Group className='mb-[20px]'>
          <div className='mr-[20px] text-[16px]'>Тип действия</div>
          <SearchSelectField
            items={actionTypeItems}
            selected={typeValue}
            className='!w-[300px]'
            onSelectValue={(v) => changeTypeValue(v.toString())}
          />
        </Group>
        {formComponent}
        <div className='mt-[25px] flex justify-end'>
          {action && (
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
