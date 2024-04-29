import { userType } from '@/types/userType'
import { atom } from 'recoil'

const defaultUser = {
  userId: '',
  name: '',
  email: '',
}

export const userState = atom<userType>({
  key: 'userState',
  default: defaultUser,
})
