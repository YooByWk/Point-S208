/** @jsxImportSource @emotion/react */
import Text from '@/components/shared/Text'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import { css } from '@emotion/react'
import {
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
import { useParams } from 'react-router-dom'
import {
  MailRead48Filled,
  Dismiss24Filled,
  PersonLink48Filled,
} from '@fluentui/react-icons'
import Input from '@/components/shared/Input'
import { useShareCard } from '@/hooks/useShareCard'
import { ExternalCardType } from '@/types/ExternalCard'
import { CardType } from '@/types/cardType'

interface DetailBottomSectionProps {
  card: CardType | ExternalCardType
}

const DetailBottomSection = ({ card }: DetailBottomSectionProps) => {
  const params = useParams()
  const cardId: number = Number(params.cardId)
  const shareCardMutation = useShareCard()
  const hostname = window.location.hostname
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

  const handleEmailSubmit = () => {
    shareCardMutation.mutate({ id: cardId, email: emailInput })
    setIsModalOpen(!isModalOpen)
  }

  const handleLinkShare = async (event: React.MouseEvent) => {
    event.stopPropagation()
    const shareableUrl = `https://${hostname}/index.html#/${card.cardId}/share?email=${card.email}&appId=${process.env.REACT_APP_TEAMS_APP_ID}`
    try {
      await navigator.clipboard.writeText(shareableUrl)
      alert('URL이 클립보드에 복사되었습니다.')
    } catch (error) {
      console.error('URL 복사 중 오류가 발생했습니다:', error)
    }
    setIsModalOpen(false)
  }
  return (
    <>
      <hr></hr>
      <Spacing size={12} />
      <Flex justify="space-around">
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
                {isEmail && (
                  <>
                    <Input
                      onChange={handleEmailInput}
                      placeholder="이메일 주소를 입력해주세요"
                      css={inputCss}
                    />
                    <Spacing size={20} direction="vertical" />
                  </>
                )}
                {!isEmail ? (
                  <Flex direction="row" align="center" justify="center">
                    <DialogActions css={fui}>
                      <div css={dismissCss}>
                        <DialogTrigger disableButtonEnhancement>
                          <Flex
                            direction="column"
                            align="center"
                            justify="center"
                            onClick={() => setIsModalOpen(false)}
                          >
                            <Dismiss24Filled />
                          </Flex>
                        </DialogTrigger>
                      </div>
                      <DialogTrigger disableButtonEnhancement>
                        <Flex
                          direction="column"
                          align="center"
                          justify="center"
                          onClick={handleEmailClick}
                        >
                          <MailRead48Filled />
                          <Text typography="t9">이메일</Text>
                        </Flex>
                      </DialogTrigger>
                      <Spacing size={20} direction="horizontal" />
                      <DialogTrigger disableButtonEnhancement>
                        <Flex
                          direction="column"
                          align="center"
                          justify="center"
                          onClick={e => {
                            handleLinkShare(e)
                          }}
                        >
                          <PersonLink48Filled />
                          <Text typography="t9">공유 링크 복사</Text>
                        </Flex>
                      </DialogTrigger>
                    </DialogActions>
                  </Flex>
                ) : (
                  <Flex direction="row" align="center" justify="center">
                    <DialogActions css={fui}>
                      <DialogTrigger disableButtonEnhancement>
                        <Button
                          appearance="primary"
                          onClick={handleEmailSubmit}
                        >
                          공유하기
                        </Button>
                      </DialogTrigger>
                      <DialogTrigger disableButtonEnhancement>
                        <Button
                          appearance="secondary"
                          onClick={() => {
                            handleModalOpen()
                            setIsEmail(!isEmail)
                          }}
                        >
                          취소
                        </Button>
                      </DialogTrigger>
                    </DialogActions>
                  </Flex>
                )}
              </DialogContent>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      </Flex>
      <Spacing size={10} />
    </>
  )
}

export default DetailBottomSection

const inputCss = css`
  width: 80%;
`

const fui = css`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

const dismissCss = css`
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
