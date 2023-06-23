import {
  ApiRequestEditAction,
  setCurrRequestAction,
} from "@entities/Api/model/apiReducer";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@app";
import { AdditionConditionItem } from "../../formParts/AdditionalConditionItem/AdditionalConditionItem";
import { Button, Group } from "@shared/ui";
import { TableSelect } from "@features";

export const RequestRemoveForm = () => {
  const dispatch = useAppDispatch();
  const action = useSelector(
    (state: RootState) => state.api.currRequestAction
  ) as ApiRequestEditAction | undefined;

  if (!action) {
    return null;
  }

  return (
    <>
      <Group className='mb-[20px]'>
        <div className='mr-[20px] text-[16px]'>Таблица</div>
        <TableSelect
          selected={action.table}
          className='!w-[300px]'
          onSelectTable={(t) => {
            dispatch(
              setCurrRequestAction({ ...action, table: t.name, fields: [] })
            );
          }}
        />
      </Group>
      <AdditionConditionItem />
      {action && action.conditions.length === 0 && (
        <div className='flex justify-center'>
          <Button
            text='Добавить условие'
            onClick={() => {
              if (action) {
                dispatch(
                  setCurrRequestAction({
                    ...action,
                    conditions: [
                      {
                        id: 1,
                        joinOperator: "",
                        field: "",
                        sign: "",
                        source: "",
                        value: "",
                      },
                    ],
                  })
                );
              }
            }}
          />
        </div>
      )}
    </>
  );
};
