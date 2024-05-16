/** @jsxImportSource @emotion/react */
import { clipPhotoPosco, ocrRegMyCard, postOCR } from '@/apis/card'
import { cameraState } from '@/stores/emptyCard'
import { selectedTeamAlbumIdState } from '@/stores/team'
import base64ToBlob from '@/utils/base64ToBlob'
import { useMutation } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userState } from '@/stores/user'
import { ocrRegOtherCard } from '@/apis/album'
import { ocrRegTeamCard } from '@/apis/team'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import styled from '@emotion/styled'
import { InfoLabel } from '@fluentui/react-components'
import {
  Dismiss20Filled,
  Image32Regular,
  ArrowHookUpLeft28Regular,
} from '@fluentui/react-icons'
import { colors } from '@/styles/colorPalette'

const WebReg = (props: { state: string }) => {
  const { state } = props
  const userId = useRecoilValue(userState).userId
  const setCamera = useSetRecoilState(cameraState)
  const selectedTeamAlbumId = useRecoilValue(
    selectedTeamAlbumIdState,
  ).teamAlbumId
  const [imgSrc, setImgSrc] = useState<File | null>(null)
  const fileInput = useRef<HTMLInputElement | null>(null)
  const [isImgClip, setIsImgClip] = useState(false)

  // 사진첩에서 불러오기
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      setImgSrc(file)
    }
  }

  // 사진  렌더
  const renderImage = () => {
    const objectURL = imgSrc && URL.createObjectURL(imgSrc)

    return objectURL ? (
      <img src={objectURL} alt="Captured" width="80%" />
    ) : (
      <EmptyImg>
        <Text typography="t5">사진을 등록해주세요</Text>
      </EmptyImg>
    )
  }

  // 명함 영역 자르기 (포스코 기준)
  const { mutate: clipPhotoPoscoMutate } = useMutation({
    mutationKey: ['clipPhotoPosco'],
    mutationFn: clipPhotoPosco,
    onSuccess(result) {
      // Base64 문자열을 Blob 객체로 변환
      const blob = base64ToBlob(result, 'image/jpeg')

      // Blob 객체를 사용하여 File 객체 생성
      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' })

      setImgSrc(file)
      setIsImgClip(true)
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

        const formData = new FormData()

        imgSrc && formData.append('image', imgSrc)

        if (state === 'myCard') {
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
                  frontBack: 'FRONT',
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
                  frontBack: 'FRONT',
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

          if (state === 'album') {
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
    },
    onError(error) {
      console.error('등록 실패:', error)
    },
  })

  // 명함 자르기 버튼
  const onClickClipPhoto = () => {
    if (imgSrc) {
      const formData = new FormData()

      formData.append('image', imgSrc)

      clipPhotoPoscoMutate(formData)
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

    isImgClip && imgSrc && ocrFormData(imgSrc)
  }

  // 재촬영
  const resetImgSrc = async () => {
    setImgSrc(null)
    setIsImgClip(false)
  }

  // dismiss 버튼
  const onClickDismiss = () => {
    setCamera(false)
  }

  return (
    <Flex direction="column" style={{ height: '100dvh' }}>
      <Top>
        <InfoLabel
          size="large"
          info={<>변환에 성공한 카드만 등록할 수 있습니다 </>}
        />
        <Dismiss20Filled
          onClick={onClickDismiss}
          style={{ cursor: 'pointer' }}
        />
      </Top>
      <Flex justify="center">{renderImage()}</Flex>
      {imgSrc ? (
        <Grid2>
          <Button $position={'left'} onClick={resetImgSrc}>
            재촬영
          </Button>
          <Button
            $position={'right'}
            onClick={() => {
              isImgClip ? onClickOCR() : onClickClipPhoto()
            }}
          >
            {isImgClip ? '확인' : '변환'}
          </Button>
        </Grid2>
      ) : (
        <Grid2>
          <Flex direction="column" align="center">
            <FileInput
              type="file"
              accept="image/*"
              ref={fileInput}
              onChange={handleFileSelect}
            />
            <Flex
              direction="column"
              align="center"
              style={{ cursor: 'pointer' }}
            >
              <Image32Regular onClick={() => fileInput.current?.click()} />
              <Text typography="t8">사진첩</Text>
            </Flex>
          </Flex>
          <Flex
            direction="column"
            align="center"
            onClick={onClickDismiss}
            style={{ cursor: 'pointer' }}
          >
            <ArrowHookUpLeft28Regular style={{ transform: 'scale(1.2)' }} />
            <Text typography="t8">취소</Text>
          </Flex>
        </Grid2>
      )}
    </Flex>
  )
}

export default WebReg

// style

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2%;
`

const EmptyImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70vw;
  height: 60vh;
  border: 1px solid ${colors.poscoSilver};
  border-radius: 20px;
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

const FileInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
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
