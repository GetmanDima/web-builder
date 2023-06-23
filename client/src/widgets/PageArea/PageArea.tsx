import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@app";
import { ElLibModal } from "@features";
import {
  currPageSelector,
  selectElement,
  selectedElementSelector,
  setElLibModalVisible,
} from "@entities/Page/model/pageReducer";
import { Button } from "@shared/ui";
import { PageItem } from "./PageItem";
import { BasicElement } from "@shared/model/type/front.type";

export const PageArea = () => {
  const dispatch = useAppDispatch();
  const page = useSelector(currPageSelector);
  const selectedElement = useSelector(selectedElementSelector);
  const pageElement = useSelector(currPageSelector);
  const elModalVisible = useSelector(
    (state: RootState) => state.page.elLibModalVisible
  );
  const elements = useSelector((state: RootState) => state.front.elements);

  useEffect(() => {
    if (page && !selectedElement) {
      dispatch(selectElement(page));
    }
  }, [page, selectedElement, dispatch]);

  function addElement() {
    dispatch(selectElement(page as BasicElement));
    dispatch(setElLibModalVisible(true));
  }

  if (!page || !pageElement) {
    return <div>not found</div>;
  }

  const childComponents = pageElement.children.map((childId) => (
    <PageItem
      key={childId}
      element={elements[childId]}
      selectElement={(el) => dispatch(selectElement(el))}
    />
  ));

  return (
    <div className='w-full h-full border border-gray-400'>
      <div>{childComponents}</div>
      <div>
        <Button text='Добавить' className='mt-3' onClick={addElement} />
        {selectedElement && (
          <ElLibModal
            parent={selectedElement}
            visible={elModalVisible}
            closeModal={() => dispatch(setElLibModalVisible(false))}
          />
        )}
      </div>
    </div>
  );
};
