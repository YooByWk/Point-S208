import type { CardType } from '@/types/cardType'

export type CardListType = {
  private_album_detail_id: number
  cards: CardType[]
}[]