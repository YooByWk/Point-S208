import { atom } from 'recoil'

export const writeInfoState = atom({
  key: 'writeInfoState',
  default: false,
})

export const cameraState = atom({
  key: 'cameraState',
  default: false,
})