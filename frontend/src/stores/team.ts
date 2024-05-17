import { atom, selector } from 'recoil'
import { TeamListType } from '@/types/TeamListType'

const defaultSelectedTeam = {
  teamName: '',
  teamAlbumId: NaN,
  teamSize: NaN,
  cardSize: NaN,
}

export const selectedTeamAlbumIdState = atom<TeamListType>({
  key: 'selectedTeamAlbumIdState',
  default: defaultSelectedTeam,
})

export const hasSelectedTeam = selector({
  key: 'hasSelectedTeam',
  get: ({ get }) => {
    const selectedTeam = get(selectedTeamAlbumIdState)
    return selectedTeam.teamName !== ''
  },
})

export const pageChanged = atom<boolean>({
  key: 'pageChanged',
  default: false,
})

export const isLookingMemberState = atom<boolean>({
  key: 'isLookingMember',
  default: false,
})
