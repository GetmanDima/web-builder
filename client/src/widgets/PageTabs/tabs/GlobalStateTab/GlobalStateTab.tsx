import { useState } from "react";
import { useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { RootState, useAppDispatch } from "@app";
import { StateVar } from "@shared/model/type/front.type";
import { removeGlobalStateVar, setGlobalStateVar } from "@entities/Front/model/frontReducer";
import { WithSearchList } from "@shared/ui";
import { TabWrapper } from "../../TabWrapper";
import { GlobalStateModal } from "./GlobalStateModal/GlobalStateModal";

export const GlobalStateTab = () => {
  const dispatch = useAppDispatch();
  const globalState = useSelector(
    (state: RootState) => state.front.globalState
  ) ?? {};

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [modalVarName, setModalVarName] = useState<string>();

  const tabItems = Object.keys(globalState).map((varName) => {
    const stateVar = globalState[varName];

    return {
      id: varName,
      values: [stateVar.name, stateVar.value.slice(0, 10)],
      search: stateVar.name,
    };
  });

  const modalVar = modalVarName ? globalState[modalVarName] : undefined;

  function onSaveVar(stateVar: StateVar) {
    dispatch(setGlobalStateVar(stateVar));
  }

  function onRemoveVar(stateVarName: string) {
    dispatch(removeGlobalStateVar(stateVarName));
  }

  function showEditModal(varName: string) {
    setModalVarName(varName);
    setEditModalVisible(true);
  }

  return (
    <div className='h-full'>
      <TabWrapper title='Глобальное состояние'>
        <AddCircleOutlineIcon
          className='cursor-pointer absolute right-[5px] top-[4px]'
          style={{ fill: "white" }}
          onClick={() => setCreateModalVisible(true)}
        />
        <div className='mt-[30px]'>
          <WithSearchList
            items={tabItems}
            onItemClick={(varName) => showEditModal(varName as string)}
          />
        </div>
      </TabWrapper>
      <GlobalStateModal
        stateVar={modalVar}
        visible={editModalVisible}
        onSave={onSaveVar}
        onRemove={onRemoveVar}
        title={`Редактировать ${modalVar?.name}`}
        closeModal={() => setEditModalVisible(false)}
      />
      <GlobalStateModal
        visible={createModalVisible}
        onSave={onSaveVar}
        title={"Добавить переменную"}
        closeModal={() => setCreateModalVisible(false)}
      />
    </div>
  );
};
