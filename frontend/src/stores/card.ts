import { CardType } from '@/types/cardType'
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

export const isRealState = atom({
  key: 'isRealState',
  default: true,
})

export const isFirstCardState = atom({
  key: 'isFirstCardState',
  default: false,
})
