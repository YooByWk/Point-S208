/** @jsxImportSource @emotion/react */

import { CardType } from '@/types/cardType'
import TeamCardThumbnail from './TeamCardThumbnail'

import { dummyCard } from '@/assets/data/dummyCard'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import { colors } from '@/styles/colorPalette'
import Spacing from '@/components/shared/Spacing'
import { css } from '@emotion/react'
import { tokens } from '@fluentui/react-components'
import type { TeamListType } from '@/types/TeamListType'


/*  유저의 디지털 카드가 필요함*/
const cardInfo: CardType = dummyCard[0]

interface TeamCardProps {
  teamInfo: TeamListType
}
const TeamCard = ({teamInfo} : TeamCardProps ) => {
  console.log('color', tokens.colorNeutralBackground1)
  return (
    <div
      css={bg}
      onClick={() => {
        console.log(teamInfo.teamName, teamInfo)
      }}
    >
      <Flex direction="row" align="center">
        <TeamCardThumbnail cardInfo={cardInfo} />
        <Flex direction='column' align='center'>
        <Text typography="t7" bold={true} color="themeText">
          {teamInfo.teamName}
        </Text>
        <Spacing size={5} direction="vertical" />
        <Text typography="t9" bold={true} color="themeText">
          {teamInfo.teamSize}명
        </Text>
        <Text typography="t9" bold={true} color="themeText">
          {teamInfo.cardSize}개의 명함
        </Text>
        
        </Flex>
      </Flex>

      <Spacing size={15} direction="vertical" />
    </div>
  )
}

export default TeamCard

const bg = css`
  background-color: ${tokens.colorNeutralBackground1};
  -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`
