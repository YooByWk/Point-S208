import WebAlbumDetail from '@/components/web/WebAlbum/WebAlbumDetail'
import WebOtherCardInfo from '@/components/web/WebAlbum/WebOtherCardInfo'
import WebReg from '@/components/web/WebReg'
import { isAddCardByInfoState } from '@/stores/album'
import { cameraState } from '@/stores/emptyCard'
import { CardType } from '@/types/cardType'
import { ExternalCardListType } from '@/types/ExternalCard'
import WebAlbumTopBar from '@components/web/WebAlbum/WebAlbumTopBar'
import WebMyAlbumList from '@components/web/WebAlbum/WebMyAlbumList'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'

const WebAlbum = () => {
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [isDetail, setIsDetail] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [cards, setCards] = useState<CardType[]>([])
  const [searchResults, setSearchResults] = useState<
    ExternalCardListType | undefined
  >(undefined)
  const [searchValue, setSearchValue] = useState('')
  const isAddCardByInfo = useRecoilValue(isAddCardByInfoState)
  const camera = useRecoilValue(cameraState)

  const renderContent = () => {
    if (isAddCardByInfo)
      return <WebOtherCardInfo setEditOpen={setEditOpen} isEdit={false} />
    if (camera)
      return <WebReg state='album' /> // state => myCard, album, team
    if (editOpen) {
      return <WebOtherCardInfo setEditOpen={setEditOpen} isEdit={true} />
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
