/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/colorPalette'
import { CardType } from '@/types/cardType'
import { css } from '@emotion/react'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import { useEffect, useRef, useState } from 'react'

// declare global {
//   interface Window {
//     kakao: any
//   }
// }

interface LatLng {
  x: number
  y: number
}

const DetailMapSection = ({card, }:{card:CardType}) => {
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
          card.address,
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
  }, [card.address])

  return (
    <div>
      <div css={mapWrapperStyles}>
        <div ref={mapContainer} css={mapContainerStyles}></div>
        <a
          css={findWayButtonStyles}
          href={`https://map.kakao.com/link/to/${card.address},${positionArr.y},${positionArr.x}`}
          target="_blank"
          rel="noreferrer"
        >
          길찾기
        </a>
      </div>
    </div>
  )
}

export default DetailMapSection

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