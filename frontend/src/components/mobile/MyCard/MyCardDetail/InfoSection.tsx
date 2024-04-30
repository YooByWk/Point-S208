import { dummyCard } from '@/assets/data/dummyCard'
import Text from '@/components/shared/Text'
import Flex from '@/components/shared/Flex'
import { frontCardState, backCardState, isFrontState } from '@/stores/card'
import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil'
import { EditRegular, Guest24Regular } from '@fluentui/react-icons'
import Spacing from '@/components/shared/Spacing'
import { BooleanStateType } from '@/types/commonType'
import { useEffect, useState } from 'react'
import { CardType } from '@/types/cardType'

const CardInfo = (props: { name: string; value: string }) => {
  const { name, value } = props

  return (
    <Flex>
      <Text typography="t8" style={{ minWidth: '70px' }}>
        {name}
      </Text>
      <Text typography="t8" style={{ wordBreak: 'keep-all' }}>
        {value}
      </Text>
    </Flex>
  )
}

const InfoSection = (props: BooleanStateType) => {
  const { setValue } = props
  const isFront = useRecoilValue(isFrontState)
  const frontCard = useRecoilValue(frontCardState)
  const backCard = useRecoilValue(backCardState)
  const [card, setCard] = useState<CardType>(frontCard)

  useEffect(() => {
    setCard(isFront ? frontCard : backCard)
  }, [isFront, frontCard, backCard])

  return (
    <Flex direction="column">
      <Wrap>
        <Text typography="t5" bold={true}>
          {card.name}
        </Text>
        <Text typography="t7">
          {card.position} / {card.department}
        </Text>
        <Edit onClick={() => setValue(true)}>
          <EditRegular />
          <Text typography="t8">수정</Text>
        </Edit>
      </Wrap>

      <BreackLine />

      <Wrap>
        <Flex align="center">
          <Guest24Regular />
          <Spacing size={10} direction="horizontal" />
          <Text typography="t8" bold={true}>
            명함 정보
          </Text>
        </Flex>
        <CardInfo name={'회사'} value={card.company} />
        <CardInfo name={'부서'} value={card.department} />
        <CardInfo name={'직책'} value={card.position} />
      </Wrap>

      <BreackLine />

      <Wrap>
        <Flex align="center">
          <Guest24Regular />
          <Spacing size={10} direction="horizontal" />
          <Text typography="t8" bold={true}>
            연락처
          </Text>
        </Flex>
        <CardInfo name={'이메일'} value={card.email} />
        <CardInfo name={'휴대전화'} value={card.phoneNumber} />
        <CardInfo name={'팩스'} value={card.faxNumber} />
        <CardInfo name={'주소'} value={card.address} />
      </Wrap>

      <BreackLine />
    </Flex>
  )
}

export default InfoSection

// style

const BreackLine = styled.div`
  width: 100vw;
  height: 0.5px;
  background-color: ${colors.poscoDarkGray};
  opacity: 0.5;
`

const Wrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 10px;
`

const Edit = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  height: 100%;
  gap: 5px;
`
