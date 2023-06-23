import { RootState } from "@app";
import { SelectField, SelectFieldProps } from "@shared/ui";
import { useSelector } from "react-redux";
import { Table } from "@entities/Db/model/dbReducer";

export interface TableSelectProps
  extends Omit<SelectFieldProps, "items" | "onSelectValue"> {
  onSelectTable: (table: Table) => void;
}

export const TableSelect = ({
  selected,
  onSelectTable,
  ...props
}: TableSelectProps) => {
  const { tables } = useSelector((state: RootState) => state.db);

  const tableItems = tables.map((table) => {
    return {
      title: table.name,
      value: table.name,
    };
  });

  const selectTable = (tableName: string) => {
    const table = tables.find((t) => t.name === tableName);

    if (table) {
      onSelectTable(table);
    }
  };

  return (
    <SelectField
      items={tableItems}
      selected={selected}
      onSelectValue={(v) => selectTable(v as string)}
      {...props}
    />
  );
};
