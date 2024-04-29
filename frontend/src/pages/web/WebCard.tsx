import { writeInfoState } from '@stores/emptyCard'
import WebEmptyCard from '@components/web/WebEmptyCard'
import { useRecoilValue } from 'recoil'
import WriteCardInfo from '@components/mobile/MyCard/WriteCardInfo'
import { useState } from 'react'
import { userState } from '@stores/user'
import { cardInput } from '@/types/cardInput'

import axios from 'axios'

const WebCard = () => {
  const [isCard, setIsCard] = useState(true)
  const writeInfo = useRecoilValue(writeInfoState)
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
      await sendCardInfo(cardInputs)
      setIsCard(true)
    } catch (error) {
      console.error('Failed to send card info:', error)
    }
  }

  const renderContent = () => {
    if (isCard) return <></>
    if (writeInfo)
      return <WriteCardInfo onSubmit={handleOnSubmit} isEnglish={false} />
    return <WebEmptyCard />
  }

  return <>{renderContent()}</>
}

export default WebCard
