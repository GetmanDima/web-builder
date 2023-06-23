import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { RootState } from "@app";
import { CodeTextField, Modal, WithSearchList } from "@shared/ui";
import { GlobalStateListItem } from "./GlobalStateListItem";

export interface GlobalStateInputProps {
  value: string;
  excludedValues?: string[];
  className?: string;
  onSelectValue: (value: string) => void;
}

export const GlobalStateInput = ({
  value,
  excludedValues = [],
  onSelectValue,
  ...props
}: GlobalStateInputProps) => {
  const globalState =
    useSelector((state: RootState) => state.front.globalState) ?? {};
  const [currValue, setCurrValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setCurrValue(value);
  }, [value]);

  const tabItems = Object.keys(globalState ?? {})
    .filter((varName) => !excludedValues.includes(varName))
    .map((varName) => {
      const stateVar = globalState[varName];

      return {
        id: varName,
        values: [stateVar.name],
        search: stateVar.name,
      };
    });

  function changeValue(v: string) {
    setCurrValue(v);
    onSelectValue(v);
  }

  return (
    <div>
      <div className='relative'>
        <CodeTextField
          value={currValue}
          onChangeValue={changeValue}
          {...props}
        />
        <ArrowOutwardIcon
          className='cursor-pointer absolute top-[7px] right-[35px]'
          style={{ fill: "white" }}
          onClick={() => setModalVisible(true)}
        />
      </div>
      <Modal
        visible={modalVisible}
        title='Выберите глобальную переменную'
        className='!w-[540px]'
        closeModal={() => setModalVisible(false)}
      >
        <WithSearchList
          items={tabItems}
          ItemComponent={GlobalStateListItem}
          onItemClick={(varName) => {
            changeValue(`globalState['${varName}']`);
            setModalVisible(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default GlobalStateInput;
