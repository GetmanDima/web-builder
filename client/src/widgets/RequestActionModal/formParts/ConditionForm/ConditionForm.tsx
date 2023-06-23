import { ApiActionCondition } from "@entities/Api/model/apiReducer";
import { Button } from "@shared/ui";
import { ConditionItem } from "./ConditionItem";

interface ConditionFormProps {
  tableName: string;
  conditions: ApiActionCondition[];
  sourceConfig?: {table: string}
  setConditions: (conditions: ApiActionCondition[]) => void;
}

export const ConditionForm = ({
  tableName,
  conditions,
  sourceConfig,
  setConditions,
}: ConditionFormProps) => {
  const maxId = conditions.reduce(
    (res, condition) => (condition.id > res ? condition.id : res),
    0
  );

  const defaultCondition = {
    id: maxId + 1,
    joinOperator: "",
    field: "",
    sign: "",
    source: "",
    value: "",
  };

  const addCondition = (joinOperator: string) => {
    setConditions([...conditions, { ...defaultCondition, joinOperator }]);
  };

  const editCondition = (condition: ApiActionCondition) => {
    const newConditions = [...conditions];
    const index = newConditions.findIndex((c) => c.id === condition.id);
    newConditions[index] = condition;
    setConditions(newConditions);
  }

  const removeCondition = (condition: ApiActionCondition) => {
    const newConditions = conditions.filter((c) => c.id !== condition.id);

    if (newConditions.length > 0) {
      newConditions[0] = {...newConditions[0], joinOperator: ''};
    }

    setConditions(newConditions);
  }

  return (
    <div>
      <div>
        {conditions.map((condition) => (
          <ConditionItem
            key={condition.id}
            tableName={tableName}
            condition={condition}
            sourceConfig={sourceConfig}
            setCondition={editCondition}
            removeCondition={() => removeCondition(condition)}
          />
        ))}
      </div>
      <div className='mb-[20px] flex justify-center items-center'>
        {conditions.length > 0 ? (
          <>
            <Button
              text='И'
              className='mr-[10px]'
              onClick={() => addCondition("and")}
            />
            <Button text='ИЛИ' onClick={() => addCondition("or")} />
          </>
        ) : (
          <Button text='Добавить условие' onClick={() => addCondition("")} />
        )}
      </div>
    </div>
  );
};
