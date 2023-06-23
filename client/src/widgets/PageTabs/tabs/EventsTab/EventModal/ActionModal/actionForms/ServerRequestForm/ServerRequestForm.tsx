import { useSelector } from "react-redux";
import { GlobalStateInput, SourceFieldGroup } from "@features";
import { RootState } from "@app";
import { Group, SelectField } from "@shared/ui";
import { RequestVarList } from "./RequestVarList";

interface ServerRequestFormProps {
  value: {
    requestName: string;
    paramMatches: {
      [param: string]: {
        source: string;
        value: string;
      };
    };
    responseMatches: {
      [responseVar: string]: string;
    };
    successStates: { stateVar: string; source: string; value: string }[];
    errorStates: { stateVar: string; source: string; value: string }[];
  };
  setValue: (v: any) => void;
}

export const ServerRequestForm = ({
  value,
  setValue,
}: ServerRequestFormProps) => {
  const requests = useSelector((state: RootState) => state.api.requests);
  const requestItems = requests.map((request) => {
    return {
      title: request.name,
      value: request.name,
    };
  });
  const selectedRequest = requests.find((r) => r.name === value.requestName);
  const params = selectedRequest?.params ?? [];
  const responseVars = selectedRequest?.response?.vars ?? [];

  const paramComponents = params.map((param) => {
    const match = value.paramMatches[param] ?? {
      source: "",
      value: "",
    };

    return (
      <div>
        <div className='mt-[30px] mb-[20px] text-center text-[15px]'>
          {param}
        </div>
        <SourceFieldGroup
          source={match.source}
          value={match.value}
          onChange={({ source, value: v }) => {
            setValue({
              ...value,
              paramMatches: {
                ...value.paramMatches,
                [param]: {
                  source,
                  value: v,
                },
              },
            });
          }}
        />
      </div>
    );
  });

  const responseComponents = responseVars.map((v) => {
    const stateVar = value.responseMatches
      ? value.responseMatches[v] ?? ""
      : "";

    return (
      <Group className='mb-[20px]'>
        <div className='mr-[20px] text-[16px]'>{v}</div>
        <GlobalStateInput
          value={stateVar}
          className='!w-[300px]'
          onSelectValue={(newStateVar) => {
            setValue({
              ...value,
              responseMatches: {
                ...value.responseMatches,
                [v]: newStateVar,
              },
            });
          }}
        />
      </Group>
    );
  });

  return (
    <div>
      <Group className='mb-[20px]'>
        <div className='mr-[20px] text-[16px]'>Запрос</div>
        <SelectField
          selected={value.requestName}
          items={requestItems}
          className='!w-[300px]'
          onSelectValue={(v) =>
            setValue({
              requestName: v,
              paramMatches: {},
              responseStateVar: "",
              successStates: [],
              errorStates: [],
            })
          }
        />
      </Group>
      {selectedRequest && (
        <>
          <div className='mt-[30px] mb-[20px] text-center text-[15px]'>
            Данные запроса
          </div>
          {paramComponents}
          <div className='mt-[30px] mb-[20px] text-center text-[15px]'>
            Данные ответа
          </div>
          {responseComponents}
          <div className='mt-[30px] mb-[20px] text-center text-[15px]'>
            Успешный запрос
          </div>
          <RequestVarList
            values={value.successStates}
            setValues={(v) => setValue({ ...value, successStates: v })}
          />
          <div className='mt-[30px] mb-[20px] text-center text-[15px]'>
            Ошибка запроса
          </div>
          <RequestVarList
            values={value.errorStates}
            setValues={(v) => setValue({ ...value, errorStates: v })}
          />
        </>
      )}
    </div>
  );
};
