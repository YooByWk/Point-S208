/** @jsxImportSource @emotion/react */
import Text from '@/components/shared/Text'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import { themeState } from '@/stores/common'
import Input from '@/components/shared/Input'
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
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-components'
import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { backCardState, frontCardState, isFrontState } from '@/stores/card'
import { cameraState } from '@/stores/emptyCard'
import { ExternalCardType } from '@/types/ExternalCard'
import { CardType } from '@/types/cardType'
import NewlyAdded from './NewlyAdded'
import { useShareCard } from '@/hooks/useShareCard'
import { Dismiss24Filled } from '@fluentui/react-icons';
import { MailRead48Filled } from '@fluentui/react-icons';
import { ArrowCircleDown48Filled } from '@fluentui/react-icons';

const BottomSection = ({
  list,
  setIsDetail,
}: {
  list: ExternalCardType[] | CardType[]
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const theme = useRecoilValue(themeState)
  const setCamera = useSetRecoilState(cameraState)
  const isFront = useRecoilValue(isFrontState)
  const frontCard = useRecoilValue(frontCardState)
  const backCard = useRecoilValue(backCardState)
  const card = isFront ? frontCard : backCard
  const [openItems, setOpenItems] = useState(['0'])
  const handleToggle: AccordionToggleEventHandler<string> = (event, data) => {
    setOpenItems(data.openItems)
  }

  const shareCardMutation = useShareCard()

  const [isEmail, setIsEmail] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const handleEmailClick = () => {
      setIsEmail(!isEmail)
  }
  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen)
  }
  const handleEmailInput = (e: any) => {
   setEmailInput(e.target.value)
  }
  // console.log(card)
  const handleEmailSubmit = () => {
    console.log(emailInput)
    shareCardMutation.mutate({id: card.cardId, email: emailInput})
    setIsModalOpen(!isModalOpen)
    
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
            <Flex css={setMaxHeight}>
              {list.length === 0 ? (
                <>
                  <Text textAlign="center" typography="t9">
                    새로 추가된 명함이 없습니다.
                  </Text>
                </>
              ) : (
                list.slice(0, 5).map(
                  (
                    card,
                    index, // Use slice(0, 5) to get only the first 5 cards
                  ) => (
                    <div key={index}>
                      <NewlyAdded card={card} setIsDetail={setIsDetail} />
                    </div>
                  ),
                )
              )}
            </Flex>
          </AccordionPanel>
        </AccordionItem>
        {/* <AccordionItem value="2" css={itemStyle(theme)}>
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
        </AccordionItem> */}
      </Accordion>

      <Spacing size={12} />

      <Flex justify="space-around">
        <Button shape="circular" onClick={() => setCamera(true)}>
          {card.realPicture ? '재등록' : '명함 촬영'}
        </Button>
        <Dialog modalType="alert" open={isModalOpen}>
          <DialogTrigger disableButtonEnhancement>
            <div onClick={() => {}}>
              <Button shape="circular" onClick={handleModalOpen}>
                명함 공유
              </Button>
            </div>
          </DialogTrigger>
          <DialogSurface css={surface}>
            <DialogBody css={body}>
              <DialogTitle>{'공유 방법 선택'}</DialogTitle>
              <DialogContent css={content}>
                <Spacing size={20} direction="vertical" />
                {isEmail && (<>
                <Input  onChange={handleEmailInput}  placeholder="이메일 주소를 입력해주세요" css={inputCss} />
                <Spacing size={20} direction="vertical" />
                </>
                
                )}
                {!isEmail?
                  (<Flex direction="row" align="center" justify="center">
                    <DialogActions css={fui}>
                      <div css={dismissCss}>
                        <DialogTrigger disableButtonEnhancement>
                        <Flex direction='column' align='center' justify='center'>
                          <Dismiss24Filled />
                        </Flex>
                        </DialogTrigger>
                      </div>
                      <DialogTrigger disableButtonEnhancement>
                      <Flex direction='column' align='center' justify='center' onClick={handleEmailClick}>
                        <MailRead48Filled />
                        <Text typography='t9'>이메일</Text>
                      </Flex>
                      </DialogTrigger>
                      <DialogTrigger disableButtonEnhancement>
                      <Flex direction='column' align='center' justify='center'>
                      <ArrowCircleDown48Filled  />
                      <Text typography='t9'>파일 저장</Text>  
                      </Flex>
                      </DialogTrigger>
                    </DialogActions>
                  </Flex>) : (
                    <Flex direction="row" align="center" justify="center">
                      <DialogActions css={fui}>
                        <DialogTrigger disableButtonEnhancement>
                          <Button appearance="primary" onClick={handleEmailSubmit}>
                            공유하기
                          </Button>
                        </DialogTrigger>
                        <DialogTrigger disableButtonEnhancement>
                          <Button appearance="secondary" onClick={() => {
                            handleModalOpen()
                            setIsEmail(!isEmail)
                          }}>
                            취소
                          </Button>
                        </DialogTrigger>
                      </DialogActions>
                    </Flex>
                  )
                }
              </DialogContent>
            </DialogBody>
          </DialogSurface>
        </Dialog>
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
const inputCss = css`
  width: 80%;
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

const setMaxHeight = css`
  max-height: 100px;
  overflow-x: auto;
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

const fui = css`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

const dismissCss =css`
  position: absolute;
  right: 0;
  top: 0;

`

const body = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  width: 80vw;
  padding: 0;
  margin: 0;
`

const surface = css`

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  width: 70vw;
`

const content = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  width: 80vw;
  padding: 0;
  margin: 0;
`
