import { useState } from 'react'
import WebAlbumDetail from '@/components/web/WebAlbum/WebAlbumDetail'
import WebTeamDetailHeader from '@/components/web/WebTeam/WebTeamDetail/WebTeamDetailHeader'
import WebTeamDetailList from '@/components/web/WebTeam/WebTeamDetail/WebTeamDetailList'
import { CardType } from '@/types/cardType'
import { ExternalCardListType } from '@/types/ExternalCard'
import { useRecoilValue } from 'recoil'
import { cameraState } from '@/stores/emptyCard'
import { isAddCardByInfoState } from '@/stores/album'
import WebOtherCardInfo from '../../WebAlbum/WebOtherCardInfo'
import WebReg from '../../WebReg'

const WebTeamDetail = () => {
  const [isDetail, setIsDetail] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [cards, setCards] = useState<CardType[]>([])
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [searchResults, setSearchResults] = useState<
    ExternalCardListType | undefined
  >(undefined)
  const [searchValue, setSearchValue] = useState('')
  const isAddCardByInfo = useRecoilValue(isAddCardByInfoState)
  const camera = useRecoilValue(cameraState)

  const renderContent = () => {
    if (isAddCardByInfo)
      return <WebOtherCardInfo setEditOpen={setEditOpen} isEdit={false} />
    if (camera) return <WebReg state="team" /> // state => myCard, album, team
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
        <WebTeamDetailHeader
          selectedCards={selectedCards}
          allCards={cards}
          setSelectedCards={setSelectedCards}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <WebTeamDetailList
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

export default WebTeamDetail
