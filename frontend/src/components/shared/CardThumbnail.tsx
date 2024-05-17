/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react'
import type { CardType } from '@/types/cardType'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import { css, keyframes } from '@emotion/react'
import Spacing from '@/components/shared/Spacing'
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Input,
  tokens,
} from '@fluentui/react-components'
import {
  CheckmarkCircle24Regular,
  Circle24Regular,
  ShareAndroid24Filled,
  Delete24Filled,
  MailRead48Filled,
  Dismiss24Filled,
  PersonLink48Filled,
} from '@fluentui/react-icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userState } from '@/stores/user'
import { ExternalCardType } from '@/types/ExternalCard'
import EmptyThumbnail from '@/components/shared/EmptyThumbnail'
import { useDeleteAlbumCard } from '@/hooks/useDeleteAlbumCard'
import SmallModal from '@/components/shared/SmallModal'
import { useDeleteTeamAlbumCard } from '@/hooks/Team/useDeleteTeamAlbumCard'
import { useShareCard } from '@/hooks/useShareCard'

interface CardThumbnailProps {
  cardInfo: CardType | ExternalCardType
  onSelect: (cardId: number) => void
  selectedCards: number[]
  forShare?: boolean
  scale?: number
  teamId?: number
  index?: number
}

const CardThumbnail = ({
  cardInfo,
  onSelect,
  selectedCards,
  forShare = false,
  scale = 1,
  index = NaN,
}: CardThumbnailProps) => {
  const [isChecked, setIsChecked] = useState(false)
  const isSelected = selectedCards.includes(cardInfo.cardId)
  const userId = useRecoilValue(userState).userId
  const myAlbumDeletemutation = useDeleteAlbumCard()
  const teamAlbumDeleteMutation = useDeleteTeamAlbumCard()
  const teamAlbumId = useParams()?.teamAlbumId
  const [isFirstRender, setIsFirstRender] = useState(true)
  const hostname = window.location.hostname

  function delaySetIsFirstRender() {
    setTimeout(() => {
      setIsFirstRender(false)
    }, index * 200)
  }
  useEffect(() => {
    delaySetIsFirstRender()
  }, [isFirstRender])
  const handleCheck = (event: React.MouseEvent) => {
    event.stopPropagation()
    setIsChecked(!isChecked)
    onSelect(cardInfo.cardId)
  }

  const handleShare = (event: React.MouseEvent) => {
    event.stopPropagation()
    setIsModalOpen(!isModalOpen)
  }
  const handleDelete = () => {
    if (teamAlbumId) {
      // 팀 앨범의 명함 삭제
      teamAlbumDeleteMutation.mutate({
        cardId: cardInfo.cardId,
        teamAlbumId: +teamAlbumId,
      })
      return
    }
    myAlbumDeletemutation.mutate(cardInfo.cardId)
  }
  const shareCardMutation = useShareCard()
  const [isEmail, setIsEmail] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const handleEmailClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    setIsEmail(!isEmail)
  }
  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen)
  }
  const handleEmailInput = (e: any) => {
    setEmailInput(e.target.value)
  }

  const handleEmailSubmit = (event: React.MouseEvent) => {
    event.stopPropagation()
    shareCardMutation.mutate({ id: cardInfo.cardId, email: emailInput })
    setIsModalOpen(!isModalOpen)
  }

  const handleLinkShare = async (event: React.MouseEvent) => {
    event.stopPropagation()
    const shareableUrl = `https://${hostname}/index.html#/${cardInfo.cardId}/share?email=${cardInfo.email}&appId=${process.env.REACT_APP_TEAMS_APP_ID}`
    try {
      await navigator.clipboard.writeText(shareableUrl)
      alert('URL이 클립보드에 복사되었습니다.')
    } catch (error) {
      console.error('URL 복사 중 오류가 발생했습니다:', error)
    }
    setIsModalOpen(false)
  }

  const navigate = useNavigate()
  return (
    <div
      css={cardContainer(forShare, scale, index, isFirstRender)}
      onClick={() => {
        if (forShare) {
          setIsChecked(!isChecked)
          onSelect(cardInfo.cardId)
        } else {
          teamAlbumId
            ? navigate(`${cardInfo.cardId}`, {
                state: { cardInfo, teamAlbumId },
              })
            : navigate(`/myAlbum/${userId}/${cardInfo.cardId}`, {
                state: { cardInfo },
              })
        }
      }}
    >
      {isSelected ? (
        <CheckmarkCircle24Regular onClick={handleCheck} />
      ) : (
        <Circle24Regular onClick={handleCheck} />
      )}
      <Flex direction="row" justify="space-around" align="center">
        <Flex direction="column" justify="center" align="center" css={infoCss}>
          <Text typography="t8" bold={true}>
            {cardInfo.name.length > 6 &&
            /[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/g.test(cardInfo.name)
              ? `${cardInfo.name.slice(0, 6)}...`
              : cardInfo.name.length > 15
              ? `${cardInfo.name.slice(0, 15)}...`
              : cardInfo.name.padEnd(6, ' ')}
          </Text>
          <Text typography="t9" css={infoContent}>
            {cardInfo.company}
          </Text>
          {cardInfo.department && (
            <Text typography="t9" css={infoContent}>
              {cardInfo.department}
            </Text>
          )}
          {cardInfo.position && (
            <Text typography="t9" css={infoContent}>
              {cardInfo.position}
            </Text>
          )}
        </Flex>

        {cardInfo.realPicture || cardInfo.digitalPicture ? (
          <img
            src={
              cardInfo.realPicture
                ? cardInfo.realPicture
                : cardInfo.digitalPicture
            }
            alt="card"
            css={imgStyle}
          />
        ) : (
          <div>
            <EmptyThumbnail />
          </div>
        )}
        {!forShare && (
          <Flex direction="column" justify="space-around" align="center">
            <div onClick={event => event.stopPropagation()}>
              <Dialog
                modalType="alert"
                open={isModalOpen}
                inertTrapFocus={true}
              >
                <DialogTrigger disableButtonEnhancement>
                  <ShareAndroid24Filled css={i} onClick={handleShare} />
                </DialogTrigger>
                <DialogSurface css={surface}>
                  <DialogBody css={body}>
                    <DialogTitle>{'공유 방법 선택'}</DialogTitle>
                    <DialogContent css={content}>
                      <Spacing size={20} direction="vertical" />
                      {isEmail && (
                        <>
                          <Input
                            onClick={event => event.stopPropagation()}
                            onChange={handleEmailInput}
                            placeholder="이메일 주소를 입력해주세요"
                            css={inputCss}
                          />
                          <Spacing size={20} direction="vertical" />
                        </>
                      )}
                      {!isEmail ? (
                        <Flex
                          direction="row"
                          align="center"
                          justify="space-around"
                        >
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
                                onClick={(event: React.MouseEvent) => {
                                  event.stopPropagation()
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
            </div>

            <SmallModal
              icon={<Delete24Filled />}
              dialogTitle="명함 삭제"
              dialogContent={`${cardInfo.name}님의 명함을 삭제하시겠습니까?`}
              onClick={e => {
                e.stopPropagation()
                handleDelete()
              }}
              onIconClick={(e: React.MouseEvent) => e.stopPropagation()}
              actionButtonText="삭제"
            />
          </Flex>
        )}
      </Flex>
      <Spacing size={10} direction="vertical" />
    </div>
  )
}

export default CardThumbnail

// css

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const cardContainer = (
  forShare: boolean,
  scale: number,
  index: number,
  isFirstRender: boolean,
) => css`
  border-radius: 10px;
  width: 85%;
  min-height: 120px;
  margin-bottom: 3%;
  margin-top: 1%;
  background-color: ${tokens.colorNeutralBackground1Selected};
  min-height: 100px;
  scale: ${forShare ? scale : 1};
  animation: ${isFirstRender
    ? css`
        ${fadeIn} 0.15s linear forwards
      `
    : 'none'};
  opacity: ${isFirstRender ? 0 : 1};
  animation-delay: ${isNaN(index) ? 0 : index * 0.12}s;

  &:hover,
  &:active,
  &.wave {
    animation: wave 1.2s ease;
    background: linear-gradient(
      90deg,
      ${tokens.colorNeutralBackground1Selected} 6%,
      ${tokens.colorNeutralBackground4Hover} 100%
    );
    background-size: 200% 200%;
  }
  @keyframes wave {
    0% {
      background-position: 10% 50%;
    }
    100% {
      background-position: 80% 50%;
    }
  }
`

const i = css`
  margin-bottom: 15px;
`

const infoContent = css`
  overflow: hidden;
  max-width: 140px;
  text-align: center;
`

const infoCss = css`
  min-width: 132px;
  max-width: 160px;
  overflow: hidden;
`
const imgStyle = css`
  width: 115px;
`

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
