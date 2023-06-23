import {
  ApiRequestEditAction,
  setCurrRequestAction,
} from "@entities/Api/model/apiReducer";
import { RequestCreateForm } from "../RequestCreateForm/RequestCreateForm";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@app";
import { AdditionConditionItem } from "../../formParts/AdditionalConditionItem/AdditionalConditionItem";
import { Button } from "@shared/ui";

export const RequestEditForm = () => {
  const dispatch = useAppDispatch();
  const action = useSelector(
    (state: RootState) => state.api.currRequestAction
  ) as ApiRequestEditAction | undefined;

  if (!action) {
    return null;
  }

  return (
    <>
      <RequestCreateForm />
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
