/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import {
  ShareAndroid16Filled,
  ArrowLeft16Filled,
  Delete16Filled,
  Edit16Filled,
} from '@fluentui/react-icons'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import TextButton from '@shared/TextButton'
import Spacing from '@shared/Spacing'
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  Button,
} from '@fluentui/react-components'
import { colors } from '@styles/colorPalette'
import { useMutation } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'
import { userState } from '@stores/user'
import { deleteMyAlbumCard } from '@/apis/album'
import { selectedCardState } from '@/stores/card'

const WebAlbumDetailTopBar = ({
  setIsDetail,
  setEditOpen,
}: {
  setIsDetail: (isCard: boolean) => void
  setEditOpen: (isOpen: boolean) => void
}) => {
  const userId = useRecoilValue(userState).userId
  const selectedCard = useRecoilValue(selectedCardState)

  const { mutate } = useMutation({
    mutationKey: ['deleteMyAlbumCard'],
    mutationFn: deleteMyAlbumCard,
    onSuccess(result) {
      console.log('삭제 성공', result)
    },
    onError(error) {
      console.error('삭제 실패:', error)
    },
  })

  const handleDelete = async () => {
    mutate({ userId: userId, cardId: selectedCard.cardId })
    setIsDetail(false)
  }

  return (
    <>
      <Flex justify="space-between" align="center">
        <Button appearance="transparent" onClick={() => setIsDetail(false)}>
          <Text typography="t9" textAlign="center">
            <ArrowLeft16Filled /> 뒤로가기
          </Text>
        </Button>
        <Flex>
          <TextButton
            onClick={() => {
              setEditOpen(true)
            }}
          >
            <Edit16Filled /> 수정
          </TextButton>
          <Spacing size={10} direction="horizontal" />
          <TextButton>
            <ShareAndroid16Filled /> 공유
          </TextButton>
          <Spacing size={10} direction="horizontal" />
          <Dialog modalType="alert">
            <DialogTrigger disableButtonEnhancement>
              <Button shape="circular">
                <Text typography="t7">
                  <Delete16Filled /> 삭제
                </Text>
              </Button>
            </DialogTrigger>
            <DialogSurface>
              <DialogBody>
                <DialogTitle>명함을 삭제하시겠습니까?</DialogTitle>
                <DialogActions>
                  <Button
                    shape="circular"
                    css={buttonStyles}
                    onClick={handleDelete}
                  >
                    삭제
                  </Button>
                  <DialogTrigger disableButtonEnhancement>
                    <Button shape="circular" css={buttonStyles2}>
                      취소
                    </Button>
                  </DialogTrigger>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
          <Spacing size={10} direction="horizontal" />
        </Flex>
      </Flex>
    </>
  )
}

export default WebAlbumDetailTopBar

const buttonStyles = css`
  background-color: #f00;
  color: white;
`
const buttonStyles2 = css`
  background-color: ${colors.poscoSilver};
  color: white;
`
