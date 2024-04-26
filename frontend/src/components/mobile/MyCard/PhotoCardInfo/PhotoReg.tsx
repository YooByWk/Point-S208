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

const PhotoReg = (props: { isMyCard: boolean }) => {
  // My Card Registration or Other people's Card Registration
  const { isMyCard } = props
  const setCamera = useSetRecoilState(cameraState)
  const fileInput = useRef<HTMLInputElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [frontImgSrc, setFrontImgSrc] = useState<string | null>(null)
  const [backImgSrc, setBackImgSrc] = useState<string | null>(null)
  const [isFront, setIsFront] = useState<boolean>(true)

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
        const imageDataURL = canvas.toDataURL('image/png')
        if (isFront) {
          setFrontImgSrc(imageDataURL)
        } else {
          setBackImgSrc(imageDataURL)
        }
      }
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      const reader = new FileReader()

      reader.onload = function (e) {
        if (isFront) {
          setFrontImgSrc(e.target?.result as string)
        } else {
          setBackImgSrc(e.target?.result as string)
        }
      }

      reader.readAsDataURL(file)
    }
  }

  const requestApi = () => {
    // 등록 성공하면 setCamera(false) 변경
    if (isMyCard) {
      console.log('내 카드 등록 api요청 만들기')
    } else {
      console.log('남 카드 등록 api요청 만들기')
    }
  }

  useEffect(() => {
    getCameraStream()
  }, [frontImgSrc, backImgSrc, isFront])

  return (
    <Flex direction="column" style={{ height: '100vh' }}>
      <Top>
        <Dismiss20Filled onClick={() => setCamera(false)} />
      </Top>
      <Flex justify="center">
        {frontImgSrc && backImgSrc ? (
          <SwipeableImg
            frontImgSrc={frontImgSrc}
            backImgSrc={backImgSrc}
            isFront={isFront}
            setIsFront={setIsFront}
          />
        ) : (isFront && frontImgSrc) || (!isFront && backImgSrc) ? (
          <img
            src={isFront ? (frontImgSrc as string) : (backImgSrc as string)}
            alt="Captured"
            width={'80%'}
          />
        ) : (
          <video ref={videoRef} autoPlay playsInline width={'80%'} />
        )}
      </Flex>
      {(isFront && frontImgSrc) || (!isFront && backImgSrc) ? (
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
