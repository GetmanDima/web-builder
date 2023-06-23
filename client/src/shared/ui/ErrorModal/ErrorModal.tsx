import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Modal } from "../Modal/Modal";

export interface ErrorModalProps extends React.PropsWithChildren {
  visible: boolean,
  className?: string,
  closeModal: () => void;
}

export const ErrorModal = ({visible, closeModal, children, ...props}: ErrorModalProps) => {
  return (
    <Modal visible={visible} closeModal={closeModal} {...props}>
      <div className='flex flex-col justify-center items-center pb-[10px]'>
        <WarningAmberIcon className='!w-[90px] !h-[90px]' style={{fill: '#f87171'}}/>
        <div className='mt-[10px] text-center text-[15px]'>
          {children}
        </div>
      </div>
    </Modal>
  )
}
