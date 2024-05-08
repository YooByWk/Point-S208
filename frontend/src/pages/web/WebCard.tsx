import { writeInfoState } from '@stores/emptyCard'
import { useRecoilValue } from 'recoil'
import { useState } from 'react'
import WebEmptyCard from '@components/web/WebCard/WebEmptyCard'
import WriteCardInfo from '@components/mobile/MyCard/WriteCardInfo'
import WebMyCard from '@components/web/WebCard/WebMyCard'
import WebEditOtherCardInfo from '@/components/web/WebAlbum/WebEditOtherCardInfo'
import WebAlbumDetail from '@/components/web/WebAlbum/WebAlbumDetail'

const WebCard = () => {
  const [isCard, setIsCard] = useState(true)
  const [isEnglish, setIsEnglish] = useState(false)
  const writeInfo = useRecoilValue(writeInfoState)
  const [editOpen, setEditOpen] = useState(false)
  const [isDetail, setIsDetail] = useState(false)

  const renderContent = () => {
    if (editOpen) {
      return <WebEditOtherCardInfo setEditOpen={setEditOpen} />
    }
    if (isDetail) {
      return (
        <WebAlbumDetail setIsDetail={setIsDetail} setEditOpen={setEditOpen} />
      )
    }
    if (writeInfo)
      return (
        <WriteCardInfo
          isEnglish={isEnglish}
          setIsCard={setIsCard}
          refetch={() => {}}
        />
      )
    if (isCard)
      return (
        <WebMyCard
          isCard={isCard}
          setIsEnglish={setIsEnglish}
          setIsCard={setIsCard}
          setIsDetail={setIsDetail}
        />
      )

    return <WebEmptyCard setIsDetail={setIsDetail} />
  }

  return <>{renderContent()}</>
}

export default WebCard
