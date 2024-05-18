/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import TeamCardThumbnail from './TeamCardThumbnail'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import Spacing from '@/components/shared/Spacing'
import { tokens } from '@fluentui/react-components'
import type { TeamListType } from '@/types/TeamListType'

interface TeamCardProps {
  teamInfo: TeamListType
  onClick?: () => void
}

const ShareTeamCard = ({ teamInfo, onClick }: TeamCardProps) => {
  const teamAlbumId = teamInfo.teamAlbumId

  return (
    <div css={container}>
      <div css={bg} onClick={onClick}>
        <Flex
          direction="row"
          align="center"
          justify="space-around"
          style={{ height: '100%' }}
        >
          <TeamCardThumbnail teamAlbumId={teamAlbumId} />
          <Flex direction="column" align="center">
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
          <Spacing size={15} direction="vertical" />
        </Flex>
      </div>
    </div>
  )
}

export default ShareTeamCard

const container = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const bg = css`
  width: 85%;
  margin-bottom: 7%;
  background-color: ${tokens.colorNeutralBackground4};
  border-radius: 15px;
  height: 130px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &:hover,
  &:active,
  &.wave {
    animation: wave 1.2s ease forwards;
    background: linear-gradient(
      90deg,
      ${tokens.colorNeutralBackground4Hover} 0%,
      ${tokens.colorNeutralBackground1Hover} 100%
    );
    background-size: 200% 200%;
  }

  @keyframes wave {
    0% {
      background-position: 10% 50%;
    }
    100% {
      background-position: 80% 50%;
      background: ${tokens.colorNeutralBackground4};
    }
  }
`
