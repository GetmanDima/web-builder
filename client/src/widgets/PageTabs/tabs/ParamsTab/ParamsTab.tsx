import { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useAppDispatch } from "@app";
import { removeElParam, setElParam } from "@entities/Front/model/frontReducer";
import { selectedElementSelector } from "@entities/Page/model/pageReducer";
import { ElParam, BasicElement } from "@shared/model/type/front.type";
import { SearchField } from "@shared/ui";
import { TabWrapper } from "../../TabWrapper";
import { ParamItem } from "./ParamItem";
import { ParamModal } from "./ParamModal/ParamModal";
import { editors } from "./editors";

export const ParamsTab = () => {
  const dispatch = useAppDispatch();
  const selectedElement = useSelector(selectedElementSelector) as
    | BasicElement
    | undefined;
  const [search, setSearch] = useState("");
  const [modalParam, setModalParam] = useState<ElParam>();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  if (!selectedElement) {
    return null;
  }

  const paramsMap = selectedElement.params;
  const paramsConfig = selectedElement.config?.params ?? {};

  function saveParam(param: ElParam) {
    if (!selectedElement) {
      return;
    }

    dispatch(
      setElParam({
        elementId: selectedElement.id,
        elParam: param,
      })
    );
  }

  function removeParam() {
    if (selectedElement && modalParam) {
      dispatch(
        removeElParam({
          elementId: selectedElement.id,
          elParamName: modalParam.name,
        })
      );
    }
  }

  function showEditModal(param: ElParam) {
    setModalParam(param);
    setEditModalVisible(true);
  }

  let paramComponents: ReactNode[] = [];

  if (paramsMap) {
    const searchedParams = Object.values(paramsMap).filter((param) =>
      param.name.includes(search)
    );

    paramComponents = searchedParams.map((param) => {
      const editorComponentName = paramsConfig[param.name]?.component;

      if (editorComponentName && editors[editorComponentName]) {
        const ItemComponent = editors[editorComponentName];

        return (
          <div className='mb-[15px]' key={param.name}>
            <ItemComponent
              paramsMap={paramsMap}
              param={param}
              onEditClick={() => showEditModal(param)}
              onChange={saveParam}
            />
          </div>
        );
      }

      return (
        <div className='mb-[15px]' key={param.name}>
          <ParamItem
            param={param}
            onEditClick={() => showEditModal(param)}
            onChange={saveParam}
          />
        </div>
      );
    });
  }

  return (
    <TabWrapper title='Параметры'>
      <AddCircleOutlineIcon
        className='cursor-pointer absolute right-[5px] top-[4px]'
        style={{ fill: "white" }}
        onClick={() => setCreateModalVisible(true)}
      />
      <div className='mt-[30px]'>
        <div className='text-white'>
          <div className='mb-[20px]'>
            <SearchField value={search} onChangeValue={setSearch} />
          </div>
          <div>{paramComponents}</div>
        </div>
      </div>
      <ParamModal
        visible={createModalVisible}
        title={"Добавить параметр"}
        allowedParams={selectedElement?.allowedParams ?? []}
        onSave={saveParam}
        closeModal={() => setCreateModalVisible(false)}
      />
      <ParamModal
        visible={editModalVisible}
        title={`Редактировать ${modalParam?.name ?? ""}`}
        param={modalParam}
        allowedParams={selectedElement?.allowedParams ?? []}
        onSave={saveParam}
        onRemove={() => removeParam()}
        closeModal={() => setEditModalVisible(false)}
      />
    </TabWrapper>
  );
};
