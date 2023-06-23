import { GlobalStateInput, TableFieldsSelect, RequestParamSelect } from "@features";
import { Group, SelectField, TextField, CodeTextField } from "@shared/ui";
import { defaultSourceGroupItems } from "./lib";

export interface SourceFieldGroupProps {
  source: string;
  value: string;
  items?: {
    sourceTitle: string;
    sourceValue: string;
    value: string;
  }[];
  sourceConfig?: {[key: string]: any};
  onChange: (data: { source: string; value: string }) => void;
}

export const SourceFieldGroup = ({
  source,
  value,
  items = defaultSourceGroupItems,
  sourceConfig,
  onChange,
}: SourceFieldGroupProps) => {
  let valueComponent = null;

  const listItems = items.map((item) => {
    return { title: item.sourceTitle, value: item.sourceValue };
  });

  if (source === "global") {
    valueComponent = (
      <GlobalStateInput
        value={value}
        className='!w-[300px]'
        onSelectValue={(value) => onChange({ source, value })}
      />
    );
  } else if (source === "code") {
    valueComponent = (
      <CodeTextField
        value={value}
        className='!w-[300px]'
        onChangeValue={(value) => onChange({ source, value })}
      />
    );
  } else if (source === "json") {
    valueComponent = (
      <CodeTextField
        value={value}
        lang='json'
        className='!w-[300px]'
        onChangeValue={(value) => onChange({ source, value })}
      />
    );
  } else if (source === "tableField") {
    valueComponent = (
      <TableFieldsSelect
        selected={value}
        className='!w-[300px]'
        tableName={sourceConfig?.table}
        onSelectField={(value) => onChange({ source, value })}
      />
    );
  } else if (source === "requestParam") {
    valueComponent = (
      <RequestParamSelect
        selected={value}
        className='!w-[300px]'
        onSelectParam={(value) => onChange({ source, value })}
      />
    );
  } else {
    valueComponent = (
      <TextField
        value={value}
        className='!w-[300px]'
        onChangeValue={(value) => onChange({ source, value })}
      />
    );
  }

  function changeSource(source: string) {
    const item = items.find((i) => i.sourceValue === source);
    onChange({ source, value: item?.value ?? "" });
  }

  return (
    <div>
      <Group className='mb-[20px]'>
        <div className='mr-[20px] text-[16px]'>Ресурс</div>
        <SelectField
          items={listItems}
          selected={source}
          className='!w-[300px]'
          onSelectValue={(v) => changeSource(v.toString())}
        />
      </Group>
      {source && (
        <Group>
          <div className='mr-[20px] text-[16px]'>Значение</div>
          {valueComponent}
        </Group>
      )}
    </div>
  );
};
