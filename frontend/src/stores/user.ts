import { UserType } from '@/types/userType'
import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
  key: 'currentUser',
  storage: localStorage,
})

const defaultUser = {
  userId: 0,
  name: '',
  email: '',
}

export const userState = atom<UserType>({
  key: 'userState',
  default: defaultUser,
  effects_UNSTABLE: [persistAtom],
})

export const isUserinStorageState = atom({
  key: 'isUserinStorageState',
  default: false,
})
