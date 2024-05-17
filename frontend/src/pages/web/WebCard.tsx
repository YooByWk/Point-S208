import { writeInfoState } from '@stores/emptyCard'
import { useRecoilValue } from 'recoil'
import { useState } from 'react'
import WebEmptyCard from '@components/web/WebCard/WebEmptyCard'
import WriteCardInfo from '@components/mobile/MyCard/WriteCardInfo'
import WebMyCard from '@components/web/WebCard/WebMyCard'
import WebOtherCardInfo from '@/components/web/WebAlbum/WebOtherCardInfo'
import WebAlbumDetail from '@/components/web/WebAlbum/WebAlbumDetail'

const WebCard = () => {
  const [isCard, setIsCard] = useState(true)
  const [isEnglish, setIsEnglish] = useState(false)
  const writeInfo = useRecoilValue(writeInfoState)
  const [editOpen, setEditOpen] = useState(false)
  const [isDetail, setIsDetail] = useState(false)

  const renderContent = () => {
    // 내 명함 수정
    if (editOpen) {
      return <WebOtherCardInfo setEditOpen={setEditOpen} isEdit={true} />
    }

    // 새로 추가된 명함 상세
    if (isDetail) {
      return (
        <WebAlbumDetail setIsDetail={setIsDetail} setEditOpen={setEditOpen} />
      )
    }

    // 내 명함 정보 입력
    if (writeInfo)
      return (
        <WriteCardInfo
          isEnglish={isEnglish}
          setIsCard={setIsCard}
          refetch={() => {}}
        />
      )

    // 등록된 명함 정보가 있을 때
    if (isCard) {
      return (
        <>
          <WebMyCard
            isCard={isCard}
            setIsEnglish={setIsEnglish}
            setIsCard={setIsCard}
            setIsDetail={setIsDetail}
          />
        </>
      )
    }

    // 등록된 명함 정보가 없을 때
    return <WebEmptyCard setIsDetail={setIsDetail} />
  }

  return <>{renderContent()}</>
}

export default WebCard
