import { useState, useEffect } from "react";
import { Form, Button, Group, TextField } from "@shared/ui";

interface PageFormProps {
  data?: { title: string; path: string };
  onSave: (data: { title: string; path: string }) => void;
  onCancel?: () => void;
  onRemove?: () => void;
}

export const PageForm = ({
  data,
  onSave,
  onCancel,
  onRemove,
}: PageFormProps) => {
  const [title, setTitle] = useState("");
  const [path, setPath] = useState("");

  useEffect(() => {
    setTitle(data?.title ?? '');
      setPath(data?.path ?? '');
  }, [data]);

  function clearForm() {
    setTitle("");
    setPath("");
  }

  return (
    <Form title='Новая страница' className="h-[245px]">
      <Group className='mb-[20px]'>
        <div className='mr-[20px] text-[16px]'>Название</div>
        <TextField
          value={title}
          className='!w-[300px]'
          onChangeValue={setTitle}
        />
      </Group>
      <Group className='mb-[20px]'>
        <div className='mr-[20px] text-[16px]'>Путь</div>
        <TextField
          value={path}
          className='!w-[300px]'
          onChangeValue={setPath}
        />
      </Group>
      <div className='mt-[40px] flex justify-end'>
        {onCancel && (
          <Button
            theme='white'
            text='Отменить'
            className='mr-[10px]'
            onClick={() => {
              clearForm();
              onCancel()
            }}
          />
        )}
        {data && onRemove && (
          <Button
            theme='red'
            text='Удалить'
            className='mr-[10px]'
            onClick={() => onRemove()}
          />
        )}
        <Button text='Сохранить' onClick={() => onSave({ title, path })} />
      </div>
    </Form>
  );
};
