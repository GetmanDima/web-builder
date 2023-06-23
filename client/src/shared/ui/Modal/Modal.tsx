import { useRef } from "react";
import classNames from "classnames";
import CloseIcon from "@mui/icons-material/Close";
import { getWrapperEventCb } from "@shared/lib";

export interface ModalProps
  extends React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">> {
  visible: boolean;
  title?: string;
  closeModal: () => void;
}

export const Modal = ({
  visible,
  title = "",
  closeModal,
  children,
  className,
  ...props
}: ModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  function onClickOverlay(e: React.MouseEvent<HTMLDivElement>) {
    getWrapperEventCb(closeModal, [contentRef.current as HTMLElement])(e);
  }

  return (
    <div
      style={{ display: visible ? "block" : "none" }}
      className='fixed z-[1000] top-0 left-0 w-full h-full overflow-auto bg-white bg-opacity-40'
      onMouseDown={onClickOverlay}
    >
      <div className='w-full h-full py-[10px] flex justify-center items-center'>
        <div
          className={classNames(
            "w-[200px] m-auto py-[15px] px-[20px] pt-1 relative border border-gray-900 border-solid rounded bg-gray-700 text-white",
            className
          )}
          ref={contentRef}
          {...props}
        >
          <div className='text-[18px] mt-[8px] mb-[20px]'>{title}</div>
          <div className='mt-2'>{children}</div>
          <div className='absolute top-[10px] right-[10px]'>
            <button onClick={closeModal}>
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
