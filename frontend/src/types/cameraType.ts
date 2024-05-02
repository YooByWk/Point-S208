import { Dispatch, SetStateAction } from 'react'
import { BooleanStateType } from './commonType'

export type SwipeableImgType = {
  frontImgSrc: string
  backImgSrc: string
  isFront: boolean
  setIsFront: Dispatch<SetStateAction<boolean>>
}

export type PhotoAddType = {
  isFront: boolean
} & BooleanStateType