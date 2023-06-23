import {useState, useEffect} from 'react';
import { ApiRequest } from "@entities/Api/model/apiReducer";
import { Button, Group, Modal, MultiSelectField } from "@shared/ui";

interface RequestResponseModalProps {
  request: ApiRequest;
  visible: boolean;
  saveRequest: (request: ApiRequest) => void;
  closeModal: () => void;
}

export const RequestResponseModal = ({
  request,
  visible,
  saveRequest,
  closeModal,
}: RequestResponseModalProps) => {
  const [checkedVars, setCheckedVars] = useState<string[]>([]);

  useEffect(() => {
    setCheckedVars(request.response.vars);
  }, [request.response.vars])
  

  const varItems = request.actions.map((a) => {
    return {
      title: a.var,
      value: a.var,
    };
  });

  return (
    <Modal
      title={`Переменные ответа "${request.name}"`}
      visible={visible}
      className='w-[455px]'
      closeModal={closeModal}
    >
      <Group className='mb-[20px]'>
        <div className='mr-[20px] text-[16px]'>Переменные</div>
        <MultiSelectField
          items={varItems}
          checked={checkedVars}
          onCheckValues={(v) => setCheckedVars(v as string[])}
        />
      </Group>
      <div className='flex justify-end'>
        <Button text='Сохранить' onClick={() => {
          saveRequest({
              ...request,
              response: {
                status: 200,
                vars: checkedVars,
              },
            });
          closeModal();
        }} />
      </div>
    </Modal>
  );
};
