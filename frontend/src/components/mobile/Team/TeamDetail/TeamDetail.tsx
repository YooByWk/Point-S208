import { dummyCardList } from '@/assets/data/dummyCardList'
import BackArrow from '@/components/shared/BackArrow'
import CardList from '@/components/shared/CardList'
import { CardListType } from '@/types/CardListType'
import { CardType } from '@/types/cardType'
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { pageChanged } from '@stores/team'
import AddCard from '@/components/mobile/MyAlbum/AddCard'

const TeamDetail = () => {
  const cardList: CardListType = dummyCardList
  const cards: CardType[] = cardList[0].cards
  const isPageChanged = useRecoilValue(pageChanged)
  const [isAddCard, setIsAddCard] = useState(false)
  const hadnleAdd = () => {
    setIsAddCard(!isAddCard)
  }
  return (
    <>
      <div>
        {!isPageChanged && <BackArrow />}
        <CardList
          cardList={cardList}
          cards={cards}
          isTeam={true}
          handleAdd={hadnleAdd}
        />
      </div>
      {isAddCard && (
        <AddCard isAddCard={isAddCard} setIsAddCard={setIsAddCard} />
      )}
    </>
  )
}

export default TeamDetail
