import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@app";
import {
  TableFieldsMultiSelect,
  TableFieldsSelect,
  TableSelect,
} from "@features";
import {
  ApiRequestGetAction,
  setCurrRequestAction,
} from "@entities/Api/model/apiReducer";
import { Table } from "@entities/Db/model/dbReducer";
import { Group } from "@shared/ui";

export const JoinForm = () => {
  const dispatch = useAppDispatch();
  const action = useSelector(
    (state: RootState) => state.api.currRequestAction
  ) as ApiRequestGetAction | undefined;

  if (!action) {
    return null;
  }

  const joinData = action.join;

  const defaultJoin = {
    table: "",
    fields: [],
    conditions: [],
  };

  const selectTable = (table: Table) => {
    const newJoin = { ...defaultJoin, table: table.name };
    dispatch(setCurrRequestAction({ ...action, join: newJoin }));
  };

  const checkFields = (fields: string[]) => {
    const newJoin = joinData
      ? { ...joinData, fields }
      : { ...defaultJoin, fields };
    dispatch(setCurrRequestAction({ ...action, join: newJoin }));
  };

  return (
    <div>
      <Group className='mb-[20px]'>
        <div className='mr-[20px] text-[16px]'>Таблица</div>
        <TableSelect
          selected={joinData?.table}
          className='!w-[300px]'
          onSelectTable={selectTable}
        />
      </Group>
      {joinData?.table && (
        <Group className='mb-[20px]'>
          <div className='mr-[20px] text-[16px]'>Поля</div>
          <TableFieldsMultiSelect
            tableName={joinData?.table}
            checked={joinData?.fields}
            className='!w-[300px]'
            placeholder='Выберите поля'
            onCheckFields={checkFields}
          />
        </Group>
      )}
      {action.join?.table && (
        <>
          <Group className='mb-[20px]'>
            <div className='mr-[20px] text-[16px]'>{`Поле (${action.table})`}</div>
            <TableFieldsSelect
              tableName={action.table}
              selected={action.join.localField}
              className='!w-[300px]'
              onSelectField={(field: string) => {
                dispatch(
                  setCurrRequestAction({
                    ...action,
                    join: { ...action.join, localField: field },
                  })
                );
              }}
            />
          </Group>
          <Group className='mb-[20px]'>
            <div className='mr-[20px] text-[16px]'>{`Поле (${action.join.table})`}</div>
            <TableFieldsSelect
              tableName={action.join.table}
              selected={action.join.foreignField}
              className='!w-[300px]'
              onSelectField={(field: string) => {
                dispatch(
                  setCurrRequestAction({
                    ...action,
                    join: { ...action.join, foreignField: field },
                  })
                );
              }}
            />
          </Group>
        </>
      )}
    </div>
  );
};
