import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@app";
import { saveCurrRequestAction, setCurrRequestAction, setCurrRequestActionType } from "@entities/Api/model/apiReducer";
import { Button, Group, Modal, SelectField, TextField } from "@shared/ui";
import { RequestGetForm, RequestCreateForm, RequestEditForm, RequestRemoveForm } from "./forms";

interface RequestActionModalProps {
  visible: boolean;
  closeModal: () => void;
}

export const RequestActionModal = ({
  visible,
  closeModal,
}: RequestActionModalProps) => {
  const dispatch = useAppDispatch();
  const action = useSelector((state: RootState) => state.api.currRequestAction);

  const actionTypeItems = [
    {
      title: "Получить",
      value: "get",
    },
    {
      title: "Создать",
      value: "create",
    },
    {
      title: "Изменить",
      value: "edit",
    },
    {
      title: "Удалить",
      value: "remove",
    },
  ];

  const typeFormComponent = useMemo(() => {
    if (action?.type === 'get') {
      return <RequestGetForm />
    }

    if (action?.type === 'create') {
      return <RequestCreateForm />
    }

    if (action?.type === 'edit') {
      return <RequestEditForm />
    }

    if (action?.type === 'remove') {
      return <RequestRemoveForm />
    }

    return null;
  }, [action?.type])

  if (!action) {
    return null;
  }

  return (
    <Modal
      title={action.var ? `Действие "${action.var}"` : "Новое действие"}
      visible={visible}
      className='w-[500px]'
      closeModal={closeModal}
    >
      <Group className='mb-[20px]'>
        <div className='mr-[20px] text-[16px]'>Переменная</div>
        <TextField
          value={action?.var}
          className='!w-[300px]'
          onChangeValue={(v) => {
            dispatch(setCurrRequestAction({...action, var: v}));
          }}
        />
      </Group>
      <Group className='mb-[20px]'>
        <div className='mr-[20px] text-[16px]'>Действие</div>
        <SelectField
          items={actionTypeItems}
          selected={action?.type}
          className="!w-[300px]"
          onSelectValue={(v) => {
            dispatch(setCurrRequestActionType(v as string));
          }}
        />
      </Group>
      {typeFormComponent}
      <div className='mt-[25px] flex justify-end'>
        <Button text='Сохранить' onClick={() => {
          dispatch(saveCurrRequestAction());
          dispatch(setCurrRequestAction(undefined));
          closeModal();
        }} />
      </div>
    </Modal>
  );
};
