import { Dispatch, SetStateAction } from 'react'

export type StringChildType = {
  text: string
  children: React.ReactNode
}

export type BooleanStateType = {
  value: boolean
  setValue: Dispatch<SetStateAction<boolean>>
}

export type ModalType = {
  children: React.ReactNode
  onClose: () => void
}
