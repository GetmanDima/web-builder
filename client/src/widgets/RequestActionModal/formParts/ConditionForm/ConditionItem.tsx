import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { SourceFieldGroup, TableFieldsSelect } from "@features";
import { ApiActionCondition } from "@entities/Api/model/apiReducer";
import { Group, SelectField } from "@shared/ui";

interface ConditionItemProps {
  tableName: string;
  condition: ApiActionCondition;
  sourceConfig?: { table: string };
  setCondition: (condition: ApiActionCondition) => void;
  removeCondition: () => void;
}

export const ConditionItem = ({
  tableName,
  condition,
  sourceConfig,
  setCondition,
  removeCondition,
}: ConditionItemProps) => {
  const signItems = [
    {
      title: "Больше",
      value: ">",
    },
    {
      title: "Меньше",
      value: "<",
    },
    {
      title: "Равно",
      value: "=",
    },
    {
      title: "Не равно",
      value: "!=",
    },
  ];

  const joinOperatorDict: { [key: string]: string } = {
    "": "Первое условие",
    and: "И",
    or: "ИЛИ",
  };

  return (
    <div>
      <div className='flex justify-center mb-[15px]'>
        <div className='inline-block bg-black p-[5px] rounded'>
          {joinOperatorDict[condition.joinOperator]}
        </div>
        <DeleteOutlineIcon
          style={{ fill: "white" }}
          className='cursor-pointer'
          onClick={removeCondition}
        />
      </div>
      <Group className='mb-[20px]'>
        <div className='mr-[20px] text-[16px] max-w-[90px] overflow-hidden'>
          Поле ({tableName})
        </div>
        <TableFieldsSelect
          tableName={tableName}
          selected={condition.field}
          className='!w-[300px]'
          onSelectField={(field) => setCondition({ ...condition, field })}
        />
      </Group>
      <Group className='mb-[20px]'>
        <div className='mr-[20px] text-[16px] max-w-[90px] overflow-hidden'>
          Сравнение
        </div>
        <SelectField
          items={signItems}
          selected={condition.sign}
          className='!w-[300px]'
          onSelectValue={(v) =>
            setCondition({ ...condition, sign: v as string})
          }
        />
      </Group>
      <div className='mb-[20px]'>
        <SourceFieldGroup
          source={condition.source}
          items={[
            {
              sourceTitle: sourceConfig
                ? `Таблица (${sourceConfig.table})`
                : `Таблица (${tableName})`,
              sourceValue: "tableField",
              value: "",
            },
            {
              sourceTitle: "Параметр запроса",
              sourceValue: "requestParam",
              value: '',
            },
            {
              sourceTitle: "JSON",
              sourceValue: "json",
              value: '""',
            },
            {
              sourceTitle: "Строка",
              sourceValue: "string",
              value: "",
            },
          ]}
          value={condition.value}
          sourceConfig={sourceConfig}
          onChange={({ source, value }) => {
            setCondition({ ...condition, source, value });
          }}
        />
      </div>
    </div>
  );
};
