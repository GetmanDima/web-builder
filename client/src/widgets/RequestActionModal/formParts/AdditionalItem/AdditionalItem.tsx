import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface AdditionalItemProps extends React.PropsWithChildren {
  title: string;
  onRemove: () => void
}

export const AdditionalItem = ({ title, children, onRemove }: AdditionalItemProps) => {
  return (
    <div className='w-full border border-white border-solid rounded'>
      <div className="flex">
        <div className='mb-[20px] inline-block bg-black p-[5px] rounded'>
          {title}
        </div>
        <DeleteOutlineIcon
          style={{ fill: "white" }}
          className='cursor-pointer'
          onClick={onRemove}
        />
      </div>
      <div className='px-[10px]'>{children}</div>
    </div>
  );
};
