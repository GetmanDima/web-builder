import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@app";
import {
  selectEvent,
  selectedElementSelector,
  selectedEventSelector,
} from "@entities/Page/model/pageReducer";
import { BasicElement } from "@shared/model/type/front.type";
import { WithSearchList } from "@shared/ui";
import { TabWrapper } from "../../TabWrapper";
import { EventModal } from "./EventModal/EventModal";

export const EventsTab = () => {
  const dispatch = useAppDispatch();
  const selectedElement = useSelector(selectedElementSelector) as BasicElement | undefined;
  const selectedEvent = useSelector(selectedEventSelector);
  const events = selectedElement?.events ?? {};

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const showEditModal = (eventName: string) => {
    dispatch(selectEvent(events[eventName]));
    setEditModalVisible(true);
  }

  const tabItems = Object.keys(events).map((eventName) => {
    return {
      id: eventName,
      search: eventName,
      values: [eventName]
    }
  })

  return (
    <div className='h-full'>
      <TabWrapper title='События'>
        <AddCircleOutlineIcon
          className='cursor-pointer absolute right-[5px] top-[4px]'
          style={{ fill: "white" }}
          onClick={() => setCreateModalVisible(true)}
        />
        <div className='mt-[30px]'>
          <WithSearchList
            items={tabItems}
            onItemClick={(eventName) => showEditModal(eventName as string)}
          />
        </div>
      </TabWrapper>
      <EventModal
        visible={editModalVisible}
        title={`Редактировать "${selectedEvent?.name}"`}
        closeModal={() => setEditModalVisible(false)}
      />
      <EventModal
        visible={createModalVisible}
        title={"Добавить переменную"}
        closeModal={() => setCreateModalVisible(false)}
      />
    </div>
  );
};
