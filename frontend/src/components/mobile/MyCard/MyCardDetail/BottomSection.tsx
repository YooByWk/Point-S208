/** @jsxImportSource @emotion/react */
import Text from '@/components/shared/Text'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import { themeState } from '@/stores/common'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionToggleEventHandler,
  Button,
} from '@fluentui/react-components'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { backCardState, frontCardState, isFrontState } from '@/stores/card'
import { BooleanStateType } from '@/types/commonType'

const BottomSection = (props: BooleanStateType) => {
  const { setValue } = props
  const theme = useRecoilValue(themeState)
  const isFront = useRecoilValue(isFrontState)
  const frontCard = useRecoilValue(frontCardState)
  const backCard = useRecoilValue(backCardState)
  const card = isFront ? frontCard : backCard
  const [openItems, setOpenItems] = useState(['0'])
  const handleToggle: AccordionToggleEventHandler<string> = (event, data) => {
    setOpenItems(data.openItems)
  }

  return (
    <>
      <Accordion
        openItems={openItems}
        onToggle={handleToggle}
        multiple
        collapsible
        css={containerStyle}
      >
        <AccordionItem value="1" css={itemStyle(theme)}>
          <AccordionHeader expandIconPosition="end">
            <Text typography="t8">최근 등록한 명함</Text>
          </AccordionHeader>
          <AccordionPanel>
            <Wrap>
              <Card />
              <Card />
              <Card />
            </Wrap>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="2" css={itemStyle(theme)}>
          <AccordionHeader expandIconPosition="end">
            <Text typography="t8">빠른 공유</Text>
          </AccordionHeader>
          <AccordionPanel>
            <Wrap>
              <Flex direction="column" align="center">
                <People />
                <p>김싸피</p>
              </Flex>
              <Flex direction="column" align="center">
                <People />
                <p>김싸피</p>
              </Flex>
            </Wrap>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Spacing size={12} />

      <Flex justify="space-around">
        <Button shape="circular" onClick={() => setValue(true)}>
          {card.realPicture ? '재등록' : '명함 촬영'}
        </Button>
        <Button shape="circular" onClick={() => {}}>
          명함 공유
        </Button>
      </Flex>

      <Spacing size={24} />
    </>
  )
}

export default BottomSection

// style

const Wrap = styled.div`
  display: flex;
  gap: 30px;
  margin: 0 20px 20px;
`

const Card = styled.div`
  width: 80px;
  height: 80px;
  border: 1px solid ${colors.themeText};
`

const People = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid ${colors.themeText};
  border-radius: 50px;
  margin-bottom: 5px;
`

// css

const containerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${colors.themeTextInverted};
  padding: 10px;
`

const itemStyle = (theme: string) => css`
  background-color: ${theme === 'dark' ? '#242424' : '#fafafa'};
  border-radius: 15px;
`
