import { CardType } from '@/types/cardType'
import { atom } from 'recoil'

const defaultCard = {
  cardId: 0,
  userId: 0,
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
  createdAt: '',
  updateAt: '',
}

export const cardState = atom<CardType>({
  key: 'cardState',
  default: defaultCard,
})
