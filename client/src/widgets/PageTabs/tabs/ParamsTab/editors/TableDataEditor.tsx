import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { ElParam } from "@shared/model/type/front.type";
import {
  Button,
  CodeTextField,
  Group,
  Modal,
  SelectField,
  TextField,
} from "@shared/ui";
import { ArrayStateVarMatch } from "@features";

interface TableDataEditorProps {
  paramsMap: { [key: string]: ElParam };
  param: ElParam;
  onChange: (param: ElParam) => void;
}

export const TableDataEditor = ({
  paramsMap,
  param,
  onChange,
}: TableDataEditorProps) => {
  const [currParam, setCurrParam] = useState(param);
  const [modalVisible, setModalVisible] = useState(false);

  const sourceItems = [
    {
      title: "Глобальное состояние",
      value: "global",
    },
    {
      title: "JSON",
      value: "json",
    },
  ];

  const columnsValue = paramsMap["columns"]?.value;
  const columns = columnsValue ? JSON.parse(columnsValue) : [];
  const columnNames = columns.map((c: any) => c.title) as string[];

  let data: any = {};

  if (currParam.source === "global") {
    data = currParam.value
      ? JSON.parse(currParam.value)
      : {
          selectedVar: "",
          matches: {},
        };
  }

  const matches =
    currParam.source === "global"
      ? columnNames.reduce((res, name) => {
          return {
            ...res,
            [name]: data.matches[name] ?? "",
          };
        }, {})
      : {};

  const changeConfigData = (config: {
    selectedVar: string;
    matches: { [key: string]: string };
  }) => {
    setCurrParam({
      ...currParam,
      source: "global",
      value: JSON.stringify({ ...config, type: "array" }),
    });
  };

  const changeSource = (source: string) => {
    let newValue = "";

    if (source === "json") {
      const rowValue: any = columnNames.reduce((res, name) => {
        return {
          ...res,
          [name]: "тест",
        };
      }, {});

      rowValue["key"] = "1";
      newValue = JSON.stringify([rowValue]);
    }

    setCurrParam({ ...param, source: source, value: newValue });
  };

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='mr-[10px]'>{param.name}</div>
        <TextField
          disabled={true}
          value={param.source}
          className='!w-[180px] ml-auto'
        />
        <button className='ml-[20px]' onClick={() => setModalVisible(true)}>
          <SettingsIcon />
        </button>
      </div>
      <Modal
        title='Редактирование данных таблицы'
        visible={modalVisible}
        className='w-[490px]'
        closeModal={() => setModalVisible(false)}
      >
        <Group className='mb-[20px]'>
          <div className='mr-[20px] text-[16px]'>Ресурс</div>
          <SelectField
            items={sourceItems}
            selected={currParam.source}
            className='!w-[300px]'
            onSelectValue={(v) => changeSource(v.toString())}
          />
        </Group>
        {currParam.source === "global" && (
          <ArrayStateVarMatch
            value={{
              selectedVar: data.selectedVar,
              matches: matches,
            }}
            onChange={changeConfigData}
          />
        )}
        {currParam.source === "json" && (
          <Group className='mb-[20px]'>
            <div className='mr-[20px] text-[16px]'>Значение</div>
            <CodeTextField
              value={currParam.value}
              lang="json"
              className='!w-[300px]'
              onChangeValue={(value) => {
                setCurrParam({
                  ...param,
                  source: "json",
                  value,
                });
              }}
            />
          </Group>
        )}
        <div className='mt-[20px] flex justify-end'>
          <Button
            text='Сохранить'
            onClick={() => {
              onChange(currParam);
              setModalVisible(false);
            }}
          />
        </div>
      </Modal>
    </>
  );
};
