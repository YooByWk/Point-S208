/** @jsxImportSource @emotion/react */
import Flex from '@/components/shared/Flex'
import {
  Circle24Regular,
  CheckmarkCircle24Regular,
  Delete24Filled,
} from '@fluentui/react-icons'
import Text from '@shared/Text'
import { css } from '@emotion/react'
import Spacing from '@/components/shared/Spacing'
import type { CardType } from '@/types/cardType'
import { useDeleteAlbumCards } from '@/hooks/useDeleteAlbumCards'
import SmallModal from '@/components/shared/SmallModal'
import { useDeleteTeamAlbumCards } from '@/hooks/Team/useDeleteTeamAlbumCards'
import { useParams } from 'react-router-dom'
import { userState } from '@/stores/user'
import { useRecoilValue } from 'recoil'

interface MultiSelectBarProps {
  selectedCards: number[]
  allCards: CardType[]
  setSelectedCards: (cards: number[]) => void
  cardCnt: number
}

const MultiSelectBar = ({
  selectedCards,
  allCards,
  setSelectedCards,
  cardCnt,
}: MultiSelectBarProps) => {
  const myAlbumDeletemutation = useDeleteAlbumCards()
  const teamAlubmDeleteMutation = useDeleteTeamAlbumCards()
  const teamAlbumId: number = useParams()?.teamAlbumId as unknown as number
  const userId = useRecoilValue(userState).userId

  const handleSelectAll = () => {
    if (allCards.length === selectedCards.length) {
      setSelectedCards([])
    } else {
      setSelectedCards(allCards.map(card => card.cardId))
    }
  }

  const handleDelete = async () => {
    if (teamAlbumId) {
      const params = {
        teamAlbumId: teamAlbumId,
        cardIdArray: selectedCards,
        userId: userId,
      }
      teamAlubmDeleteMutation.mutate(params)
      return
    }
    myAlbumDeletemutation.mutate(selectedCards)
  }

  return (
    <Flex
      direction="row"
      align="center"
      justify="space-between"
      css={selectbarContainer}
    >
      <Flex direction="row" align="center" justify="space-around">
        {allCards.length === selectedCards.length ? (
          <CheckmarkCircle24Regular onClick={handleSelectAll} />
        ) : (
          <Circle24Regular onClick={handleSelectAll} />
        )}
        <Spacing size={10} direction="horizontal" />
        {selectedCards.length > 0 ? (
          <Text typography="t9" color="themeMainBlue">
            {selectedCards.length}개 선택됨
          </Text>
        ) : (
          <Text typography="t9" color="themeMainBlue">
            보유명함 : 총 {cardCnt}개
          </Text>
        )}
      </Flex>
      <Flex>
        <SmallModal
          icon={<Delete24Filled />}
          dialogTitle="명함 삭제"
          dialogContent={`${selectedCards.length}개의 명함을 삭제하시겠습니까?`}
          onClick={handleDelete}
          actionButtonText="삭제"
        />
      </Flex>
    </Flex>
  )
}

export default MultiSelectBar

const selectbarContainer = css`
  padding-left: 7.5%;
  padding-right: 5%;
`
