/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { CSSProperties } from 'react'
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
import useWindowSize from '@/hooks/useWindowSize'
import { ReactElement } from 'react';
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'

interface SmallModalProps {
  dialogTitle: string
  dialogContent: ReactNode | string
  onClick: (() => void) | ((e:React.MouseEvent) => void)
  bgColor?: Colors
  closeButtonText?: string
  actionButtonText: string
  height?: string
  btnWidth?: string
  icon?: ReactElement
  onIconClick?: (() => void) | ((e:React.MouseEvent) => void)
}

/**
 * 뭔가 뭔가
 * @returns
 */
const SmallModal: React.FC<SmallModalProps> = ({
  icon,
  dialogTitle,
  dialogContent,
  closeButtonText,
  actionButtonText,
  onClick,
  bgColor,
  height,
  btnWidth,
  onIconClick
}) => {
  return (
    <Dialog modalType="alert">
      <DialogTrigger disableButtonEnhancement>
        <div onClick={onIconClick}>{icon}</div>
      </DialogTrigger>
      <DialogSurface css={surface}>
        <DialogBody css={body}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent css={content}>
            <Text typography='t9'>{dialogContent}</Text>
            <Spacing size={20} direction='vertical'/>
          {(
            <Flex direction='row' align='center' justify='center'>
              <DialogActions css={fui}>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="primary" onClick={onClick}>
                    {actionButtonText}
                  </Button>
                </DialogTrigger>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="secondary" onClick={onIconClick}>
                    {closeButtonText ? closeButtonText : '닫기'}{' '}
                  </Button>
                </DialogTrigger>
              </DialogActions>
            </Flex>
          )}
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}

export default SmallModal

const fui = css`
  display: flex;
  flex-direction: row;
  
  justify-content: space-evenly;
`

const body = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  width: fit-content;
  padding: 0;
  margin: 0;
`

const surface = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
`

const content = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  width: 100%;
  padding: 0;
  margin: 0;
`