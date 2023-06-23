import { RootState, useAppDispatch } from "@app";
import { Button, Group } from "@shared/ui";
import { useSelector } from "react-redux";
import { AdditionalItem } from "../../formParts/AdditionalItem/AdditionalItem";
import { TableFieldsMultiSelect, TableSelect } from "@features";
import { JoinForm } from "../../formParts/JoinForm/JoinForm";
import {
  ApiRequestGetAction,
  setCurrRequestAction,
} from "@entities/Api/model/apiReducer";
import { AdditionConditionItem } from "../../formParts/AdditionalConditionItem/AdditionalConditionItem";

export const RequestGetForm = () => {
  const dispatch = useAppDispatch();
  const action = useSelector(
    (state: RootState) => state.api.currRequestAction
  ) as ApiRequestGetAction | undefined;

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
              setCurrRequestAction({ ...action, table: t.name, fields: [] })
            );
          }}
        />
      </Group>
      {action.table && (
        <Group className='mb-[20px]'>
          <div className='mr-[20px] text-[16px]'>Поля</div>
          <TableFieldsMultiSelect
            tableName={action.table}
            checked={action.fields}
            className='!w-[300px]'
            placeholder='Выберите поля'
            onCheckFields={(fields) => {
              dispatch(setCurrRequestAction({ ...action, fields }));
            }}
          />
        </Group>
      )}
      <div className='mt-[30px] mb-[20px] text-center text-[15px]'>
        Дополнительно
      </div>
      {action?.join && (
        <AdditionalItem
          title='Объединение'
          onRemove={() => {
            if (action) {
              dispatch(
                setCurrRequestAction({
                  ...action,
                  join: undefined,
                })
              );
            }
          }}
        >
          <JoinForm />
        </AdditionalItem>
      )}
      <AdditionConditionItem />
      <div className='my-[20px] flex justify-center items-center'>
        {!action?.join && (
          <Button
            text='Добавить объединение'
            className='mr-[10px]'
            onClick={() => {
              if (action) {
                dispatch(
                  setCurrRequestAction({
                    ...action,
                    join: { conditions: [], table: "", fields: [] },
                  })
                );
              }
            }}
          />
        )}
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
      </div>
    </div>
  );
};
