import { CardType } from '@/types/cardType'
import { ExternalCardType } from '@/types/ExternalCard'
import { atom } from 'recoil'

const defaultCard = {
  cardId: 0,
  name: '',
  company: '',
  position: '',
  rank: '',
  department: '',
  email: '',
  landlineNumber: '',
  faxNumber: '',
  phoneNumber: '',
  address: '',
  realPicture: '',
  digitalPicture: '',
  frontBack: '',
  domainUrl: '',
  memo: '',
}

export const frontCardState = atom<CardType>({
  key: 'frontCardState',
  default: defaultCard,
})

export const backCardState = atom<CardType>({
  key: 'backCardState',
  default: defaultCard,
})

export const isFrontState = atom({
  key: 'isFrontState',
  default: true,
})

export const isBackCardState = atom({
  key: 'isBackCardState',
  default: false,
})

export const isRealState = atom({
  key: 'isRealState',
  default: false,
})

export const isFirstCardState = atom({
  key: 'isFirstCardState',
  default: false,
})

export const selectedCardState = atom<CardType | ExternalCardType>({
  key: 'selectedCardState',
  default: defaultCard,
})

export const isRefreshedAlbumState = atom({
  key: 'isRefreshedAlbumState',
  default: false,
})
