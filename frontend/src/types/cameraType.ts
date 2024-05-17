import { Dispatch, SetStateAction } from 'react'
import { BooleanStateType } from './commonType'

export type SwipeableImgType = {
  frontImgSrc: File
  backImgSrc: File
  isFront: boolean
  setIsFront: Dispatch<SetStateAction<boolean>>
}

export type PhotoAddType = {
  isFront: boolean
} & BooleanStateType
