import { RootState } from "@app";
import { SelectField, SelectFieldProps } from "@shared/ui";
import { useSelector } from "react-redux";

export interface TableFieldsSelectProps
  extends Omit<SelectFieldProps, "items" | "onSelectValue"> {
  tableName: string;
  onSelectField: (field: string) => void;
}

export const TableFieldsSelect = ({
  tableName,
  selected,
  onSelectField,
  ...props
}: TableFieldsSelectProps) => {
  const { tables } = useSelector((state: RootState) => state.db);

  const table = tables.find((t) => t.name === tableName);
  let fieldItems =
    table?.fields.map((field) => {
      return {
        title: field,
        value: field,
      };
    }) ?? [];
  fieldItems = [...fieldItems, {title: '_id', value: '_id'}];

  return (
    <SelectField
      items={fieldItems}
      selected={selected}
      onSelectValue={(v) => onSelectField(v as string)}
      {...props}
    />
  );
};
