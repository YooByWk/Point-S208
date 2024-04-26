/** @jsxImportSource @emotion/react */
import WriteCardInfo from '@components/mobile/MyCard/WriteCardInfo'
import EmptyCard from '@components/mobile/MyCard/EmptyCard'
import { useRecoilValue } from 'recoil'
import { cameraState, writeInfoState } from '@/stores/emptyCard'
import PhotoReg from '@/components/mobile/MyCard/PhotoCardInfo/PhotoReg'
import MyCardDetail from '@components/mobile/MyCard/MyCardDetail'
import { useState } from 'react'


const AppCard = () => {
  const [isCard, setIsCard] = useState(false)
  const writeInfo = useRecoilValue(writeInfoState)
  const camera = useRecoilValue(cameraState)

  return (
    <>
      {isCard ? (
        <MyCardDetail />
      ) : (
        <>
          {writeInfo ? (
            <WriteCardInfo
            onSubmit={cardInputs => {
              //TODO: 백앤드로 정보 보내기
              setIsCard(true)
            }}
            isEnglish={false}
          />
          ) : camera ? (
            <PhotoReg isMyCard={true} />
          ) : (
            <EmptyCard />
          )}
        </>
      )}
    </>
  )
}

export default AppCard
