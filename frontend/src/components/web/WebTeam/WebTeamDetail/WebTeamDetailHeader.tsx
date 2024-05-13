/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import * as XLSX from 'xlsx'
import {
  ShareAndroid24Filled,
  Delete24Filled,
  ChevronDownRegular,
  ArrowDownload24Filled,
  ArrowSort24Filled,
  Filter24Filled,
  ArrowLeft24Regular,
} from '@fluentui/react-icons'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Checkbox,
  SearchBox,
  TabList,
  Tab,
  TabListProps,
  Button,
} from '@fluentui/react-components'
import Spacing from '@/components/shared/Spacing'
import { colors } from '@/styles/colorPalette'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { selectedTeamAlbumIdState } from '@/stores/team'
import styled from '@emotion/styled'
import { useState } from 'react'
import { themeState } from '@/stores/common'
import { userState } from '@/stores/user'
import { CardType } from '@/types/cardType'
import { ExternalCardListType } from '@/types/ExternalCard'
import { UserListType } from '@/types/userType'

const WebTeamDetailHeader = ({
  allCards,
  selectedCards,
  setSelectedCards,
  searchResults,
  setSearchResults,
  searchValue,
  setSearchValue,
}: {
  allCards: CardType[]
  selectedCards: number[]
  setSelectedCards: React.Dispatch<React.SetStateAction<number[]>>
  searchResults: ExternalCardListType | undefined
  setSearchResults: React.Dispatch<
    React.SetStateAction<ExternalCardListType | undefined>
  >
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
}) => {
  const userId = useRecoilValue(userState).userId
  const selectedTeam = useRecoilValue(selectedTeamAlbumIdState)
  const resetSelectedTeam = useResetRecoilState(selectedTeamAlbumIdState)
  const theme = useRecoilValue(themeState)

  const handleResult = (data: ExternalCardListType | UserListType) => {
    if (Array.isArray(data)) {
      setSearchResults(data as ExternalCardListType)
    }
  }

  const handleSelectAll = () => {
    if (allCards.length === selectedCards.length) {
      setSelectedCards([])
    } else {
      setSelectedCards(allCards.map(card => card.cardId))
    }
  }

  const handleDownload = () => {
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

  return (
    <>
      <Flex direction="column" css={boxStyles(theme)}>
        <Flex justify="space-between" align="center">
          <Flex align="center">
            <BackButton onClick={() => resetSelectedTeam()}>
              <ArrowLeft24Regular />
              <Text typography="t7"> 뒤로가기 </Text>
            </BackButton>
            <Spacing size={20} direction="horizontal" />
            <SearchBox
              appearance="underline"
              placeholder="명함을 검색해 주세요"
              onChange={(e: any) => setSearchValue(e.target.value)}
            />
          </Flex>
          <Flex align="center">
            <ArrowSort24Filled css={iconStyles} />
            <TabList defaultSelectedValue="newly">
              <Tab value="newly">최신순</Tab>
              <Tab value="name">이름순</Tab>
              <Tab value="company">회사명순</Tab>
            </TabList>
            <Filter24Filled css={iconStyles} />
            <TabList defaultSelectedValue="none">
              <Tab value="none">필터 없음</Tab>
              <Tab value="stared">즐겨찾기 한 명함</Tab>
              <Tab value="received">받은 명함</Tab>
            </TabList>
          </Flex>
        </Flex>
        <Spacing size={10} />
        <Flex justify="space-between" align="center">
          <Text>{selectedTeam.teamName}</Text>
          <Flex align="center">
            <Checkbox
              shape="circular"
              label=""
              checked={
                allCards.length === selectedCards.length
                  ? true
                  : selectedCards.length > 0
                  ? 'mixed'
                  : false
              }
              onClick={handleSelectAll}
            />
            
            <div css={wordBoxStyles}>
              <Text typography="t9" color="themeMainBlue" textAlign="center">
                {selectedCards.length}개 선택됨
              </Text>
            </div>

            <Button appearance="transparent" size="small" css={buttonStyles}>
              <ShareAndroid24Filled />
            </Button>
            <Button appearance="transparent" size="small" css={buttonStyles}>
              <ArrowDownload24Filled />
            </Button>
            <Button appearance="transparent" size="small" css={buttonStyles}>
              <Delete24Filled />
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default WebTeamDetailHeader

// style

const BackButton = styled.div`
  display: flex;
  gap: 10px;
  white-space: nowrap;
  cursor: pointer;
`

// css

const boxStyles = (theme: string) => css`
  position: fixed;
  padding: 5px 24px;
  width: 100%;
  z-index: 1000;
  background-color: ${theme === 'dark' ? colors.black01 : '#fff'};
`

const iconStyles = css`
  color: ${colors.themeMainBlue};
`

const buttonStyles = css`
  padding: 0;
  margin: 0;
`

const wordBoxStyles = css`
  width: 100px;
  text-align: center;
`