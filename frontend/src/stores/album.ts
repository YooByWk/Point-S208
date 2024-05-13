import { FilterType } from '@/types/FilterType'
import { atom } from 'recoil'

export const filterState = atom<FilterType>({
  key: 'filterState',
  default: {
    filterId: NaN,
    filterName: '',
  },
})

export const isAddCardByInfoState = atom({
  key: 'isAddCardByInfoState',
  default: false,
})
