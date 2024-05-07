export interface cardInput {
  name: string
  company: string
  position: string
  rank?: string
  department: string
  email: string
  landlineNumber: string
  faxNumber?: string
  phoneNumber: string
  address?: string
  domainUrl?: string
  frontBack?: string
  memo?: string
}

export type WriteCardType = {
  userId: number | undefined
  data: cardInput
}

export type EditCardType = {
  cardId: number
} & WriteCardType

export type deleteCardType = {
  userId: number | undefined
}

export type editAlbumCardType = {
  userId: number | undefined
  cardId: number | undefined
  data: cardInput
}

export type deleteAlbumCardType = {
  userId: number | undefined
  cardId: number | undefined
}

export type editMemoType = {
  userId: number | undefined
  cardId: number | undefined
  data: { memo: string }
}

export type deleteAlbumCardArrayType = {
  userId: number | undefined
  cardIdArray: number[] | undefined[]
}

