import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@app";
import { ApiActionCondition, ApiRequestEditAction, setCurrRequestAction } from "@entities/Api/model/apiReducer";
import { AdditionalItem } from "../AdditionalItem/AdditionalItem";
import { ConditionForm } from "../ConditionForm/ConditionForm";

export const AdditionConditionItem = () => {
  const dispatch = useAppDispatch();
  const action = useSelector((state: RootState) => state.api.currRequestAction) as ApiRequestEditAction | undefined;

  if (!action) {
    return null;
  }

  return (
    <>
      {action && action.conditions.length > 0 && (
        <div className='mt-[20px]'>
          <AdditionalItem
            title='Условие'
            onRemove={() => {
              if (action) {
                dispatch(
                  setCurrRequestAction({
                    ...action,
                    conditions: [],
                  })
                );
              }
            }}
          >
            <ConditionForm
              tableName={action.table}
              conditions={action.conditions}
              setConditions={(conditions: ApiActionCondition[]) => {
                dispatch(
                  setCurrRequestAction({
                    ...action,
                    conditions,
                  })
                );
              }}
            />
          </AdditionalItem>
        </div>
      )}
    </>
  );
};
