export type ExternalCardType = {
  cardId: number
  name: string
  company: string
  position: string
  rank: string
  email: string
  landineNumber: string
  faxNumber: string
  phoneNumber: string
  address: string
  realPicture: string
  frontBack: string
  domainUrl: string
  digitalPicture?: string
}

export type ExternalCardListType = ExternalCardType[]
