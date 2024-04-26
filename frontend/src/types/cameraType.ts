import { Dispatch, SetStateAction } from 'react'

export type SwipeableImgType = {
  frontImgSrc: string
  backImgSrc: string
  isFront: boolean
  setIsFront: Dispatch<SetStateAction<boolean>>
}
