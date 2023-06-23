import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';
import { ElParam } from "@shared/model/type/front.type"
import { Modal, StringListForm, TextField } from "@shared/ui"

interface MenuEditorProps {
  param: ElParam,
  onChange: (param: ElParam) => void,
}

export const MenuEditor = ({param, onChange}: MenuEditorProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const items = param.value ? JSON.parse(param.value) : [];
  const itemNames = items.map((c: any) => c.label);

  const saveValues = (values: string[]) => {
    onChange({
      ...param,
      value: JSON.stringify(values.map((v) => {
        return {
          key: v,
          label: v
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
          value={items.length.toString() + ' пунктов'}
          className='!w-[180px] ml-auto'
        />
        <button className="ml-[20px]" onClick={() => setModalVisible(true)}>
          <SettingsIcon />
        </button>
      </div>
      <Modal
        title="Редактирование пунктов меню"
        visible={modalVisible}
        className='w-[455px]'
        closeModal={() => setModalVisible(false)}
      >
        <StringListForm values={itemNames} saveValues={saveValues} />
      </Modal>
    </>
  )
}
