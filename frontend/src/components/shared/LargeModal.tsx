/** @jsxImportSource @emotion/react */
import { ReactNode } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from '@fluentui/react-components'
import { Colors } from '@/styles/colorPalette'
import * as s from './LargeModal.styled'
import Text from '@shared/Text'
import LargeButton from '@/components/shared/LargeButton'
import useWindowSize from '@/hooks/useWindowSize'

interface LargeModalProps {
  buttonText: string
  dialogTitle: string
  dialogContent: ReactNode | string
  onClick: () => void
  bgColor?: Colors
  closeButtonText?: string
  actionButtonText: string
  height?: string
  btnWidth?: string
}

const LargeModal: React.FC<LargeModalProps> = ({
  buttonText,
  dialogTitle,
  dialogContent,
  closeButtonText,
  actionButtonText,
  onClick,
  bgColor,
  height,
  btnWidth,
}) => {
  const screenSize = useWindowSize()
  return (
    <Dialog modalType="alert">
      <DialogTrigger disableButtonEnhancement>
        <LargeButton text={buttonText} width={btnWidth} />
      </DialogTrigger>
      <DialogSurface>
        <DialogBody css={s.largeModalBody({ height })}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            {typeof dialogContent === 'string' ? (
              <Text typography="t9">{dialogContent}</Text>
            ) : (
              dialogContent
            )}
          </DialogContent>
          {screenSize < 550 ? (
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="primary" onClick={onClick}>
                  {actionButtonText}
                </Button>
              </DialogTrigger>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">
                  {closeButtonText ? closeButtonText : '닫기'}
                </Button>
              </DialogTrigger>
            </DialogActions>
          ) : (
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">
                  {closeButtonText ? closeButtonText : '닫기'}
                </Button>
              </DialogTrigger>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="primary" onClick={onClick}>
                  {actionButtonText}
                </Button>
              </DialogTrigger>
            </DialogActions>
          )}
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}

export default LargeModal
