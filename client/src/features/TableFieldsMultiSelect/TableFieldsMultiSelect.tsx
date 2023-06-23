import { RootState } from "@app";
import { MultiSelectField, MultiSelectFieldProps } from "@shared/ui";
import { useSelector } from "react-redux";

export interface TableFieldsMultiSelectProps
  extends Omit<MultiSelectFieldProps, "items" | "onCheckValues"> {
  tableName: string;
  onCheckFields: (fields: string[]) => void;
}

export const TableFieldsMultiSelect = ({
  tableName,
  checked,
  onCheckFields,
  ...props
}: TableFieldsMultiSelectProps) => {
  const { tables } = useSelector((state: RootState) => state.db);

  const table = tables.find((t) => t.name === tableName);
  const fieldItems =
    table?.fields.map((field) => {
      return {
        title: field,
        value: field,
      };
    }) ?? [];

  return (
    <MultiSelectField
      items={fieldItems}
      checked={checked}
      placeholder='Выберите поля'
      onCheckValues={(fields) => onCheckFields(fields as string[])}
      {...props}
    />
  );
};
