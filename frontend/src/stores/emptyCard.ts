import { atom } from 'recoil'

export const writeInfoState = atom({
  key: 'writeInfoState',
  default: false,
})

export const cameraState = atom({
  key: 'cameraState',
  default: false,
})

// 명함 지갑 or 팀 명함 지갑 구분
export const isAlbumState = atom({
  key: 'isAlbumState',
  default: true,
})
