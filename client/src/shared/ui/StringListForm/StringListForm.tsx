import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState, useEffect } from "react";
import { hasErrors } from "@shared/lib";
import { TextField, Button } from "@shared/ui";

export interface StringListFormProps {
  values: string[];
  saveValues: (values: string[]) => void;
}

export const StringListForm = ({ values, saveValues }: StringListFormProps) => {
  const [value, setValue] = useState("");
  const [currValues, setCurrValues] = useState(values);
  const [errors, setErrors] = useState({
    value: false,
  });

  useEffect(() => {
    setCurrValues(values);
    setValue("");
  }, [values]);

  const validate = () => {
    return {
      value: value.length < 1 || !!values.find((v) => v === value),
    };
  };

  const addValue = () => {
    const newErrors = validate();
    setErrors(newErrors);

    if (hasErrors(newErrors)) {
      return;
    }

    setCurrValues([...currValues, value]);
    setValue("");
  };

  const onSaveClick = () => {
    saveValues(currValues);
  };

  return (
    <>
      <div className='flex justify-between items-center'>
        <TextField
          error={errors.value}
          value={value}
          className='!w-[300px]'
          onChangeValue={setValue}
        />
        <Button text='Добавить' onClick={addValue} />
      </div>
      <div className='mt-[20px]'>
        {currValues.map((value) => (
          <div
            key={value}
            className='mb-[5px] p-[10px] flex items-center bg-black rounded border border-white border-solid'
          >
            {value}
            <DeleteOutlineIcon
              onClick={() =>
                setCurrValues(currValues.filter((v) => v !== value))
              }
              className='cursor-pointer ml-auto'
            />
          </div>
        ))}
      </div>
      <div className='mt-[30px] flex justify-end'>
        <Button text='Сохранить' onClick={onSaveClick} />
      </div>
    </>
  );
};
