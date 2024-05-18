/** @jsxImportSource @emotion/react */
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import { CardType } from '@/types/cardType'
import { BooleanStateType } from '@/types/commonType'
import Text from '@shared/Text'
import { EditRegular, Guest24Regular } from '@fluentui/react-icons'
import styled from '@emotion/styled'
import { colors } from '@/styles/colorPalette'
import { ExternalCardType } from '@/types/ExternalCard'

interface DetailInfoSectionProps {
  card: CardType | ExternalCardType
  isEdit: BooleanStateType
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

const DetailInfoSection: React.FC<DetailInfoSectionProps> = ({
  card,
  isEdit,
}) => {
  const { setValue } = isEdit
  return (
    <Flex direction="column">
      <Wrap>
        <Text typography="t5" bold={true}>
          {card.name}
        </Text>
        <Text typography="t7">
          {card.position && card.department
            ? `${card.position} / ${card.department}`
            : card.position || card.department}
        </Text>
        <Edit
          onClick={() => {
            setValue(true)
          }}
        >
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
        {card.company && <DeatilCardInfo name={'회사'} value={card.company} />}
        {card.department && (
          <DeatilCardInfo name={'부서'} value={card.department} />
        )}
        {card.rank && <DeatilCardInfo name={'직무'} value={card.rank} />}
        {card.position && (
          <DeatilCardInfo name={'직책'} value={card.position} />
        )}
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
        {card.email && card.email.trim() && (
          <DeatilCardInfo name={'이메일'} value={card.email} />
        )}
        {card.landlineNumber && card.landlineNumber.trim() && (
          <DeatilCardInfo name={'유선전화'} value={card.landlineNumber} />
        )}
        {card.phoneNumber && card.phoneNumber.trim() && (
          <DeatilCardInfo name={'휴대전화'} value={card.phoneNumber} />
        )}
        {card.faxNumber && card.faxNumber.trim() && (
          <DeatilCardInfo name={'팩스'} value={card.faxNumber} />
        )}
        {card.domainUrl && card.domainUrl.trim() && (
          <DeatilCardInfo name={'웹사이트'} value={card.domainUrl} />
        )}
        {card.address && card.address.trim() && (
          <DeatilCardInfo name={'주소'} value={card.address} />
        )}
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
