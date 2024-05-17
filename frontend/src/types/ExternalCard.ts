export type ExternalCardType = {
  cardId: number
  name: string
  company: string
  position: string
  rank: string
  department: string
  email: string
  landlineNumber: string
  faxNumber: string
  phoneNumber: string
  address: string
  realPicture: string
  frontBack: string
  domainUrl: string
  digitalPicture?: string
  memo: string
}

export type ExternalCardListType = ExternalCardType[]

export type CombinedCardType = {
  cardId: number
  name: string
  company: string
  position: string
  rank: string
  department?: string
  email: string
  landlineNumber?: string
  landineNumber?: string
  faxNumber: string
  phoneNumber: string
  address: string
  realPicture: string
  digitalPicture?: string
  frontBack: string
  domainUrl: string
}
