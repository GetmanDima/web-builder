import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeElEvent, setElEvent } from "@entities/Front/model/frontReducer";
import { selectedElementSelector, selectedEventSelector } from "@entities/Page/model/pageReducer";
import { ElAction, ElEvent } from "@shared/model/type/event.type";
import {
  Button,
  Group,
  Modal,
  ModalProps,
  OutPseudoField,
  TextSelectField,
} from "@shared/ui";
import { actionTypesDict } from "./lib";
import { ActionModal } from "./ActionModal/ActionModal";

interface EventModalProps extends ModalProps {}

export const EventModal = ({
  closeModal,
  ...props
}: EventModalProps) => {
  const dispatch = useDispatch();
  const selectedElement = useSelector(selectedElementSelector);
  const selectedEvent = useSelector(selectedEventSelector);
  const allowedEvents = selectedElement?.allowedEvents ?? [];

  const [name, setName] = useState("");
  const [actions, setActions] = useState<ElAction[]>([]);
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [currentAction, setCurrentAction] = useState<ElAction>();

  useEffect(() => {
    setName(selectedEvent?.name ?? '');
    setActions(selectedEvent?.actions ?? []);
  }, [selectedEvent]);

  function saveFormData() {
    const newEvent: ElEvent = {
      name,
      actions,
    };

    if (selectedElement) {
      dispatch(setElEvent({ elementId: selectedElement.id, elEvent: newEvent }));
    }
  
    closeModal();
  }

  function saveAction(action: ElAction) {
    const newActions = [...actions];
    const actionIdx = newActions.findIndex((a) => a.id === action.id);

    if (actionIdx === -1) {
      newActions.push(action);
    } else {
      newActions[actionIdx] = action;
    }

    setActions(newActions);
    setCurrentAction(undefined);
  }

  function removeAction(actionId: number) {
    setActions(actions.filter((action) => action.id !== actionId));
  }

  function onRemoveClick() {
    if (selectedElement && selectedEvent) {
      dispatch(removeElEvent({ elementId: selectedElement.id, elEventName: selectedEvent.name }));
    }

    closeModal();
  }

  const actionComponents = actions.map((action) => (
    <div
      key={action.id}
      className='flex flex-col justify-center items-center'
    >
      <OutPseudoField
        className='!w-[300px]'
        value={actionTypesDict[action.type]}
        onOutClick={() => {
          setActionModalVisible(true);
          setCurrentAction(action);
        }}
      />
      <ArrowDownwardIcon style={{ fill: "white" }} />
    </div>
  ));

  const modalTitle = currentAction
    ? `Редактировать "${actionTypesDict[currentAction.type]}"`
    : "Добавить действие";

  return (
    <Modal className='w-[600px]' {...props} closeModal={closeModal}>
      <div>
        <Group className='mb-[30px]'>
          <div className='mr-[20px] text-[16px]'>Название</div>
          <TextSelectField
            values={allowedEvents}
            value={name}
            className='!w-[300px]'
            onChangeValue={setName}
          />
        </Group>
        <div className='flex flex-col items-center justify-center'>
          <div className='mb-[20px] text-center text-[16px]'>Действия</div>
          {actionComponents}
          <div className='mt-[15px]'>
            <Button
              text='Добавить'
              onClick={() => setActionModalVisible(true)}
            />
          </div>
        </div>
        <div className='mt-[20px] flex justify-end'>
          {selectedEvent && (
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
      <ActionModal
        title={modalTitle}
        action={currentAction}
        visible={actionModalVisible}
        closeModal={() => {
          setActionModalVisible(false);
          setCurrentAction(undefined);
        }}
        onSave={saveAction}
        onRemove={removeAction}
      />
    </Modal>
  );
};
