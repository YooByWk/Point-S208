/** @jsxImportSource @emotion/react */

import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import { CardType } from "@/types/cardType";
import { BooleanStateType } from "@/types/commonType";
import Text from '@shared/Text'
import { Edit20Regular,EditRegular,
  Guest24Regular } from '@fluentui/react-icons'
import CardInfo from '@components/mobile/MyCard/MyCardDetail/InfoSection'
import styled from "@emotion/styled";
import { colors } from "@/styles/colorPalette";
import { css } from "@emotion/react";
  

interface DetailInfoSectionProps {
  card: CardType;
  isEdit: BooleanStateType;
}

const DeatilCardInfo = (props: { name: string; value: string }) => {
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


const DetailInfoSection: React.FC<DetailInfoSectionProps> = ({ card, isEdit }) => {
  const { setValue } = isEdit
  return (
  <Flex direction="column">
  <Wrap>
    <Text typography="t5" bold={true}>
      {card.name}
    </Text>
    <Text typography="t7">
      {card.position} / {card.department}
    </Text>
    <Edit onClick={() => {setValue(true) ; console.log(isEdit.value)}}>
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
    <DeatilCardInfo name={'회사'} value={card.company} />
    <DeatilCardInfo name={'부서'} value={card.department} />
    <DeatilCardInfo name={'직책'} value={card.position} />
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
    <DeatilCardInfo name={'이메일'} value={card.email} />
    <DeatilCardInfo name={'유선전화'} value={card.landlineNumber} />
    <DeatilCardInfo name={'휴대전화'} value={card.phoneNumber} />
  </Wrap>

  <BreackLine />
</Flex>
  )
}

export default DetailInfoSection
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

// css

const WriteStyle = css`
  padding: 10px;
  background-color: ${colors.themeTextInverted};
`
