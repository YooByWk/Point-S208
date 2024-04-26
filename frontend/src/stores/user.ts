import { userType } from '@/types/userType'
import { atom } from 'recoil'

const defaultUser = {
  name: '',
  email: '',
}

export const userState = atom<userType>({
  key: 'userState',
  default: defaultUser,
})
