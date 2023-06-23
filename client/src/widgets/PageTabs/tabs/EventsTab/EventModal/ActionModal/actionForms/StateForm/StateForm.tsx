import { defaultSourceGroupItems } from "@widgets/SourceFieldGroup";
import { GlobalStateInput, SourceFieldGroup } from "@features";
import { Group } from "@shared/ui";

interface StateFormProps {
  value: {
    name: string;
    source: string;
    newValue: string;
  };
  setValue: (v: any) => void;
}

export const StateForm = ({ value, setValue }: StateFormProps) => {
  return (
    <div>
      <Group className='mb-[20px]'>
        <div className='mr-[20px] text-[16px]'>Название состояния</div>
        <GlobalStateInput
          value={value.name}
          className='!w-[300px]'
          onSelectValue={(name) => setValue({ ...value, name })}
        />
      </Group>
      <SourceFieldGroup
        source={value.source}
        value={value.newValue}
        items={[
          ...defaultSourceGroupItems,
          {
            sourceTitle: "Значение элемента",
            sourceValue: "eventValue",
            value: "eventValue",
          },
        ]}
        onChange={({source, value: newValue}) => {
          setValue({...value, source, newValue});
        }}
      />
    </div>
  );
};
