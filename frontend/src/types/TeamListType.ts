import { Dispatch, SetStateAction } from 'react'
import { BooleanStateType } from './commonType'
import { UserType } from './userType'

export type TeamListType = {
  teamName: string
  teamAlbumId: number
  teamSize: number
  cardSize: number
}

export type TeamAddType = {
  data: TeamListType[]
  refetch: any
} & BooleanStateType

export type TeamNameType = {
  name: string
  setName: Dispatch<SetStateAction<string>>
  setStage: Dispatch<SetStateAction<number>>
  data: TeamListType[]
}

export type TeamMemberType = {
  member: UserType[]
  setMember: Dispatch<SetStateAction<UserType[]>>
  setStage: Dispatch<SetStateAction<number>>
  onSkip: () => void
  onClick: () => void
}

export type CreateTeamSkipType = {
  userId: number
  data: {
    teamName: string
  }
}

export type CreateTeamType = {
  userId: number
  data: {
    teamName: string
    userIdList: number[]
  }
}
