/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import { useEffect, useRef, useState } from 'react'
import { colors } from '@/styles/colorPalette'
import WebAlbumCardInfo from './WebAlbumCardInfo'
import WebAlbumDetailTopBar from './WebAlbumDetailTopBar'
import { useRecoilState, useRecoilValue } from 'recoil'
import { selectedCardState } from '@/stores/card'
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTrigger,
  Field,
  Textarea,
  TextareaProps,
  tokens,
} from '@fluentui/react-components'

import { Edit16Filled } from '@fluentui/react-icons'
import { useMutation } from '@tanstack/react-query'
import { editMyAlbumMemo } from '@/apis/album'
import { userState } from '@/stores/user'

declare global {
  interface Window {
    kakao: any
  }
}

interface LatLng {
  x: number
  y: number
  loc: string
}

const WebAlbumDetail = ({
  setIsDetail,
  setEditOpen,
}: {
  setIsDetail: (isDetail: boolean) => void
  setEditOpen: (isDetail: boolean) => void
}) => {
  const [selectedCard, setSelectedCard] = useRecoilState(selectedCardState)
  const mapContainer = useRef(null)
  const [positionArr, setPositionArr] = useState<LatLng>({
    y: 37.3891408885668,
    x: 126.644442676851,
    loc: '포스코인터네셔널 송도본사',
  })
  const [editMemo, setEditMemo] = useState(selectedCard.memo)
  const [modalOpen, setModalOpen] = useState(false)
  const userId = useRecoilValue(userState).userId as number

  useEffect(() => {
    const script = document.createElement('script')
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_KEY}&libraries=services&autoload=false`
    script.async = true

    document.head.appendChild(script)

    script.onload = () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder()

        geocoder.addressSearch(
          selectedCard.address,
          function (result: LatLng[], status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
              console.log(result)
              setPositionArr({
                y: result[0].y,
                x: result[0].x,
                loc: selectedCard.address,
              })

              const position = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x,
              )

              const options = {
                center: position,
                level: 4,
              }

              const marker = new window.kakao.maps.Marker({
                position,
              })
              const map = new window.kakao.maps.Map(
                mapContainer.current,
                options,
              )
              marker.setMap(map)
            } else {
              console.log('kakao map is not available')
              const position = new window.kakao.maps.LatLng(
                positionArr.y,
                positionArr.x,
              )

              const options = {
                center: position,
                level: 4,
              }

              const marker = new window.kakao.maps.Marker({
                position,
              })
              const map = new window.kakao.maps.Map(
                mapContainer.current,
                options,
              )
              marker.setMap(map)
            }
          },
        )
      })
    }
  }, [selectedCard.address])

  const { mutate } = useMutation({
    mutationKey: ['editMyAlbumMemo'],
    mutationFn: editMyAlbumMemo,
    onSuccess(result) {
      console.log('수정 성공', result)
    },
    onError(error) {
      console.error('수정 실패:', error)
    },
  })

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()

    let params = {
      userId: userId,
      cardId: selectedCard.cardId,
      data: {
        memo: editMemo,
      },
    }
    mutate(params)

    setSelectedCard(prev => ({ ...prev, memo: editMemo }))
  }

  const onChange: TextareaProps['onChange'] = (ev, data) => {
    setEditMemo(data.value)
  }

  return (
    <>
      <Flex justify="center">
        <Flex direction="column" css={containerStyles}>
          <WebAlbumDetailTopBar
            setIsDetail={setIsDetail}
            setEditOpen={setEditOpen}
          />
          <Spacing size={10} />
          <WebAlbumCardInfo />
        </Flex>
        <div css={boxStyles}>
          <Flex direction="column">
            <Text typography="t6">지도</Text>
            <div css={mapWrapperStyles}>
              <div ref={mapContainer} css={mapContainerStyles}></div>
              <a
                css={findWayButtonStyles}
                href={`https://map.kakao.com/link/to/${positionArr.loc},${positionArr.y},${positionArr.x}`}
                target="_blank"
                rel="noreferrer"
              >
                길찾기
              </a>
            </div>
            <Spacing size={20} />
            <Flex justify="space-between">
              <Text typography="t6">메모</Text>

              <Dialog modalType="alert" open={modalOpen}>
                <DialogTrigger disableButtonEnhancement>
                  <Button
                    shape="circular"
                    onClick={() => {
                      setEditMemo(selectedCard.memo)
                      setModalOpen(true)
                    }}
                  >
                    <Text typography="t7">
                      <Edit16Filled /> 수정
                    </Text>
                  </Button>
                </DialogTrigger>
                <DialogSurface aria-describedby={undefined}>
                  <form onSubmit={handleSubmit}>
                    <DialogBody>
                      <DialogContent>
                        <Field label="메모 수정">
                          <Textarea
                            appearance="outline"
                            onChange={onChange}
                            value={editMemo}
                            resize="none"
                          />
                        </Field>
                      </DialogContent>
                      <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                          <Button
                            appearance="secondary"
                            shape="circular"
                            onClick={() => setModalOpen(false)}
                          >
                            취소
                          </Button>
                        </DialogTrigger>
                        <Button
                          type="submit"
                          appearance="primary"
                          shape="circular"
                          onClick={() => setModalOpen(false)}
                        >
                          수정
                        </Button>
                      </DialogActions>
                    </DialogBody>
                  </form>
                </DialogSurface>
              </Dialog>
            </Flex>

            <div css={memoBoxStyles}>
              <Text typography="t8">
                {selectedCard.memo
                  ? selectedCard.memo
                  : '등록된 메모가 없습니다.'}
              </Text>
            </div>
          </Flex>
        </div>
      </Flex>
    </>
  )
}

export default WebAlbumDetail

const containerStyles = css`
  padding-top: 10px;
  border-right: 1px solid ${colors.themeGray};
`

const boxStyles = css`
  width: 46vw;
  padding: 10px;
`

const mapContainerStyles = css`
  height: 50vh;
`

const mapWrapperStyles = css`
  position: relative;
`

const findWayButtonStyles = css`
  border: 1px solid ${colors.themeText};
  padding: 8px 32px;
  z-index: 2;
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${colors.themeTextInverted};
  color: ${colors.themeText};
  text-decoration: none;
  border-radius: 32px;
`

const memoBoxStyles = css`
  border-radius: 10px;
  background-color: ${tokens.colorNeutralBackground1Selected};
  margin: 20px;
  width: 42vw;
  height: 30vh;
  padding: 10px;
  overflow-y: scroll;
`
