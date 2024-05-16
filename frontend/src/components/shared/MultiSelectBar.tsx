/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import Flex from '@/components/shared/Flex'
import {
  Circle24Regular,
  CheckmarkCircle24Regular,
  ArrowDownload24Regular,
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
import * as XLSX from 'xlsx'

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

  const handleDownload = () => {
    // id로 카드 정보 가져오기
    const selectedCardDetails: CardType[] = allCards.filter(card =>
      selectedCards.includes(card.cardId),
    )

    const data = [
      [
        '이름',
        '회사',
        '부서',
        '직무',
        '직책',
        '이메일',
        '유선전화',
        '휴대전화',
        '팩스번호',
        '웹사이트',
        '주소',
      ],
      ...selectedCardDetails.map(card => [
        card.name,
        card.company,
        card.department,
        card.rank,
        card.position,
        card.email,
        card.landlineNumber,
        card.phoneNumber,
        card.faxNumber,
        card.domainUrl,
        card.address,
      ]),
    ]
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.aoa_to_sheet(data)
    XLSX.utils.book_append_sheet(wb, ws, '사용자 정보')

    XLSX.writeFile(wb, '명함.xlsx')
  }

  const handleDelete = async () => {
    if (teamAlbumId) {
      const params = {
        teamAlbumId: teamAlbumId,
        cardIdArray: selectedCards,
        userId: userId,
      }
      // teamAlubmDeleteMutation.mutate(selectedCards)
      teamAlubmDeleteMutation.mutate(params)
      return
    }
    // console.log('handleDelete: ', selectedCards)
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
        {/* <ArrowDownload24Regular onClick={handleDownload} /> */}
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
