/** @jsxImportSource @emotion/react */
import WriteCardInfo from '@components/mobile/MyCard/WriteCardInfo'
import EmptyCard from '@components/mobile/MyCard/EmptyCard'
import { useRecoilValue } from 'recoil'
import { cameraState, writeInfoState } from '@/stores/emptyCard'
import PhotoReg from '@/components/mobile/MyCard/PhotoCardInfo/PhotoReg'
import MyCardDetail from '@/components/mobile/MyCard/MyCardDetail/MyCardDetail'
import { useState } from 'react'
import { Spinner } from '@fluentui/react-components'
import { cardInput } from '@/types/cardInput'

import axios from 'axios'
import { userState } from '@/stores/user'

const AppCard = () => {
  const [isCard, setIsCard] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const writeInfo = useRecoilValue(writeInfoState)
  const camera = useRecoilValue(cameraState)
  const userId = useRecoilValue(userState).userId

  function sendCardInfo(cardInput: cardInput) {
    const url = `https://k10s208.p.ssafy.io/cud/api/my-card/${userId}`

    axios
      .post(url, {
        name: cardInput.name,
        company:
          cardInput.company.length === 0
            ? '포스코인터네셔널'
            : cardInput.company,
        department: cardInput.department,
        position: cardInput.position,
        email: cardInput.email,
        landline_number: cardInput.landlineNumber,
        phone_number: cardInput.phoneNumber,
        frontBack: 'FRONT',
      })
      .then(response => {
        console.log('Success:', response.data) // 성공적으로 데이터가 전송되었을 때의 로직
      })
      .catch(error => {
        console.error('Error:', error) // 에러 처리 로직
      })
  }

  const handleOnSubmit = async (cardInputs: cardInput) => {
    try {
      setIsLoading(true)
      await sendCardInfo(cardInputs)
      setIsLoading(false)
      setIsCard(true)
    } catch (error) {
      console.error('Failed to send card info:', error)
    }
  }

  const renderContent = () => {
    if (isLoading) return <Spinner label="로딩 중..." />
    if (isCard) return <MyCardDetail />
    if (writeInfo)
      return <WriteCardInfo onSubmit={handleOnSubmit} isEnglish={false} />
    if (camera) return <PhotoReg isMyCard={isCard} />
    return <EmptyCard />
  }

  return <>{renderContent()}</>
}

export default AppCard
