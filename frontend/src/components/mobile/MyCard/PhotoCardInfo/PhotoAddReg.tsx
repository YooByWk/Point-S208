/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Flex from '@/components/shared/Flex'
import styled from '@emotion/styled'
import { useEffect, useRef, useState } from 'react'
import {
  Dismiss20Filled,
  Circle48Regular,
  Image32Regular,
  CheckmarkCircle32Filled,
} from '@fluentui/react-icons'
import Text from '@/components/shared/Text'
import { colors } from '@/styles/colorPalette'
import ScrollToTop from '@/utils/scrollToTop'
import { useMutation } from '@tanstack/react-query'
import { clipPhoto, postOCR } from '@/apis/card'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isFrontState } from '@/stores/card'
import { cameraState } from '@/stores/emptyCard'

const PhotoAddReg = () => {
  // KOR Card Registration or ENG Card Registration
  const isFront = useRecoilValue(isFrontState)
  const setCamera = useSetRecoilState(cameraState)
  const fileInput = useRef<HTMLInputElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [imgSrc, setImgSrc] = useState<File | null>(null)

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
            setImgSrc(file)
          }
        }, 'image/png')
      }
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      setImgSrc(file)
    }
  }

  const renderImage = () => {
    if (imgSrc) {
      const objectURL = URL.createObjectURL(imgSrc)
      return <img src={objectURL} alt="Captured" width={'80%'} />
    } else {
      return <video ref={videoRef} autoPlay playsInline width={'80%'} />
    }
  }

  const { mutate: clipPhotoMutate } = useMutation({
    mutationKey: ['clipPhoto'],
    mutationFn: clipPhoto,
    onSuccess(result) {
      console.log('등록 성공', typeof result)

      const file = new File([result], 'image.jpg', { type: 'image/jpeg' })
      setImgSrc(file)
    },
    onError(error) {
      console.error('등록 실패:', error)
    },
  })

  const { mutate: ocrMutate } = useMutation({
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
      setCamera(false)
    },
    onError(error) {
      console.error('등록 실패:', error)
    },
  })

  const requestApi = () => {
    if (imgSrc) {
      const formData = new FormData()

      formData.append('image', imgSrc)

      clipPhotoMutate(formData)
    }

    // if (imgSrc) {
    //   const formData = new FormData()

    //   formData.append('file', imgSrc)

    //   formData.append(
    //     'message',
    //     JSON.stringify({
    //       version: 'V2',
    //       requestId: 'string',
    //       timestamp: 0,
    //       images: [{ format: 'JPG', name: 'string' }],
    //     }),
    //   )

    //   ocrMutate(formData)
    // }
  }

  useEffect(() => {
    getCameraStream()
  }, [imgSrc])

  useEffect(() => {
    ScrollToTop()
  }, [])

  return (
    <Flex direction="column" style={{ height: '100vh' }}>
      <Top>
        <Dismiss20Filled onClick={() => setCamera(false)} />
      </Top>
      <Flex justify="center" css={imgSrc ? '' : photoStyle}>
        {renderImage()}
      </Flex>
      {imgSrc ? (
        <>
          <Flex justify="center">
            <Text
              typography="t8"
              textAlign="center"
              style={{ marginTop: '2%' }}
            >
              {isFront ? '국문' : '영문'}
            </Text>
          </Flex>
          <Grid2>
            <Button $position={'left'} onClick={() => setImgSrc(null)}>
              재촬영
            </Button>
            <Button $position={'right'} onClick={() => requestApi()}>
              확인
            </Button>
          </Grid2>
        </>
      ) : (
        <>
          <Flex justify="center">
            <Text
              typography="t8"
              textAlign="center"
              style={{ marginTop: '2%' }}
            >
              {isFront ? '국문' : '영문'}
            </Text>
          </Flex>
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
            <Box $isFront={true} onClick={() => requestApi()}>
              <CheckmarkCircle32Filled />
              <Text typography="t10">입력 완료</Text>
            </Box>
          </Grid3>
        </>
      )}
    </Flex>
  )
}

export default PhotoAddReg

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
