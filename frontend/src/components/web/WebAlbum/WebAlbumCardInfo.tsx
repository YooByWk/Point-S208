/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PersonBoard32Filled, Phone32Regular } from '@fluentui/react-icons'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import { colors } from '@styles/colorPalette'
import { useRecoilValue } from 'recoil'
import { selectedCardState } from '@/stores/card'
import { Image } from '@fluentui/react-components'

const WebAlbumCardInfo = () => {
  const selectedCard = useRecoilValue(selectedCardState)

  return (
    <>
      <Flex direction="column">
        <div css={boxStyles}>
          <Image src={selectedCard.realPicture} alt="명함사진" fit="contain" />
        </div>
        <Spacing size={20} />
        <Flex direction="column" css={container3Styles}>
          <Flex justify="flex-start" align="center">
            <PersonBoard32Filled />
            <Text bold={true}>명함 정보</Text>
          </Flex>
          <Spacing size={20} />
          {selectedCard.name && (
            <Flex>
              <Text typography="t6">이름</Text>
              <Spacing size={60} direction="horizontal" />
              <Text typography="t6">{selectedCard.name}</Text>
            </Flex>
          )}
          {selectedCard.company && (
            <Flex>
              <Text typography="t6">회사</Text>
              <Spacing size={60} direction="horizontal" />
              <Text typography="t6">{selectedCard.company}</Text>
            </Flex>
          )}
          {selectedCard.department && (
            <Flex>
              <Text typography="t6">부서</Text>
              <Spacing size={60} direction="horizontal" />
              <Text typography="t6">{selectedCard.department}</Text>
            </Flex>
          )}
          {selectedCard.rank && (
            <Flex>
              <Text typography="t6">직무</Text>
              <Spacing size={60} direction="horizontal" />
              <Text typography="t6">{selectedCard.rank}</Text>
            </Flex>
          )}
          {selectedCard.position && (
            <Flex>
              <Text typography="t6">직책</Text>
              <Spacing size={60} direction="horizontal" />
              <Text typography="t6">{selectedCard.position}</Text>
            </Flex>
          )}
          <Spacing size={20} />
        </Flex>

        <Spacing size={20} />
        <Flex direction="column">
          <Flex justify="flex-start" align="center">
            <Phone32Regular />
            <Text bold={true}>연락처</Text>
          </Flex>
          <Spacing size={20} />
          {selectedCard.email && (
            <Flex>
              <Text typography="t6">이메일</Text>
              <Spacing size={40} direction="horizontal" />
              <Text typography="t6">{selectedCard.email}</Text>
            </Flex>
          )}
          {selectedCard.landlineNumber && (
            <Flex>
              <Text typography="t6">유선전화</Text>
              <Spacing size={20} direction="horizontal" />
              <Text typography="t6">{selectedCard.landlineNumber}</Text>
            </Flex>
          )}
          {selectedCard.phoneNumber && (
            <Flex>
              <Text typography="t6">휴대전화</Text>
              <Spacing size={20} direction="horizontal" />
              <Text typography="t6">{selectedCard.phoneNumber}</Text>
            </Flex>
          )}
          {selectedCard.faxNumber && (
            <Flex>
              <Text typography="t6">팩스</Text>
              <Spacing size={60} direction="horizontal" />
              <Text typography="t6">{selectedCard.faxNumber}</Text>
            </Flex>
          )}
          {selectedCard.domainUrl && (
            <Flex>
              <Text typography="t6">웹사이트</Text>
              <Spacing size={20} direction="horizontal" />
              <Text typography="t6">{selectedCard.domainUrl}</Text>
            </Flex>
          )}
          {selectedCard.address && (
            <Flex>
              <Text typography="t6">주소</Text>
              <Spacing size={60} direction="horizontal" />
              <Text typography="t6">{selectedCard.address}</Text>
            </Flex>
          )}
          <Spacing size={10} />
        </Flex>
      </Flex>
    </>
  )
}

export default WebAlbumCardInfo

const container3Styles = css`
  border-bottom: 1px solid ${colors.themeGray};
`

const boxStyles = css`
  width: 46vw;
  height: 25vh;
  border: 1px solid black;
`
