/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { ChangeEvent, useCallback, useState } from 'react'
import { cameraState } from '@/stores/emptyCard'
import { isAddCardByInfoState } from '@/stores/album'
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  tokens,
} from '@fluentui/react-components'
import {
  SlideTextPerson48Regular,
  Dismiss24Regular,
  Image48Regular,
  PersonLink48Filled,
} from '@fluentui/react-icons'
import Dimmed from '@shared/Dimmed'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import TextField from '@/components/shared/TextField'
import { useMutation } from '@tanstack/react-query'
import { getCardInfo } from '@/apis/card'
import { RegisterOtherCard } from '@/apis/album'
import { userState } from '@/stores/user'
import { isRefreshedAlbumState } from '@/stores/card'

interface AddCardProps {
  isAddCard: boolean
  setIsAddCard: (isAddCard: boolean) => void
}

const WebAddCard = ({ isAddCard, setIsAddCard }: AddCardProps) => {
  const userId = useRecoilValue(userState).userId
  const setIsAddCardByInfo = useSetRecoilState(isAddCardByInfoState)
  const setCamera = useSetRecoilState(cameraState)
  const [isRefreshAlbum, setIsRefreshAlbum] = useRecoilState(
    isRefreshedAlbumState,
  )
  const [modalOpen, setModalOpen] = useState(false)
  const [inputLink, setInputLink] = useState('')

  const handleClose = () => {
    setIsAddCard(!isAddCard)
  }

  const handleDirectInput = () => {
    setIsAddCard(!isAddCard)
    setIsAddCardByInfo(true)
  }

  const handleImageInput = () => {
    setIsAddCard(!isAddCard)
    setCamera(true)
  }

  const { mutate: addOtherCard } = useMutation({
    mutationKey: ['RegisterOtherCard'],
    mutationFn: RegisterOtherCard,
    onSuccess(result) {
      setIsRefreshAlbum(!isRefreshAlbum)
    },
    onError(error) {
      console.error('타인 명함 등록 실패:', error)
    },
  })

  const { mutate: getCardInfoMutation } = useMutation({
    mutationKey: ['getCardInfo'],
    mutationFn: getCardInfo,
    onSuccess(result) {
      let params = {
        userId: userId as number,
        data: result,
      }
      addOtherCard(params)
    },
    onError(error) {
      console.error('읽어오기 실패:', error)
    },
  })

  const handleLinkInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputLink(e.target.value)
  }, [])

  const handleAddFromLink = () => {
    const cardIdRegex = /\/([^/]+)\/share\?email=/
    const cardIdMatch = inputLink.match(cardIdRegex)
    const cardId = cardIdMatch ? cardIdMatch[1] : null
    //const cardIdNum = cardId ? parseInt(cardId) : 0

    const emailRegex = /email=([^&]+)/
    const emailMatch = inputLink.match(emailRegex)
    const email = emailMatch ? emailMatch[1] : ''

    const cardIdDecoded = atob(cardId || '')
    const cardIdNum = cardId ? parseInt(cardIdDecoded) : 0
    const emailDecoded = atob(email || '')

    getCardInfoMutation({ cardId: cardIdNum, email: emailDecoded })

    setModalOpen(false)
    setIsAddCard(!isAddCard) // 닫기
  }

  return (
    <>
      <Dimmed>
        <Flex
          direction="column"
          justify="center"
          align="center"
          css={container}
        >
          <div className="in">
            <Dismiss24Regular
              className="X"
              onClick={handleClose}
              style={{ cursor: 'pointer' }}
            />
            <Text>명함 등록 방식</Text>
            <Spacing size={20} direction="vertical" />
            <Flex direction="row" justify="space-around" align="center">
              <Flex
                direction="column"
                justify="center"
                align="center"
                onClick={handleImageInput}
                style={{ cursor: 'pointer' }}
              >
                <Image48Regular />
                <Text typography="t7">이미지 등록</Text>
              </Flex>

              <Spacing size={20} direction="horizontal" />
              <Flex
                direction="column"
                justify="center"
                align="center"
                onClick={handleDirectInput}
                style={{ cursor: 'pointer' }}
              >
                <SlideTextPerson48Regular />
                <Text typography="t7">직접 입력</Text>
              </Flex>

              <Spacing size={20} direction="horizontal" />
              <Dialog open={modalOpen}>
                <DialogTrigger disableButtonEnhancement>
                  <Flex
                    direction="column"
                    justify="center"
                    align="center"
                    onClick={() => {
                      setModalOpen(true)
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <PersonLink48Filled />
                    <Text typography="t7">링크로 등록</Text>
                  </Flex>
                </DialogTrigger>
                <DialogSurface>
                  <DialogBody>
                    <DialogTitle>링크를 입력해주세요</DialogTitle>
                    <DialogContent>
                      <TextField onChange={handleLinkInput} />
                    </DialogContent>
                    <DialogActions>
                      <DialogTrigger disableButtonEnhancement>
                        <Button
                          appearance="secondary"
                          onClick={() => {
                            setModalOpen(false)
                          }}
                        >
                          취소
                        </Button>
                      </DialogTrigger>
                      <Button appearance="primary" onClick={handleAddFromLink}>
                        명함 등록
                      </Button>
                    </DialogActions>
                  </DialogBody>
                </DialogSurface>
              </Dialog>
            </Flex>
          </div>
        </Flex>
      </Dimmed>
    </>
  )
}

export default WebAddCard

const container = css`
  height: 100%;

  .in {
    position: relative;
    background-color: ${tokens.colorNeutralBackground1};
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 400px;
    text-align: center;
  }

  .X {
    position: absolute;
    right: 10px;
  }
`
