import GlobalStateInput from "@features/GlobalStateInput/GlobalStateInput";
import { Group, TextField } from "@shared/ui";

export interface ArrayStateVarMatchProps {
  value: {
    selectedVar: string;
    matches: {
      [key: string]: string;
    };
  };
  onChange: (value: {
    selectedVar: string;
    matches: { [key: string]: string };
  }) => void;
}

export const ArrayStateVarMatch = ({
  value,
  onChange,
}: ArrayStateVarMatchProps) => {
  const matchComponents = Object.keys(value.matches).map((key) => {
    return (
      <Group key={key} className='mb-[20px]'>
        <div className='mr-[20px] text-[16px]'>{key}</div>
        <TextField
          value={value.matches[key]}
          className='!w-[300px]'
          onChangeValue={(v) => {
            onChange({
              ...value,
              matches: {
                ...value.matches,
                [key]: v,
              },
            });
          }}
        />
      </Group>
    );
  });

  return (
    <div>
      <Group className='mb-[20px]'>
        <div className='mr-[20px] text-[16px]'>Переменная</div>
        <GlobalStateInput
          value={value.selectedVar}
          className='!w-[300px]'
          onSelectValue={(v) => {
            onChange({ ...value, selectedVar: v });
          }}
        />
      </Group>
      <div className='mt-[30px] mb-[20px] text-center text-[15px]'>
        Элемент массива (ключ: свойство элемента)
      </div>
      {matchComponents}
    </div>
  );
};
