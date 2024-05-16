/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useLocation, useParams } from 'react-router-dom'
import Text from '@shared/Text'
import { useEffect, useRef, useState } from 'react'
import LargeButton from './shared/LargeButton'
import { useMutation } from '@tanstack/react-query'
import { getCardInfo } from '@/apis/card'
import { useRecoilState } from 'recoil'
import { selectedCardState } from '@/stores/card'
import { tokens } from '@fluentui/react-components'
import Flex from './shared/Flex'
import Spacing from './shared/Spacing'
import WebAlbumCardInfo from './web/WebAlbum/WebAlbumCardInfo'
import { colors } from '@/styles/colorPalette'
import { app } from '@microsoft/teams-js'

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

const EmailComponent = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedCard, setSelectedCard] = useRecoilState(selectedCardState)
  const mapContainer = useRef(null)
  const [positionArr, setPositionArr] = useState<LatLng>({
    y: 37.3891408885668,
    x: 126.644442676851,
    loc: '포스코인터내셔널 송도본사',
  })

  const location = useLocation()
  const { cardId } = useParams()
  const cardIdNum = cardId ? parseInt(cardId) : 0
  const queryParams = new URLSearchParams(location.search)
  const emailParam = queryParams.get('email')
  const email = emailParam ? decodeURIComponent(emailParam) : ''
  const appIdParam = queryParams.get('appId')
  const appId = appIdParam ? decodeURIComponent(appIdParam) : ''

  const handleAdd = async () => {
    app.getContext().then((context: app.Context) => {
      // console.log('context: ', context.page.id)
      // console.log('context: ', context.page.subPageId)

      // console.log('appId: ', appId)
      const externalUrl = `https://teams.microsoft.com/l/entity/${appId}/myAlbum`
      // console.log(externalUrl)
      window.location.href = externalUrl
    })
  }

  const { mutate: getCardInfoMutation } = useMutation({
    mutationKey: ['getCardInfo'],
    mutationFn: getCardInfo,
    onSuccess(result) {
      // console.log('읽어오기 성공', result)
      setSelectedCard(result)
    },
    onError(error) {
      setErrorMessage(error.toString())
      console.error('읽어오기 실패:', error)
    },
  })

  useEffect(() => {
    getCardInfoMutation({ cardId: cardIdNum, email: email })
  }, [cardIdNum, email, getCardInfoMutation])

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
              // console.log(result)
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
              // console.log('kakao map is not available')
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

  return (
    <div>
      {email && selectedCard && !errorMessage ? (
        <>
          <Flex
            direction="column"
            justify="center"
            align="center"
            css={containerStyles}
          >
            <Spacing size={10} />
            <WebAlbumCardInfo />
            {selectedCard.address && (
              <Flex direction="column" css={boxStyles}>
                <Text typography="t5" bold={true}>
                  지도
                </Text>
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
              </Flex>
            )}
          </Flex>
          <div css={buttonCss}>
            <LargeButton text="Teams로 이동" width="80%" onClick={handleAdd} />
          </div>
          )
        </>
      ) : (
        <Text>유효하지 않은 링크입니다.</Text>
      )}
    </div>
  )
}

export default EmailComponent

const buttonCss = css`
  position: fixed;
  width: 100%;
  bottom: 0px;
  height: 45px;
  background-color: ${tokens.colorNeutralBackground1};
  z-index: 1000;
`

const containerStyles = css`
  padding-top: 10px;
  padding-bottom: 50px;
  border-right: 1px solid ${colors.themeGray};
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

const boxStyles = css`
  width: 46vw;
`
