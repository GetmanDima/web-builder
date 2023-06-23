import { useSelector } from "react-redux";
import { currRequestSelector } from "@entities/Api/model/apiReducer";
import { SelectField, SelectFieldProps } from "@shared/ui";

export interface RequestParamSelectProps
  extends Omit<SelectFieldProps, "items" | "onSelectValue"> {
  onSelectParam: (param: string) => void;
}

export const RequestParamSelect = ({
  selected,
  onSelectParam,
  ...props
}: RequestParamSelectProps) => {
  const request = useSelector(currRequestSelector);

  if (!request) {
    return null;
  }

  const paramItems = request.params.map((param) => {
    return {
      title: param,
      value: param,
    };
  });

  return (
    <SelectField
      items={paramItems}
      selected={selected}
      onSelectValue={(v) => onSelectParam(v as string)}
      {...props}
    />
  );
};
