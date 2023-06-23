import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { Modal } from "../Modal/Modal";

export interface SuccessModalProps extends React.PropsWithChildren {
  visible: boolean,
  className?: string,
  closeModal: () => void;
}

export const SuccessModal = ({visible, closeModal, children, ...props}: SuccessModalProps) => {
  return (
    <Modal visible={visible} closeModal={closeModal} {...props}>
      <div className='flex flex-col justify-center items-center pb-[10px]'>
        <DoneOutlineIcon className='!w-[90px] !h-[90px]' style={{fill: '#22c55e'}}/>
        <div className='mt-[10px] text-center text-[15px]'>
          {children}
        </div>
      </div>
    </Modal>
  )
}
