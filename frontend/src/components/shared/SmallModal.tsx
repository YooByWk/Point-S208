/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
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
import { useState } from 'react'
import { Colors } from '@/styles/colorPalette'
import * as s from './LargeModal.styled'
import Text from '@shared/Text'
import LargeButton from '@/components/shared/LargeButton'
import useWindowSize from '@/hooks/useWindowSize'
import { ReactElement } from 'react';
import {
  Delete24Filled,
} from '@fluentui/react-icons'
interface SmallModalProps {
  dialogTitle: string
  dialogContent: ReactNode | string
  onClick: () => void
  bgColor?: Colors
  closeButtonText?: string
  actionButtonText: string
  height?: string
  btnWidth?: string
  icon?: ReactElement
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
}) => {
  const screenSize = useWindowSize()
  return (
    <Dialog modalType="alert">
      <DialogTrigger disableButtonEnhancement>
        {icon}
      </DialogTrigger>
      <DialogSurface>
        <DialogBody css={s.largeModalBody({ height })}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            {typeof dialogContent === 'string' ? (
              <Text typography='t9'>{dialogContent}</Text>
            ) : (
              dialogContent
            )}
            {/* 필요한 것 있으면 여기에 넣을 수 있게 수정 */}
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
                  {closeButtonText ? closeButtonText : '닫기'}{' '}
                </Button>
              </DialogTrigger>
            </DialogActions>
          ) : (
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">
                  {closeButtonText ? closeButtonText : '닫기'}{' '}
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

export default SmallModal
