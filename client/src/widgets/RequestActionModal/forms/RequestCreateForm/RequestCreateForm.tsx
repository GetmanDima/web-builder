import { RootState, useAppDispatch } from "@app";
import { Group } from "@shared/ui";
import { useSelector } from "react-redux";
import { TableSelect } from "@features";
import {
  ApiRequestCreateAction,
  setCurrRequestAction,
} from "@entities/Api/model/apiReducer";
import { TableFieldItem } from "../../formParts/TableFieldItem/TableFieldItem";

export const RequestCreateForm = () => {
  const dispatch = useAppDispatch();
  const { tables } = useSelector((state: RootState) => state.db);
  const action = useSelector(
    (state: RootState) => state.api.currRequestAction
  ) as ApiRequestCreateAction | undefined;
  const table = tables.find((t) => t.name === action?.table);

  if (!action) {
    return null;
  }

  return (
    <div>
      <Group className='mb-[20px]'>
        <div className='mr-[20px] text-[16px]'>Таблица</div>
        <TableSelect
          selected={action.table}
          className='!w-[300px]'
          onSelectTable={(t) => {
            dispatch(
              setCurrRequestAction({
                ...action,
                table: t.name,
                fieldsMap: t.fields.reduce((res, field) => {
                  return {
                    ...res,
                    [field]: {
                      source: "",
                      value: "",
                    },
                  };
                }, {} as any),
              })
            );
          }}
        />
      </Group>
      <div className='mt-[30px] mb-[20px] text-center text-[15px]'>
        Значения полей
      </div>
      {table && (
        <div>
          {table.fields.map((field) => (
            <TableFieldItem
              fieldName={field}
              fieldValue={action.fieldsMap[field]}
              setFieldValue={({ source, value }) => {
                dispatch(
                  setCurrRequestAction({
                    ...action,
                    fieldsMap: {
                      ...action.fieldsMap,
                      [field]: {
                        source,
                        value,
                      },
                    },
                  })
                );
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
