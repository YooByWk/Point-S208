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
  TabList,
  Tab,
  Button,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogActions,
  Popover,
  PopoverTrigger,
  PopoverSurface,
} from '@fluentui/react-components'
import Spacing from '@/components/shared/Spacing'
import { colors } from '@/styles/colorPalette'
import { CardType } from '@/types/cardType'
import { useMutation } from '@tanstack/react-query'
import { deleteMyAlbumCard } from '@/apis/album'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userState } from '@/stores/user'
import { isRefreshedAlbumState } from '@/stores/card'
import { useState } from 'react'
import * as XLSX from 'xlsx'
import WebUploadFromFile from './WebUploadFromFile'
import SearchBox from '@/components/shared/SearchBox'
import { UserListType } from '@/types/userType'

const WebAlbumTopBar = ({
  allCards,
  setAllCards,
  selectedCards,
  setSelectedCards,
}: {
  allCards: CardType[]
  setAllCards: React.Dispatch<React.SetStateAction<CardType[]>>
  selectedCards: number[]
  setSelectedCards: React.Dispatch<React.SetStateAction<number[]>>
}) => {
  const userId = useRecoilValue(userState).userId
  const [isRefreshed, setIsRefreshed] = useRecoilState(isRefreshedAlbumState)
  const [modalOpen, setModalOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const handleResult = (data: CardType | UserListType) => {
    if (Array.isArray(data)) {
      setAllCards(data as CardType[])
    }
    if (searchValue.length === 0) {
      setIsRefreshed(!isRefreshed)
    }
  }

  const handleSelectAll = () => {
    if (allCards.length === selectedCards.length) {
      setSelectedCards([])
    } else {
      setSelectedCards(allCards.map(card => card.cardId))
    }
  }

  const { mutate } = useMutation({
    mutationKey: ['deleteMyAlbumCard'],
    mutationFn: deleteMyAlbumCard,
    onSuccess(result) {
      console.log('삭제 성공', result)
      setIsRefreshed(!isRefreshed)
    },
    onError(error) {
      console.error('삭제 실패:', error)
    },
  })

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

  const handleDelete = async () => {
    try {
      const deletePromises = selectedCards.map(cardId =>
        mutate({ userId: userId, cardId: cardId }),
      )
      await Promise.all(deletePromises)

      setSelectedCards(selectedCards.filter(id => !selectedCards.includes(id)))

      setModalOpen(false)
    } catch (error) {
      console.error('카드 삭제 중 오류 발생:', error)
    }
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

            <Dialog modalType="alert" open={modalOpen}>
              <DialogTrigger disableButtonEnhancement>
                <Popover openOnHover={true} mouseLeaveDelay={0.1}>
                  <PopoverTrigger disableButtonEnhancement>
                    <Button
                      appearance="transparent"
                      size="small"
                      css={buttonStyles}
                      onClick={() => setModalOpen(true)}
                    >
                      <Delete24Filled />
                    </Button>
                  </PopoverTrigger>

                  <PopoverSurface tabIndex={-1}>
                    <Text typography="t9"> 선택한 명함 삭제하기</Text>
                  </PopoverSurface>
                </Popover>
              </DialogTrigger>
              <DialogSurface>
                <DialogBody>
                  <DialogTitle>
                    선택하신 {selectedCards.length}개의 명함을 전부
                    삭제하시겠습니까?
                  </DialogTitle>
                  <DialogActions>
                    <Button
                      shape="circular"
                      css={buttonStyles3}
                      onClick={handleDelete}
                    >
                      삭제
                    </Button>
                    <DialogTrigger disableButtonEnhancement>
                      <Button
                        shape="circular"
                        css={buttonStyles2}
                        onClick={() => {
                          setModalOpen(false)
                        }}
                      >
                        취소
                      </Button>
                    </DialogTrigger>
                  </DialogActions>
                </DialogBody>
              </DialogSurface>
            </Dialog>

            <WebUploadFromFile />
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
const buttonStyles3 = css`
  background-color: #f00;
  color: white;
`
const buttonStyles2 = css`
  background-color: ${colors.poscoSilver};
  color: white;
`
