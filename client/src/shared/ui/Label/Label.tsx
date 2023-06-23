import classNames from "classnames";

export interface LabelProps {
  text: string;
  className?: string;
}

export const Label = ({
  text,
  className
}: LabelProps) => {
  return (
    <label className={classNames("block", className)}>{text}</label>
  );
};
