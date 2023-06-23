import SettingsIcon from "@mui/icons-material/Settings";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@app";
import { ListItem, Modal } from "@shared/ui";
import { Table, editTable, removeTable } from "@entities/Db/model/dbReducer";
import { StringListForm } from "@shared/ui/StringListForm/StringListForm";
import { getCountLabel } from "@shared/lib";

interface TableListProps {
  selectTable: (tableName: string) => void;
}

export const TableList = ({ selectTable }: TableListProps) => {
  const dispatch = useAppDispatch();
  const { tables } = useSelector((state: RootState) => state.db);
  const [currTable, setCurrTable] = useState<Table>();

  const onEditClick = (table: Table) => {
    setCurrTable({ ...table });
  };

  const onDeleteClick = (table: Table) => {
    dispatch(removeTable(table.name));
  };

  const itemComponents = tables.map((table) => {
    const itemText = getCountLabel(table.fields.length, ['поле', 'поля', 'полей']);

    return (
      <>
        <ListItem className='w-[600px] mb-[10px]' key={table.name}>
          <div className='flex'>
            <div className='mr-[20px] text-[16px]'>{table.name}</div>
            <div className='text-[16px]'>{table.fields.length} {itemText}</div>
          </div>
          <div className='ml-auto flex items-center'>
            <SettingsIcon
              onClick={() => onEditClick(table)}
              className='cursor-pointer mr-[5px]'
            />
            <DeleteOutlineIcon
              onClick={() => onDeleteClick(table)}
              className='cursor-pointer'
            />
          </div>
        </ListItem>
        {currTable && (
          <Modal
            title={`Таблица "${currTable.name}"`}
            visible={true}
            className="w-[455px]"
            closeModal={() => setCurrTable(undefined)}
          >
            <StringListForm
              values={currTable.fields}
              saveValues={(fields) => {
                dispatch(editTable({ ...currTable, fields }));
                setCurrTable(undefined);
              }}
            />
          </Modal>
        )}
      </>
    );
  });

  return <div>{itemComponents}</div>;
};
