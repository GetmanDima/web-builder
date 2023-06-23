import { useAppDispatch } from "@app";
import { setElFinishCode, setElStartCode, setElWrapperCode } from "@entities/Front/model/frontReducer";
import { selectedElementSelector } from "@entities/Page/model/pageReducer";
import { BasicElement } from "@shared/model/type/front.type";
import { CodeTextAreaField, Group } from "@shared/ui";
import { TabWrapper } from "../../TabWrapper";
import { useSelector } from "react-redux";

export const CodeTab = () => {
  const dispatch = useAppDispatch();
  const selectedElement = useSelector(selectedElementSelector) as BasicElement | undefined;

  function changeStartCode(code: string) {
    if (selectedElement) {
      dispatch(setElStartCode({elementId: selectedElement.id, code}));
    }
  }

  function changeFinishCode(code: string) {
    if (selectedElement) {
      dispatch(setElFinishCode({elementId: selectedElement.id, code}));
    }
  }

  function changeWrapperCode(code: string) {
    if (selectedElement) {
      dispatch(setElWrapperCode({elementId: selectedElement.id, code}));
    }
  }

  return (
    <TabWrapper title='Код'>
      <Group className='mb-[20px] text-white'>
        <div className='mr-[20px] text-[16px]'>Код-обертка</div>
        <CodeTextAreaField value={selectedElement?.wrapperCode} onChangeValue={changeWrapperCode} />
      </Group>
      <Group className='mb-[20px] text-white'>
        <div className='mr-[20px] text-[16px]'>Начало</div>
        <CodeTextAreaField value={selectedElement?.startCode} onChangeValue={changeStartCode} />
      </Group>
      <Group className='mb-[20px] text-white'>
        <div className='mr-[20px] text-[16px]'>Конец</div>
        <CodeTextAreaField value={selectedElement?.finishCode} onChangeValue={changeFinishCode} />
      </Group>
    </TabWrapper>
  );
};
