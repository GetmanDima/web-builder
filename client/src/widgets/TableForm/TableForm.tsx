import { useState } from "react";
import { RootState, useAppDispatch } from "@app";
import { addTable } from "@entities/Db/model/dbReducer";
import { Form, Button, Group, TextField } from "@shared/ui";
import { hasErrors } from "@shared/lib";
import { useSelector } from "react-redux";

export const TableForm = () => {
  const dispatch = useAppDispatch();
  
  const {tables} = useSelector((state: RootState) => state.db)

  const [name, setName] = useState("");
  const [errors, setErrors] = useState({
    name: false
  });

  const validate = () => {
    return {
      name: name.length < 3 && !!tables.find((t) => t.name === name)
    };
  };

  const saveTable = () => {
    const newErrors = validate();
    setErrors(newErrors);

    if (hasErrors(newErrors)) {
      return;
    }

    dispatch(addTable({name, fields: []}));
  }

  const changeName = (newName: string) => {
    setErrors({ ...errors, name: false });
    setName(newName);
  };

  return (
    <>
      <Form title='Новая таблица' className="h-[180px] !py-[10px]">
        <Group className='mb-[20px]'>
          <div className='mr-[20px] text-[16px]'>Название</div>
          <TextField
            error={errors.name}
            value={name}
            className='!w-[300px]'
            onChangeValue={changeName}
          />
        </Group>
        <div className='mt-[30px] flex justify-end'>
          <Button text='Сохранить' onClick={saveTable} />
        </div>
      </Form>
    </>
  );
};
