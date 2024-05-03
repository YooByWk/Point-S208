import { writeInfoState } from '@stores/emptyCard'
import { useRecoilValue } from 'recoil'
import { useState } from 'react'
import WebEmptyCard from '@components/web/WebEmptyCard'
import WriteCardInfo from '@components/mobile/MyCard/WriteCardInfo'
import WebMyCard from '@/components/web/WebMyCard'

const WebCard = () => {
  const [isCard, setIsCard] = useState(true)
  const [isEnglish, setIsEnglish] = useState(false)
  const writeInfo = useRecoilValue(writeInfoState)

  const renderContent = () => {
    if (writeInfo)
      return <WriteCardInfo isEnglish={isEnglish} setIsCard={setIsCard} refetch={() => {}}/>
    if (isCard)
      return (
        <WebMyCard
          isCard={isCard}
          setIsEnglish={setIsEnglish}
          setIsCard={setIsCard}
        />
      )

    return <WebEmptyCard />
  }

  return <>{renderContent()}</>
}

export default WebCard
