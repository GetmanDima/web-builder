import { ApiRequest } from "@entities/Api/model/apiReducer";
import { Modal } from "@shared/ui";
import { StringListForm } from "@shared/ui/StringListForm/StringListForm";

interface RequestParamModalProps {
  request: ApiRequest,
  visible: boolean;
  saveRequest: (request: ApiRequest) => void,
  closeModal: () => void;
}

export const RequestParamModal = ({
  request,
  visible,
  saveRequest,
  closeModal,
}: RequestParamModalProps) => {
  return (
    <Modal
      title={`Параметры запроса "${request.name}"`}
      visible={visible}
      className='w-[455px]'
      closeModal={closeModal}
    >
      <StringListForm
        values={request.params}
        saveValues={(newParams) => {
          saveRequest({...request, params: newParams});
          closeModal();
        }}
      />
    </Modal>
  );
};
