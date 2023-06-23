import { useSelector } from "react-redux";
import { useAppDispatch } from "@app";
import { BasicElement, LibElement } from "@shared/model/type/front.type";
import { Modal, ModalProps } from "@shared/ui"
import { setElement, setElChild, lastElementIdSelector } from "@entities/Front/model/frontReducer";
import { getElementsIdMatch, updateElementsIds } from "@entities/Page/lib/lib";
import { ElLibList } from "./ElLibList";

export interface ElLibModalProps extends ModalProps {
  parent: BasicElement
}

export const ElLibModal = ({closeModal, parent, ...props}: ElLibModalProps) => {
  const lastElementId = useSelector(lastElementIdSelector);
  const dispatch = useAppDispatch();

  function createElement(fe: LibElement) {
    const elementId = lastElementId + 1;
    const idMatch = getElementsIdMatch(fe.elements, elementId);
    const elementsWithIds = updateElementsIds(fe.elements, idMatch);

    Object.values(elementsWithIds).forEach((element) => {
      dispatch(setElement(element));
    });
    dispatch(setElChild({parentId: parent.id, childId: elementId}))
    closeModal();
  }

  return (
    <Modal title="Элементы" className="w-[800px]" {...props} closeModal={closeModal}>
      <div className="w-full">
        <div className="mb-[15px]">
          <ElLibList createElement={createElement}/>
        </div>
      </div>
    </Modal>
  )
}
