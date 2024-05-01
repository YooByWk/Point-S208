import { atom , selector} from 'recoil'
import { TeamListType} from '@/types/TeamListType';

const defaultSelectedTeam = {
  teamName: '',
  teamId: NaN ,
  teamSize: NaN,
  cardSize: NaN,
}

export const selectedTeamIdState = atom<TeamListType>({
  key: 'selectedTeamIdState',
  default: defaultSelectedTeam,
})

export const hasSelectedTeam = selector({
  key: 'hasSelectedTeam',
  get: ({get}) => {
    const selectedTeam = get(selectedTeamIdState)
    return selectedTeam.teamName !== ''
  }
})

export const pageChanged = atom<boolean>({
  key: 'pageChanged',
  default: false,
})

