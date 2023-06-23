import { ListItem } from "./ListItem/ListItem";

export interface ListProps {
  items: {
    id: string | number;
    values: string[];
  }[];
  ItemComponent?: (props: {values: string[], onItemClick: () => void}) => JSX.Element;
  onItemClick: (itemId: string | number) => void;
}

export const List = ({
  items,
  ItemComponent,
  onItemClick,
}: ListProps) => {
  const itemComponents = items.map((item) => (
    <div key={item.id} className='mb-[15px]'>
      {ItemComponent ? (
        <ItemComponent
          values={item.values}
          onItemClick={() => onItemClick(item.id)}
        />
      ) : (
        <ListItem
          values={item.values}
          onItemClick={() => onItemClick(item.id)}
        />
      )}
    </div>
  ));

  return <div>{itemComponents}</div>;
};
