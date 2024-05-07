import WebAlbumDetail from '@/components/web/WebAlbum/WebAlbumDetail'
import WebEditOtherCardInfo from '@/components/web/WebAlbum/WebEditOtherCardInfo'
import { CardType } from '@/types/cardType'
import WebAlbumTopBar from '@components/web/WebAlbum/WebAlbumTopBar'
import WebMyAlbumList from '@components/web/WebAlbum/WebMyAlbumList'
import { useState } from 'react'

const WebAlbum = () => {
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [isDetail, setIsDetail] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [cards, setCards] = useState<CardType[]>([])

  const renderContent = () => {
    if (editOpen) {
      return <WebEditOtherCardInfo setEditOpen={setEditOpen} />
    }
    if (isDetail) {
      return (
        <WebAlbumDetail
          setIsDetail={setIsDetail}
          editOpen={editOpen}
          setEditOpen={setEditOpen}
        />
      )
    }

    return (
      <>
        <WebAlbumTopBar
          selectedCards={selectedCards}
          allCards={cards}
          setSelectedCards={setSelectedCards}
        />
        <WebMyAlbumList
          cards={cards}
          setCards={setCards}
          selectedCards={selectedCards}
          setSelectedCards={setSelectedCards}
          setIsDetail={setIsDetail}
        />
      </>
    )
  }

  return <>{renderContent()}</>
}

export default WebAlbum
