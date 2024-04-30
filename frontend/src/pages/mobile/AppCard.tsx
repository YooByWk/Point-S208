/** @jsxImportSource @emotion/react */
import WriteCardInfo from '@components/mobile/MyCard/WriteCardInfo'
import EmptyCard from '@components/mobile/MyCard/EmptyCard'
import { useRecoilValue } from 'recoil'
import { cameraState, writeInfoState } from '@stores/emptyCard'
import PhotoReg from '@components/mobile/MyCard/PhotoCardInfo/PhotoReg'
import MyCardDetail from '@components/mobile/MyCard/MyCardDetail/MyCardDetail'
import { useState } from 'react'
import { Spinner } from '@fluentui/react-components'

const AppCard = () => {
  const [isCard, setIsCard] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const writeInfo = useRecoilValue(writeInfoState)
  const camera = useRecoilValue(cameraState)

  const renderContent = () => {
    if (isLoading) return <Spinner label="로딩 중..." />
    if (isCard) return <MyCardDetail />
    if (writeInfo)
      return (
        <WriteCardInfo
          onSubmit={isDone => {
            setIsCard(isDone)
          }}
          isEnglish={false}
        />
      )
    if (camera) return <PhotoReg isMyCard={isCard} />
    return <EmptyCard />
  }

  return <>{renderContent()}</>
}

export default AppCard
