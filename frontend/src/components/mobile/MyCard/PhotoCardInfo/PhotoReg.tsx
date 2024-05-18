/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Flex from '@/components/shared/Flex'
import { cameraState, isAlbumState } from '@/stores/emptyCard'
import styled from '@emotion/styled'
import { useEffect, useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
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
import { clipPhoto, clipPhotoPosco, ocrRegMyCard, postOCR } from '@/apis/card'
import base64ToBlob from '@/utils/base64ToBlob'
import { userState } from '@/stores/user'
import { InfoLabel } from '@fluentui/react-components'
import { ocrRegOtherCard } from '@/apis/album'
import { useNavigate } from 'react-router-dom'
import { selectedTeamAlbumIdState } from '@/stores/team'
import { ocrRegTeamCard } from '@/apis/team'

const PhotoReg = (props: { isMyCard: boolean; refetch: any }) => {
  // My Card Registration or Other people's Card Registration
  const { isMyCard, refetch } = props
  const userId = useRecoilValue(userState).userId
  const setCamera = useSetRecoilState(cameraState)
  const setIsFirstCard = useSetRecoilState(isFirstCardState)
  const isAlbum = useRecoilValue(isAlbumState)
  const selectedTeamAlbumId = useRecoilValue(
    selectedTeamAlbumIdState,
  ).teamAlbumId
  const fileInput = useRef<HTMLInputElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [frontImgSrc, setFrontImgSrc] = useState<File | null>(null)
  const [backImgSrc, setBackImgSrc] = useState<File | null>(null)
  const [isFront, setIsFront] = useState<boolean>(true)
  const [isFrontClip, setIsFrontClip] = useState(false)
  const [isBackClip, setIsBackClip] = useState(false)
  const isImgSrc: boolean =
    (isFront && frontImgSrc) || (!isFront && backImgSrc) ? true : false

  // 카메라 띄우기
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

  // 사진 찍기
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

  // 사진첩에서 불러오기
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

  // 사진 or 카메라 렌더
  const renderImage = () => {
    const imgSrc = isFront ? frontImgSrc : backImgSrc
    const objectURL = imgSrc && URL.createObjectURL(imgSrc)

    return objectURL ? (
      <img src={objectURL} alt="Captured" width="80%" />
    ) : (
      <video ref={videoRef} autoPlay playsInline width="80%" />
    )
  }

  // 명함 영역 자르기
  const { mutate: clipPhotoMutate } = useMutation({
    mutationKey: ['clipPhoto'],
    mutationFn: clipPhoto,
    onSuccess(result) {
      // Base64 문자열을 Blob 객체로 변환
      const blob = base64ToBlob(result, 'image/jpeg')

      // Blob 객체를 사용하여 File 객체 생성
      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' })

      if (isFront) {
        setFrontImgSrc(file)
        setIsFrontClip(true)
      } else {
        setBackImgSrc(file)
        setIsBackClip(true)
      }
    },
    onError(error) {
      console.error('등록 실패:', error)
      alert('명함 변환에 실패하였습니다.')
    },
  })

  // 명함 영역 자르기 (포스코 기준)
  const { mutate: clipPhotoPoscoMutate } = useMutation({
    mutationKey: ['clipPhotoPosco'],
    mutationFn: clipPhotoPosco,
    onSuccess(result) {
      // Base64 문자열을 Blob 객체로 변환
      const blob = base64ToBlob(result, 'image/jpeg')

      // Blob 객체를 사용하여 File 객체 생성
      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' })

      if (isFront) {
        setFrontImgSrc(file)
        setIsFrontClip(true)
      } else {
        setBackImgSrc(file)
        setIsBackClip(true)
      }
    },
    onError(error) {
      console.error('등록 실패:', error)
      alert('명함 변환에 실패하였습니다.')
    },
  })

  // ocr 추출
  const { mutate: ocrMutate } = useMutation({
    mutationKey: ['postOCR'],
    mutationFn: postOCR,
    onSuccess(result) {
      if (result) {
        const data = result.images[0].nameCard.result

        const imgSrc = isFront ? frontImgSrc : backImgSrc

        const formData = new FormData()

        imgSrc && formData.append('image', imgSrc)

        isMyCard && setIsFront(!isFront)
        if (isMyCard) {
          // 내 명함 등록 api
          formData.append(
            'request',
            new Blob(
              [
                JSON.stringify({
                  name: data.name?.[0].text || '',
                  company: data.company?.[0].text || '',
                  department: data.department?.[0].text || '',
                  position: data.position?.[0].text || '',
                  email: data.email?.[0].text || '',
                  landlineNumber: data.tel?.[0].text || '',
                  phoneNumber:
                    data.mobile?.[0].text || data.tel?.[0].text || '',
                  frontBack: isFront ? 'FRONT' : 'BACK',
                }),
              ],
              {
                type: 'application/json',
              },
            ),
          )

          let params = {
            userId: userId as number,
            data: formData,
          }
          registMutate(params)
        } else {
          // 명함 지갑 등록 api
          formData.append(
            'request',
            new Blob(
              [
                JSON.stringify({
                  name: data.name?.[0].text || '',
                  company: data.company?.[0].text || '',
                  department: data.department?.[0].text || '',
                  position: data.position?.[0].text || '',
                  email: data.email?.[0].text || '',
                  landlineNumber: data.tel?.[0].text || '',
                  phoneNumber:
                    data.mobile?.[0].text || data.tel?.[0].text || '',
                  frontBack: isFront ? 'FRONT' : 'BACK',
                  rank: data.rank?.[0].text || '',
                  faxNumber: data.fax?.[0].text || '',
                  address: data.address?.[0].text || '',
                  domainUrl: data.homepage?.[0].text || '',
                }),
              ],
              {
                type: 'application/json',
              },
            ),
          )

          if (isAlbum) {
            let params = {
              userId: userId as number,
              data: formData,
            }
            registAlbumMutate(params)
          } else {
            let params = {
              userId: userId as number,
              teamAlbumId: selectedTeamAlbumId as number,
              data: formData,
            }
            registTeamMutate(params)
          }
        }
      }
    },
    onError(error) {
      console.error('등록 실패:', error)
    },
  })

  // 내 명함 등록
  const { mutate: registMutate } = useMutation({
    mutationKey: ['ocrRegMyCard'],
    mutationFn: ocrRegMyCard,
    onSuccess(result) {
      setCamera(false)
      setIsFirstCard(false)
      refetch()
    },
    onError(error) {
      console.error('등록 실패:', error)
    },
  })

  // 명함 지갑 등록
  const { mutate: registAlbumMutate } = useMutation({
    mutationKey: ['ocrRegOtherCard'],
    mutationFn: ocrRegOtherCard,
    onSuccess(result) {
      setCamera(false)
      navigate(-1)
    },
    onError(error) {
      console.error('등록 실패:', error)
    },
  })

  // 팀 내 명함 등록
  const { mutate: registTeamMutate } = useMutation({
    mutationKey: ['ocrRegTeamCard'],
    mutationFn: ocrRegTeamCard,
    onSuccess(result) {
      setCamera(false)
      navigate(-1)
    },
    onError(error) {
      console.error('등록 실패:', error)
    },
  })

  // 명함 자르기 버튼
  const onClickClipPhoto = () => {
    const imgSrc = isFront ? frontImgSrc : backImgSrc
    if (isImgSrc && imgSrc) {
      const formData = new FormData()

      formData.append('image', imgSrc)

      if (isMyCard) {
        clipPhotoPoscoMutate(formData)
      } else {
        clipPhotoPoscoMutate(formData)
      }
    }
  }

  // ocr 추출 버튼
  const onClickOCR = () => {
    const ocrFormData = (imgSrc: File) => {
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

      ocrMutate(formData)
    }

    isFrontClip && frontImgSrc && ocrFormData(frontImgSrc)
    isBackClip && backImgSrc && ocrFormData(backImgSrc)
  }

  // 재촬영
  const resetImgSrc = async () => {
    if (isFront) {
      setFrontImgSrc(null)
      setIsFrontClip(false)
    } else {
      setBackImgSrc(null)
      setIsBackClip(false)
    }
  }

  const navigate = useNavigate()

  // dismiss 버튼
  const onClickDismiss = () => {
    setCamera(false)
    if (!isMyCard) {
      navigate(-1)
    }
  }

  useEffect(() => {
    getCameraStream()
  }, [frontImgSrc, backImgSrc, isFront])

  return (
    <Flex direction="column" style={{ height: '100vh' }}>
      <Top>
        <InfoLabel info={<>변환에 성공한 카드만 등록할 수 있습니다 </>} />
        <Dismiss20Filled onClick={onClickDismiss} />
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
          <Flex justify="center">
            <Text
              typography="t8"
              textAlign="center"
              style={{ marginTop: '2%' }}
              onClick={() =>
                isMyCard && isFront && !backImgSrc ? setIsFront(false) : ''
              }
            >
              {isMyCard && !backImgSrc
                ? '영문추가 >'
                : isFront
                ? '국문'
                : '영문'}
            </Text>
          </Flex>
          <Grid2>
            <Button $position={'left'} onClick={resetImgSrc}>
              재촬영
            </Button>
            <Button
              $position={'right'}
              onClick={() => {
                isFront
                  ? isFrontClip
                    ? onClickOCR()
                    : onClickClipPhoto()
                  : isBackClip
                  ? onClickOCR()
                  : onClickClipPhoto()
              }}
            >
              {isFront
                ? isFrontClip
                  ? '확인'
                  : '변환'
                : isBackClip
                ? '확인'
                : '변환'}
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
            <Box $isFront={isFront} onClick={() => {}}>
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
  justify-content: space-between;
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
