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
}

export type WriteCardType = {
  userId: number
  data: cardInput
}

export type EditCardType = {
  cardId: number
} & WriteCardType

export type deleteCardType = {
  userId: number | undefined
}
