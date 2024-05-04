/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import { useEffect, useRef, useState } from 'react'
import { colors } from '@/styles/colorPalette'
import InfoEdit from '../../mobile/MyCard/MyCardDetail/InfoEdit'
import WebAlbumCardInfo from './WebAlbumCardInfo'
import WebAlbumDetailTopBar from './WebAlbumDetailTopBar'
import { useRecoilValue } from 'recoil'
import { selectedCardState } from '@/stores/card'
import { tokens } from '@fluentui/react-components'
import TextButton from '@/components/shared/TextButton'

import { Edit16Filled } from '@fluentui/react-icons'

declare global {
  interface Window {
    kakao: any
  }
}

interface LatLng {
  x: number
  y: number
}

const WebAlbumDetail = ({
  setIsDetail,
}: {
  setIsDetail: (isDetail: boolean) => void
}) => {
  const selectedCard = useRecoilValue(selectedCardState)
  const mapContainer = useRef(null)
  const [positionArr, setPositionArr] = useState<LatLng>({
    y: 37.3891408885668,
    x: 126.644442676851,
  })

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
              setPositionArr({ y: result[0].y, x: result[0].x })

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

  const [editOpen, setEditOpen] = useState(false)
  if (editOpen) return <InfoEdit value={editOpen} setValue={setEditOpen} />

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
                href={`https://map.kakao.com/link/to/${selectedCard.address},${positionArr.y},${positionArr.x}`}
                target="_blank"
                rel="noreferrer"
              >
                길찾기
              </a>
            </div>
            <Spacing size={20} />
            <Flex justify="space-between">
              <Text typography="t6">메모</Text>
              <TextButton
                onClick={() => {
                  // TODO: 메모 수정 로직
                }}
              >
                <Edit16Filled /> 수정
              </TextButton>
            </Flex>

            <div css={memoBoxStyles}>{/* TODO: 메모 내용 */}</div>
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
`
