import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';
import { ElParam } from "@shared/model/type/front.type"
import { Modal, StringListForm, TextField } from "@shared/ui"

interface TableColumnEditorProps {
  param: ElParam,
  onChange: (param: ElParam) => void,
}

export const TableColumnEditor = ({param, onChange}: TableColumnEditorProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const columns = param.value ? JSON.parse(param.value) : [];
  const columnNames = columns.map((c: any) => c.title);

  const saveValues = (values: string[]) => {
    onChange({
      ...param,
      value: JSON.stringify(values.map((v) => {
        return {
          key: v,
          title: v,
          dataIndex: v,
        }
      }))
    });

    setModalVisible(false);
  }

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='mr-[10px]'>{param.name}</div>
        <TextField
          disabled={true}
          value={columns.length.toString() + ' колонки'}
          className='!w-[180px] ml-auto'
        />
        <button className="ml-[20px]" onClick={() => setModalVisible(true)}>
          <SettingsIcon />
        </button>
      </div>
      <Modal
        title="Редактирование столбцов"
        visible={modalVisible}
        className='w-[455px]'
        closeModal={() => setModalVisible(false)}
      >
        <StringListForm values={columnNames} saveValues={saveValues} />
      </Modal>
    </>
  )
}
