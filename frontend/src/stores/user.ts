import { UserType } from '@/types/userType'
import { atom } from 'recoil'

const defaultUser = {
  id: 0,
  name: '',
  email: '',
}

export const userState = atom<UserType>({
  key: 'userState',
  default: defaultUser,
})
