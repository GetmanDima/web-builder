import { useState } from "react";
import { Form, Button, Group, TextField } from "@shared/ui";
import { hasErrors } from "@shared/lib";
import { RootState, useAppDispatch } from "@app";
import { useSelector } from "react-redux";
import { addRequest } from "@entities/Api/model/apiReducer";

export const RequestForm = () => {
  const dispatch = useAppDispatch();

  const { requests } = useSelector((state: RootState) => state.api);

  const [name, setName] = useState("");
  const [errors, setErrors] = useState({
    name: false,
  });

  const validate = () => {
    return {
      name: name.length < 3 && !!requests.find((t) => t.name === name),
    };
  };

  const saveRequest = () => {
    const newErrors = validate();
    setErrors(newErrors);

    if (hasErrors(newErrors)) {
      return;
    }

    dispatch(
      addRequest({
        name,
        params: [],
        actions: [],
        response: { status: 200, vars: [] },
      })
    );
  };

  const changeName = (newName: string) => {
    setErrors({ ...errors, name: false });
    setName(newName);
  };

  return (
    <>
      <Form title='Новый запрос' className='h-[180px] !py-[10px]'>
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
          <Button text='Сохранить' onClick={saveRequest} />
        </div>
      </Form>
    </>
  );
};
