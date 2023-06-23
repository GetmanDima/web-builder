import { ISelectItem } from "./type";

export function findItem(items: ISelectItem[], value: string | number) {
  return items.find((item) => item.value === value);
}