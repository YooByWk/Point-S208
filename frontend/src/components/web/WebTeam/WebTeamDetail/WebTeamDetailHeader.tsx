/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
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
import { selectedTeamIdState } from '@/stores/team'
import styled from '@emotion/styled'
import { useState } from 'react'

const WebTeamDetailHeader = (props: Partial<TabListProps>) => {
  const selectedTeam = useRecoilValue(selectedTeamIdState)
  const resetSelectedTeam = useResetRecoilState(selectedTeamIdState)
  const [value, setValue] = useState('')
  console.log(value)

  return (
    <>
      <Flex direction="column" css={boxStyles}>
        <Flex justify="space-between" align="center">
          <Flex align="center">
            <BackButton onClick={() => resetSelectedTeam()} css={textStyles}>
              <ArrowLeft24Regular />
              <Text typography="t7"> 뒤로가기 </Text>
            </BackButton>
            <Spacing size={20} direction="horizontal" />
            <SearchBox
              appearance="underline"
              placeholder="명함을 검색해 주세요"
              onChange={(e: any) => setValue(e.target.value)}
            />
          </Flex>
          <Flex align="center">
            <ArrowSort24Filled css={iconStyles} />
            <TabList {...props} defaultSelectedValue="newly">
              <Tab value="newly">최신순</Tab>
              <Tab value="name">이름순</Tab>
              <Tab value="company">회사명순</Tab>
            </TabList>
            <Filter24Filled css={iconStyles} />
            <TabList {...props} defaultSelectedValue="none">
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
            <Checkbox shape="circular" label="" />
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <MenuButton
                  appearance="transparent"
                  icon={<ChevronDownRegular />}
                />
              </MenuTrigger>

              <MenuPopover>
                <MenuList>
                  <MenuItem>전체 선택</MenuItem>
                  <MenuItem>전체 취소</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
            <Text typography="t9" color="themeMainBlue">
              0개 선택됨
            </Text>
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
  cursor: pointer;
`

// css

const boxStyles = css`
  position: fixed;
  padding: 5px 24px;
  width: 100%;
  z-index: 1000;
`

const iconStyles = css`
  color: ${colors.themeMainBlue};
`

const buttonStyles = css`
  padding: 0;
  margin: 0;
`

const textStyles = css`
  white-space: nowrap;
`
