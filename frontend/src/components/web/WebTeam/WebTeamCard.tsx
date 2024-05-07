/** @jsxImportSource @emotion/react */
import MyDigitalCard from '@/components/mobile/MyCard/MyDigitalCard'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import { frontCardState } from '@/stores/card'
import { TeamListType } from '@/types/TeamListType'
import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil'

const WebTeamCard = (props: { item: TeamListType }) => {
  const { item } = props
  const frontCard = useRecoilValue(frontCardState)

  return (
    <>
      <Thumbnail>
        <Third>
          <MyDigitalCard cardInfo={frontCard} scale={1} border={true} />
        </Third>
        <Second>
          <MyDigitalCard cardInfo={frontCard} scale={1} border={true} />
        </Second>
        <First>
          <MyDigitalCard cardInfo={frontCard} scale={1} border={true} />
        </First>
      </Thumbnail>
      <Flex direction="column" align="end">
        <Text typography="t4" bold={true}>
          {item.teamName}
        </Text>
        <Text typography="t6">{item.teamSize}명</Text>
        <Text typography="t8">{item.cardSize}개의 명함</Text>
      </Flex>
    </>
  )
}

export default WebTeamCard

// style

const Thumbnail = styled.div`
  position: relative;
  width: 200px;
  height: 150px;
`

const First = styled.div`
  position: absolute;
  transform: scale(0.5);
  transform-origin: left bottom;
  bottom: 0;
`

const Second = styled.div`
  position: absolute;
  transform: scale(0.5);
  transform-origin: center;
  translate: -50% -50%;
  top: 50%;
  left: 50%;
`

const Third = styled.div`
  position: absolute;
  transform: scale(0.5);
  transform-origin: top right;
  right: 0;
`
