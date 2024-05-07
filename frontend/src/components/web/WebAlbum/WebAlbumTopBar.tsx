/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
  Delete24Filled,
  ArrowDownload24Filled,
  ArrowSort24Filled,
  Filter24Filled,
} from '@fluentui/react-icons'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import {
  Checkbox,
  SearchBox,
  TabList,
  Tab,
  Button,
} from '@fluentui/react-components'
import Spacing from '@/components/shared/Spacing'
import { colors } from '@/styles/colorPalette'
import { CardType } from '@/types/cardType'

const WebAlbumTopBar = ({
  allCards,
  selectedCards,
  setSelectedCards,
}: {
  allCards: CardType[]
  selectedCards: number[]
  setSelectedCards: React.Dispatch<React.SetStateAction<number[]>>
}) => {
  console.log(`all cards: ${allCards.length}`)
  console.log(`selected cards: ${selectedCards.length}`)

  const handleSelectAll = () => {
    if (allCards.length === selectedCards.length) {
      setSelectedCards([])
    } else {
      setSelectedCards(allCards.map(card => card.cardId))
    }
  }

  return (
    <>
      <Flex direction="column" css={boxStyles}>
        <Flex justify="space-between" align="center">
          <SearchBox appearance="underline" placeholder="명함 검색" />
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
          <Text>나의 명함 지갑</Text>
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

export default WebAlbumTopBar

const boxStyles = css`
  position: fixed;
  padding: 5px 24px;
  width: 100%;
  background-color: ${colors.themeTextInverted};
  z-index: 1000;
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
