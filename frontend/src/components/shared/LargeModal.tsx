import styled from '@emotion/styled'
import { CSSProperties } from 'react'
import { Dialog, DialogFooter, PrimaryButton, DefaultButton } from '@fluentui/react'
import { useState } from 'react'
import { Colors } from '@/styles/colorPalette'


interface LargeModalProps {
    func1: Function
    bgColor?: Colors
    isOpen: boolean
    
} 


/**
 * 뭔가 뭔가
 * @returns 
 */
const LargeModal: React.FC<LargeModalProps> =  () => {
  const [hideDialog, setHideDialog] = useState(true)
  
  return (
    <>
      
    </>
  )
}

export default LargeModal