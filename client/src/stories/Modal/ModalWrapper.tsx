import { Modal, SelectField } from "@shared/ui"
import { useEffect, useState } from "react"

interface ModalWrapperProps {
  visible: boolean,
  title?: string,
}

export const ModalWrapper = ({visible, title}: ModalWrapperProps) => {
  const [currVisible, setCurrVisible] = useState(visible);

  useEffect(() => {
    setCurrVisible(visible)
  }, [visible]);
  
  return (
    <div>
      <Modal title={title} visible={currVisible} closeModal={() => {setCurrVisible(false)}}>
        <SelectField items={[{title: 'hello', value: 'world'}]}/>
      </Modal>
    </div>
  )
}
