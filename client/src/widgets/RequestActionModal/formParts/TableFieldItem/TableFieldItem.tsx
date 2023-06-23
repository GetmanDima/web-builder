import { SourceFieldGroup } from "@features";

interface TableFieldItemProps {
  fieldName: string;
  fieldValue: {
    source: string;
    value: string;
  };
  setFieldValue: (v: { source: string; value: string }) => void;
}

export const TableFieldItem = ({
  fieldName,
  fieldValue,
  setFieldValue
}: TableFieldItemProps) => {
  return (
    <div>
      <div className='mb-[20px] text-center text-[15px]'>{fieldName}</div>
      <div className='mb-[20px]'>
        <SourceFieldGroup
          source={fieldValue.source}
          items={[
            {
              sourceTitle: "Параметр запроса",
              sourceValue: "requestParam",
              value: '',
            },
            {
              sourceTitle: "JSON",
              sourceValue: "json",
              value: '""',
            },
            {
              sourceTitle: "Строка",
              sourceValue: "string",
              value: "",
            },
          ]}
          value={fieldValue.value}
          onChange={({ source, value }) => {
            setFieldValue({ ...fieldValue, source, value });
          }}
        />
      </div>
    </div>
  );
};
