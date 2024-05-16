/** @jsxImportSource @emotion/react */

import Text from '@shared/Text'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userState } from '@/stores/user'
import Dimmed from '@/components/shared/Dimmed'
import Flex from '@/components/shared/Flex'
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
  tokens,
} from '@fluentui/react-components'
import {
  CameraAdd48Regular,
  SlideTextPerson48Regular,
  Dismiss24Regular,
  PersonLink48Filled,
} from '@fluentui/react-icons'
import Spacing from '@/components/shared/Spacing'
import { ChangeEvent, useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TeamListType } from '@/types/TeamListType'
import { cameraState } from '@/stores/emptyCard'
import TextField from '@/components/shared/TextField'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getCardInfo } from '@/apis/card'
import { RegisterOtherCard } from '@/apis/album'
import { RegisterTeamCard } from '@/apis/team'
interface AddCardProps {
  isAddCard: boolean
  setIsAddCard: (isAddCard: boolean) => void
  teamInfo?: TeamListType
}

const AddCard = ({ isAddCard, setIsAddCard, teamInfo }: AddCardProps) => {
  const userId = useRecoilValue(userState).userId
  const [, setIsDirectInput] = useState(false)
  const handleClose = () => {
    setIsAddCard(!isAddCard) // 닫기
  }
  const [modalOpen, setModalOpen] = useState(false)
  const [inputLink, setInputLink] = useState('')

  const setCamera = useSetRecoilState(cameraState)

  const navigate = useNavigate()

  const handleDirectInput = () => {
    setIsAddCard(false)
    setIsDirectInput(true)
    navigate(`/myAlbum/register/${userId}`, {
      state: { isDirectInput: true, teamInfo: teamInfo },
    })
  }

  const handleCameraInput = () => {
    setIsAddCard(false)
    setCamera(true)
    navigate(`/myAlbum/register/${userId}`, { state: { isCameraInput: true } })
  }

  // 링크 등록
  const handleLinkInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputLink(e.target.value)
  }, [])
  const teamAlbumId = Number(useParams().teamAlbumId)
  const queryClient = useQueryClient()
  const { mutate: addOtherCard } = useMutation({
    mutationKey: ['RegisterOtherCard'],
    mutationFn: teamAlbumId ? RegisterTeamCard : RegisterOtherCard,
    onSuccess(result) {
      teamAlbumId
        ? queryClient.invalidateQueries({ queryKey: ['fetchTeamCardsList'] })
        : queryClient.invalidateQueries({
            queryKey: ['fetchMyAlbum', userId, 0],
          })
        window.scrollTo(0, 0)
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
        teamId: teamAlbumId || NaN,
      }
      addOtherCard(params)
    },
    onError(error) {
      console.error('읽어오기 실패:', error)
    },
  })

  const handleAddFromLink = () => {
    const cardIdRegex = /\/(\d+)\/share/
    const cardIdMatch = inputLink.match(cardIdRegex)
    const cardId = cardIdMatch ? cardIdMatch[1] : null
    const cardIdNum = cardId ? parseInt(cardId) : 0

    const emailRegex = /email=([^&]+)/
    const emailMatch = inputLink.match(emailRegex)
    const email = emailMatch ? emailMatch[1] : ''

    getCardInfoMutation({ cardId: cardIdNum, email: email })

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
            <Dismiss24Regular className="X" onClick={handleClose} />
            <Text>명함 등록 방식</Text>
            <Spacing size={20} direction="vertical" />
            <Flex direction="row" justify="space-around" align="center">
              <Flex
                direction="column"
                justify="center"
                align="center"
                onClick={handleCameraInput}
              >
                <CameraAdd48Regular />
                <Text typography="t7">사진 촬영</Text>
              </Flex>

              <Spacing size={10} direction="horizontal" />
              <Flex
                direction="column"
                justify="center"
                align="center"
                onClick={handleDirectInput}
              >
                <SlideTextPerson48Regular />
                <Text typography="t7">직접 입력</Text>
              </Flex>
              <Spacing size={10} direction="horizontal" />

              <Flex>
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
                      <Text typography="t7">링크등록</Text>
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
                        <Button
                          appearance="primary"
                          onClick={handleAddFromLink}
                        >
                          명함 등록
                        </Button>
                      </DialogActions>
                    </DialogBody>
                  </DialogSurface>
                </Dialog>
              </Flex>
            </Flex>
          </div>
        </Flex>
      </Dimmed>
    </>
  )
}

export default AddCard

const container = css`
  height: 100%;
  .in {
    position: relative;
    background-color: ${tokens.colorNeutralBackground1};
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 300px;
    text-align: center;
  }
  .X {
    position: absolute;
    right: 10px;
  }
`
