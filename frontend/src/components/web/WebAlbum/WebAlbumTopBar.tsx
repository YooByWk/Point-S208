/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
  ArrowDownload24Filled,
  ArrowSort24Filled,
  Filter24Filled,
  DrawerArrowDownload24Filled,
} from '@fluentui/react-icons'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import {
  Checkbox,
  TabList,
  Tab,
  Button,
  Popover,
  PopoverTrigger,
  PopoverSurface,
} from '@fluentui/react-components'
import Spacing from '@/components/shared/Spacing'
import { colors } from '@/styles/colorPalette'
import { CardType } from '@/types/cardType'
import { useRecoilValue } from 'recoil'
import { userState } from '@/stores/user'
import * as XLSX from 'xlsx'
import WebUploadFromFile from './WebUploadFromFile'
import SearchBox from '@/components/shared/SearchBox'
import { UserListType } from '@/types/userType'
import { ExternalCardListType } from '@/types/ExternalCard'
import WebAlbumDeleteSelected from './WebAlbumDeleteSelected'
import { useMutation } from '@tanstack/react-query'
import { fetchAllAlbum } from '@/apis/album'

const WebAlbumTopBar = ({
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

  const handleResult = (data: ExternalCardListType | UserListType) => {
    if (Array.isArray(data)) {
      setSearchResults(data as ExternalCardListType)
    }

    console.log('searchResult:', searchResults)
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

  const downloadAsExcel = (arr: CardType[]) => {
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
      ...arr.map(card => [
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

  const { mutate } = useMutation({
    mutationKey: ['fetchAllAlbum'],
    mutationFn: fetchAllAlbum,
    onSuccess(result) {
      console.log('읽어오기 성공', result.data_body)
      downloadAsExcel(result.data_body)
    },
    onError(error) {
      console.error('읽어오기 실패:', error)
    },
  })

  const handleDownloadAll = () => {
    mutate({ userId: userId })
  }

  return (
    <>
      <Flex direction="column" css={boxStyles}>
        <Flex justify="space-between" align="center">
          {/* <SearchBox appearance="underline" placeholder="명함 검색" /> */}
          <SearchBox
            onChange={e => {
              if (e.target.value !== undefined) {
                setSearchValue(e.target.value)
              }
            }}
            onSearch={handleResult}
            value={searchValue}
            placeholder="명함 검색"
            memberIcon={false}
            filterIcon={false}
            sortIcon={false}
            width="100%"
          />
          <Flex align="center">
            {/* <ArrowSort24Filled css={iconStyles} />
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
            </TabList> */}
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

            <Popover openOnHover={true} mouseLeaveDelay={0.1}>
              <PopoverTrigger disableButtonEnhancement>
                <Button
                  appearance="transparent"
                  size="small"
                  css={buttonStyles}
                  onClick={handleDownload}
                >
                  <ArrowDownload24Filled />
                </Button>
              </PopoverTrigger>

              <PopoverSurface tabIndex={-1}>
                <Text typography="t9"> 선택한 명함 엑셀로 다운받기</Text>
              </PopoverSurface>
            </Popover>

            <WebAlbumDeleteSelected
              selectedCards={selectedCards}
              setSelectedCards={setSelectedCards}
            />

            <WebUploadFromFile />

            <Popover openOnHover={true} mouseLeaveDelay={0.1}>
              <PopoverTrigger disableButtonEnhancement>
                <Button
                  appearance="transparent"
                  size="small"
                  css={buttonStyles}
                  onClick={handleDownloadAll}
                >
                  <DrawerArrowDownload24Filled />
                </Button>
              </PopoverTrigger>

              <PopoverSurface tabIndex={-1}>
                <Text typography="t9"> 전체 명함 엑셀로 다운받기</Text>
              </PopoverSurface>
            </Popover>
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
