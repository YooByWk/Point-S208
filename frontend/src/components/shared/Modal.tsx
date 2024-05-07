import { ModalType } from '@/types/commonType'
import styled from '@emotion/styled'

const Modal = ({ children, onClose }: ModalType) => {
  return (
    <>
      <BlackBox onClick={onClose} />
      <ContentBox>{children}</ContentBox>
    </>
  )
}

export default Modal

// style

const BlackBox = styled.div`
  position: fixed;
  z-index: 100;
  width: 100dvw;
  height: 100dvh;
  top: 0;
  background-color: #000;
  opacity: 0.3;
`

const ContentBox = styled.div`
  position: fixed;
  z-index: 101;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
