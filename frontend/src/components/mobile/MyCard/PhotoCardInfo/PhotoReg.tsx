/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Flex from '@/components/shared/Flex'
import { cameraState } from '@/stores/emptyCard'
import styled from '@emotion/styled'
import { useEffect, useRef, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import {
  Dismiss20Filled,
  Circle48Regular,
  Image32Regular,
  CheckmarkCircle32Filled,
} from '@fluentui/react-icons'
import Text from '@/components/shared/Text'
import { colors } from '@/styles/colorPalette'
import SwipeableImg from './SwipeableImg'
import { isFirstCardState } from '@/stores/card'
import { useMutation } from '@tanstack/react-query'
import { postOCR } from '@/apis/card'

const PhotoReg = (props: { isMyCard: boolean }) => {
  // My Card Registration or Other people's Card Registration
  const { isMyCard } = props
  const setCamera = useSetRecoilState(cameraState)
  const setIsFirstCard = useSetRecoilState(isFirstCardState)
  const fileInput = useRef<HTMLInputElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [frontImgSrc, setFrontImgSrc] = useState<File | null>(null)
  const [backImgSrc, setBackImgSrc] = useState<File | null>(null)
  const [isFront, setIsFront] = useState<boolean>(true)
  const isImgSrc: boolean =
    (isFront && frontImgSrc) || (!isFront && backImgSrc) ? true : false

  const getCameraStream = async () => {
    try {
      const constraints = { video: { facingMode: 'environment' } }
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error('Camera access error:', err)
    }
  }

  const takePicture = () => {
    if (videoRef.current) {
      const videoElement = videoRef.current
      const canvas = document.createElement('canvas')
      canvas.width = videoElement.videoWidth
      canvas.height = videoElement.videoHeight

      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height)
        canvas.toBlob(blob => {
          if (blob) {
            const file = new File([blob], 'capture.png', { type: 'image/png' })
            if (isFront) {
              setFrontImgSrc(file)
            } else {
              setBackImgSrc(file)
            }
          }
        }, 'image/png')
      }
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      if (isFront) {
        setFrontImgSrc(file)
      } else {
        setBackImgSrc(file)
      }
    }
  }

  const renderImage = () => {
    const imgSrc = isFront ? frontImgSrc : backImgSrc
    const objectURL = imgSrc && URL.createObjectURL(imgSrc)

    return objectURL ? (
      <img src={objectURL} alt="Captured" width="80%" />
    ) : (
      <video ref={videoRef} autoPlay playsInline width="80%" />
    )
  }

  const { mutate } = useMutation({
    mutationKey: ['postOCR'],
    mutationFn: postOCR,
    onSuccess(result) {
      console.log('등록 성공', result)
      if (result) {
        const data = result.images[0].nameCard.result
        console.log(data)
        let cardInfo = {
          name: data.name?.[0].text || '',
          company: data.company?.[0].text || '',
          position: data.position?.[0].text || '',
          rank: data.rank?.[0].text || '',
          department: data.department?.[0].text || '',
          email: data.email?.[0].text || '',
          landlineNumber: data.landlineNumber?.[0].text || '',
          faxNumber: data.faxNumber?.[0].text || '',
          phoneNumber: data.mobile?.[0].text || '',
          address: data.address?.[0].text || '',
          domainUrl: data.domainUrl?.[0].text || '',
        }
        // cardInfo를 params로 명함 등록 api 요청
      }
      setIsFirstCard(false)
      setCamera(false)
    },
    onError(error) {
      console.error('등록 실패:', error)
    },
  })

  const requestApi = () => {
    const ImgOcr = (imgSrc: File) => {
      const formData = new FormData()

      formData.append('file', imgSrc)

      formData.append(
        'message',
        JSON.stringify({
          version: 'V2',
          requestId: 'string',
          timestamp: 0,
          images: [{ format: 'JPG', name: 'string' }],
        }),
      )

      mutate(formData)
    }

    frontImgSrc && ImgOcr(frontImgSrc)
    backImgSrc && ImgOcr(backImgSrc)
  }

  useEffect(() => {
    getCameraStream()
  }, [frontImgSrc, backImgSrc, isFront])

  return (
    <Flex direction="column" style={{ height: '100vh' }}>
      <Top>
        <Dismiss20Filled onClick={() => setCamera(false)} />
      </Top>
      <Flex justify="center" css={isImgSrc ? '' : photoStyle}>
        {frontImgSrc && backImgSrc ? (
          <SwipeableImg
            frontImgSrc={frontImgSrc}
            backImgSrc={backImgSrc}
            isFront={isFront}
            setIsFront={setIsFront}
          />
        ) : (
          renderImage()
        )}
      </Flex>
      {isImgSrc ? (
        <>
          {frontImgSrc && backImgSrc && (
            <Flex justify="center">
              <Point $isFront={isFront} />
              <Point $isFront={!isFront} />
            </Flex>
          )}
          <Text
            typography="t8"
            textAlign="center"
            style={{ marginTop: '2%' }}
            onClick={() => (isFront && !backImgSrc ? setIsFront(false) : '')}
          >
            {!backImgSrc ? '영문추가 >' : isFront ? '국문' : '영문'}
          </Text>
          <Grid2>
            <Button
              $position={'left'}
              onClick={() =>
                isFront ? setFrontImgSrc(null) : setBackImgSrc(null)
              }
            >
              재촬영
            </Button>
            <Button $position={'right'} onClick={() => requestApi()}>
              확인
            </Button>
          </Grid2>
        </>
      ) : (
        <>
          <Text typography="t8" textAlign="center" style={{ marginTop: '2%' }}>
            {isFront ? '국문' : '영문'}
          </Text>
          <Grid3>
            <Flex direction="column" align="center">
              <FileInput
                type="file"
                accept="image/*"
                ref={fileInput}
                onChange={handleFileSelect}
              />
              <Image32Regular onClick={() => fileInput.current?.click()} />
              <Text typography="t8">사진첩</Text>
            </Flex>
            <Flex justify="center">
              <Circle48Regular onClick={takePicture} />
            </Flex>
            <Box $isFront={isFront} onClick={() => requestApi()}>
              <CheckmarkCircle32Filled />
              <Text typography="t10">입력 완료</Text>
            </Box>
          </Grid3>
        </>
      )}
    </Flex>
  )
}

