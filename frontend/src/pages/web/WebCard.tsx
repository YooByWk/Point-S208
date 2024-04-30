import { writeInfoState } from '@stores/emptyCard'
import { useRecoilValue } from 'recoil'
import { useState } from 'react'
import WebEmptyCard from '@components/web/WebEmptyCard'
import WriteCardInfo from '@components/mobile/MyCard/WriteCardInfo'
import WebMyCard from '@/components/web/WebMyCard'

const WebCard = () => {
  const [isCard, setIsCard] = useState(true)
  const writeInfo = useRecoilValue(writeInfoState)

  const renderContent = () => {
    if (isCard) return <WebMyCard isCard={isCard} />
    if (writeInfo)
      return <WriteCardInfo isEnglish={false} setIsCard={setIsCard} />
    return <WebEmptyCard />
  }

  return <>{renderContent()}</>
}

export default WebCard
