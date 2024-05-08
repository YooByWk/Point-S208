import WebAlbumDetail from '@/components/web/WebAlbum/WebAlbumDetail'
import WebEditOtherCardInfo from '@/components/web/WebAlbum/WebEditOtherCardInfo'
import { CardType } from '@/types/cardType'
import { ExternalCardListType } from '@/types/ExternalCard'
import WebAlbumTopBar from '@components/web/WebAlbum/WebAlbumTopBar'
import WebMyAlbumList from '@components/web/WebAlbum/WebMyAlbumList'
import { useState } from 'react'

const WebAlbum = () => {
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [isDetail, setIsDetail] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [cards, setCards] = useState<CardType[]>([])
  const [searchResults, setSearchResults] = useState<
    ExternalCardListType | undefined
  >(undefined)
  const [searchValue, setSearchValue] = useState('')

  const renderContent = () => {
    if (editOpen) {
      return <WebEditOtherCardInfo setEditOpen={setEditOpen} />
    }
    if (isDetail) {
      return (
        <WebAlbumDetail setIsDetail={setIsDetail} setEditOpen={setEditOpen} />
      )
    }

    return (
      <>
        <WebAlbumTopBar
          selectedCards={selectedCards}
          allCards={cards}
          setSelectedCards={setSelectedCards}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <WebMyAlbumList
          cards={cards}
          setCards={setCards}
          selectedCards={selectedCards}
          setSelectedCards={setSelectedCards}
          setIsDetail={setIsDetail}
          searchResults={searchResults}
          searchValue={searchValue}
        />
      </>
    )
  }

  return <>{renderContent()}</>
}

export default WebAlbum
