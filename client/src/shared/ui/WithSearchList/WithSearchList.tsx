import { useState } from "react";
import { SearchField } from "@shared/ui";
import { List } from "./List/List";

export interface WithSearchListProps {
  items: { id: string | number; search: string; values: string[] }[];
  onItemClick: (itemId: string | number) => void;
  ItemComponent?: (props: {
    values: string[];
    onItemClick: () => void;
  }) => JSX.Element;
}

export const WithSearchList = ({
  items,
  onItemClick,
  ItemComponent,
}: WithSearchListProps) => {
  const [search, setSearch] = useState("");

  const listItems = items
    .filter((item) => item.search.includes(search))
    .map((item) => {
      return {
        id: item.id,
        values: item.values,
      };
    });

  return (
    <div className='text-white'>
      <div className='mb-[20px]'>
        <SearchField value={search} onChangeValue={setSearch} />
      </div>
      <List
        items={listItems}
        ItemComponent={ItemComponent}
        onItemClick={onItemClick}
      />
    </div>
  );
};
