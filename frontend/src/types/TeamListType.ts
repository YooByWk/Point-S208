import { Dispatch, SetStateAction } from 'react'
import { BooleanStateType } from './commonType'
import { UserType } from './userType'
import { cardInput } from './cardInput'

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
    userList: number[]
  }
}

export type RegisterTeammCardType = {
  userId: number
  teamId: number
  data: cardInput
}

export type AddTeamMemberType = {
  userId: number
  teamId: number
  data: {
    userList: (number | undefined)[]
  }
}

export type TeamMemberInfoType = {
  userId: number
  email: string
  name: string
}

export type deleteTeamAlbumCardType = {
  userId: number
  teamAlbumId: number
  cardId: number
}

export type deleteTeamCardArrayType = {
  userId: number | undefined
  teamAlbumId: number | undefined
  cardIdArray: number[] | undefined[]
}
