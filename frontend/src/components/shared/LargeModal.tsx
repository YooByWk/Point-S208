/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { CSSProperties } from 'react'
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
import * as s from './LargeModal.styled';

interface LargeModalProps {
  buttonText: string
  dialogTitle: string
  dialogContent: string
  onClick: () => void
  bgColor?: Colors
  closeButtonText?: string
  actionButtonText: string
  height?: string
}

/**
 * 뭔가 뭔가
 * @returns
 */
const LargeModal: React.FC<LargeModalProps> = (
  {
    buttonText,
    dialogTitle,
    dialogContent,
    closeButtonText,
    actionButtonText,
    onClick,
    bgColor,
    height,
  
  }
) => {
  return (
    <Dialog modalType='alert'>
      <DialogTrigger disableButtonEnhancement>
        <Button appearance='primary' css={s.largeModalButton}>{buttonText}</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody css={s.largeModalBody({height})}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent >{dialogContent}
          {/* 필요한 것 있으면 여기에 넣을 수 있게 수정 */}
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">{closeButtonText? closeButtonText : "닫기"}</Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
            <Button appearance="primary" onClick={onClick} >{actionButtonText}</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}

export default LargeModal

