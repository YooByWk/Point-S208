/** @jsxImportSource @emotion/react */
import WriteCardInfo from '@components/mobile/MyCard/WriteCardInfo'
import EmptyCard from '@components/mobile/MyCard/EmptyCard'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { cameraState, writeInfoState } from '@stores/emptyCard'
import PhotoReg from '@components/mobile/MyCard/PhotoCardInfo/PhotoReg'
import MyCardDetail from '@components/mobile/MyCard/MyCardDetail/MyCardDetail'
import { useEffect, useState } from 'react'
import { Spinner } from '@fluentui/react-components'
import { useQuery } from '@tanstack/react-query'
import { userState } from '@/stores/user'
import { fetchMyCard } from '@/apis/card'
import { backCardState, frontCardState, isFrontState } from '@/stores/card'

const AppCard = () => {
  const [isCard, setIsCard] = useState(false)
  const isFront = useRecoilValue(isFrontState)
  const writeInfo = useRecoilValue(writeInfoState)
  const camera = useRecoilValue(cameraState)
  const userId = useRecoilValue(userState).userId as number
  const setFrontCard = useSetRecoilState(frontCardState)
  const setBackCard = useSetRecoilState(backCardState)

  const { data, isLoading } = useQuery({
    queryKey: ['fetchMyCard'],
    queryFn: () => fetchMyCard(userId),
  })

  useEffect(() => {
    if (!isLoading && (data?.front || data?.back)) {
      if (data?.front) setFrontCard(data.front)
      if (data?.back) setBackCard(data.back)
      setIsCard(true)
    }
  }, [data, isLoading, setBackCard, setFrontCard, writeInfo])

  const renderContent = () => {
    if (isLoading) return <Spinner label="로딩 중..." />
    if (writeInfo)
      return <WriteCardInfo setIsCard={setIsCard} isEnglish={!isFront} />
    if (camera) return <PhotoReg isMyCard={isCard} />
    if (isCard) return <MyCardDetail />
    return <EmptyCard />
  }

  return <>{renderContent()}</>
}

export default AppCard
