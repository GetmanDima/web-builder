import { IMultiSelectItem } from "./type";

export function checkItems(items: IMultiSelectItem[], values: (string | number)[]) {
  return items.map((item) => { 
    return {
      ...item,
      checked: values.includes(item.value)
    }
  });
}