export default PhotoReg

// style

const Top = styled.div`
  display: flex;
  justify-content: end;
  margin: 5%;
`

const Grid3 = styled.div`
  position: absolute;
  width: 90vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 5%;
  bottom: 0;
`

const FileInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
`

const Box = styled.div<{ $isFront: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 4px;
  background-color: ${colors.teamsBG6};
  margin: auto;
  gap: 4px;
  display: ${props => (props.$isFront ? 'none' : '')};
`

const Grid2 = styled.div`
  position: absolute;
  width: 90vw;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 5%;
  gap: 10px;
  bottom: 0;
`

const Button = styled.button<{ $position: string }>`
  border: 1px solid ${colors.themeText};
  border-radius: 3px;
  background-color: ${props =>
    props.$position === 'left' ? '' : colors.themeText};
  color: ${props =>
    props.$position === 'left' ? '' : colors.themeTextInverted};
  padding: 10px;
  font-weight: bold;
`

const Point = styled.div<{ $isFront: boolean }>`
  width: 10px;
  height: 10px;
  margin: 10px 2px 5px 2px;
  border-radius: 50%;
  border: 1px solid ${colors.themeText};
  background-color: ${props =>
    props.$isFront ? colors.themeText : colors.themeTextInverted};
`

// css

const photoStyle = css`
  background: repeating-linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.5) 4px,
    transparent 2px,
    transparent 6px
  );
`
