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

const Camera = () => {
  const setCamera = useSetRecoilState(cameraState)
  const fileInput = useRef<HTMLInputElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)

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
        setImageSrc(imageDataURL)
      }
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      const reader = new FileReader()

      reader.onload = function (e) {
        setImageSrc(e.target?.result as string)
      }

      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    getCameraStream()
  }, [imageSrc])

  return (
    <Flex direction="column">
      <Top>
        <Dismiss20Filled onClick={() => setCamera(false)} />
      </Top>
      <Scene>
        {imageSrc ? (
          <img src={imageSrc} alt="Captured" width={'90%'} />
        ) : (
          <video ref={videoRef} autoPlay playsInline width={'90%'} />
        )}
      </Scene>
      {imageSrc ? (
        <Grid2>
          <Button $position={'left'} onClick={() => setImageSrc(null)}>
            재촬영
          </Button>
          <Button $position={'right'}>확인</Button>
        </Grid2>
      ) : (
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
          <Box>
            <CheckmarkCircle32Filled />
            <Text typography="t10">입력 완료</Text>
          </Box>
        </Grid3>
      )}
    </Flex>
  )
}

export default Camera

// style

const Top = styled.div`
  display: flex;
  justify-content: end;
  margin: 5%;
`

const Scene = styled.div`
  display: flex;
  justify-content: center;
`

const Grid3 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 5%;
`

const FileInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
`

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 4px;
  background-color: ${colors.teamsBG6};
  margin: auto;
  gap: 4px;
  display: none;
`

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 5%;
  gap: 10px;
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
