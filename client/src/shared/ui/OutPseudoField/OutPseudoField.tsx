import classNames from "classnames";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

export interface OutPseudoFieldProps {
  value?: string;
  className?: string;
  onOutClick?: () => void
}

export const OutPseudoField = ({
  value = "",
  className,
  onOutClick
}: OutPseudoFieldProps) => {
  return (
    <div className='flex justify-between items-center relative'>
      <input
        className={classNames([
          "w-full h-[40px] pl-[10px] pr-[40px] py-2 border border-white border-solid bg-gray-900 text-[14px] text-white focus:border-blue-200 focus:outline-none",
          className,
        ])}
        value={value}
        disabled
      />
      <ArrowOutwardIcon className='cursor-pointer absolute right-[10px]' style={{fill: 'white'}} onClick={onOutClick} />
    </div>
  );
};
