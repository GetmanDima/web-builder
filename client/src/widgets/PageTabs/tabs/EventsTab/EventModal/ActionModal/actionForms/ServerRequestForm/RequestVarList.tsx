import { GlobalStateInput, SourceFieldGroup } from "@features";
import { Button, Group } from "@shared/ui";

interface RequestVarListProps {
  values: { stateVar: string; source: string; value: string }[];
  setValues: (
    values: { stateVar: string; source: string; value: string }[]
  ) => void;
}

export const RequestVarList = ({ values, setValues }: RequestVarListProps) => {
  const excludedVars = values.map((v) => v.stateVar);

  const itemComponents = values.map((value, i) => {
    return (
      <div className="mb-[20px]">
        <Group className="mb-[20px]">
          <div className='mr-[20px] text-[16px]'>Переменная</div>
          <GlobalStateInput
            value={value.stateVar}
            excludedValues={excludedVars}
            className='!w-[300px]'
            onSelectValue={(v) => {
              const newValues = [...values];
              const index = newValues.findIndex((v) => v.stateVar === value.stateVar);
              newValues[index] = {...value, stateVar: v}
              setValues(newValues);
            }}
          />
        </Group>
        <SourceFieldGroup
          source={value.source}
          value={value.value}
          onChange={({ source, value: v }) => {
            const newValues = [...values];
            const index = newValues.findIndex((v) => v.stateVar === value.stateVar);
            newValues[index] = {...value, source, value: v}
            setValues(newValues);
          }}
        />
      </div>
    );
  });

  return (
    <div>
      {itemComponents}
      <div className="mt-[20px] flex justify-center">
        <Button
          text='Добавить'
          onClick={() => {
            setValues([...values, { stateVar: "", source: "", value: "" }]);
          }}
        />
      </div>
    </div>
  );
};
