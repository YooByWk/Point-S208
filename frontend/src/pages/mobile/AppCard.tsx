/** @jsxImportSource @emotion/react */
import WriteCardInfo from '@components/mobile/MyCard/WriteCardInfo'
import EmptyCard from '@components/mobile/MyCard/EmptyCard'
import { writeInfoState } from '@stores/writeInfo'
import { useRecoilValue } from 'recoil'
import MyCardDetail from '@components/mobile/MyCard/MyCardDetail'
import { useState } from 'react'

const AppCard = () => {
  const [isCard, setIsCard] = useState(false)
  const writeInfo = useRecoilValue(writeInfoState)

  return (
    <>
      {!isCard ? (
        writeInfo ? (
          <WriteCardInfo
            onSubmit={cardInputs => {
              //TODO: 백앤드로 정보 보내기
              setIsCard(true)
            }}
            isEnglish={false}
          />
        ) : (
          <EmptyCard />
        )
      ) : (
        <MyCardDetail />
      )}
    </>
  )
}

export default AppCard
