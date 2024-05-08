/** @jsxImportSource @emotion/react */
import { deleteMyAlbumCard } from '@/apis/album'
import { isRefreshedAlbumState } from '@/stores/card'
import { userState } from '@/stores/user'
import { colors } from '@/styles/colorPalette'
import { CardType } from '@/types/cardType'
import { ExternalCardType } from '@/types/ExternalCard'
import { css } from '@emotion/react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-components'
import { Delete24Filled } from '@fluentui/react-icons'
import { useMutation } from '@tanstack/react-query'
import { useRecoilState, useRecoilValue } from 'recoil'

const WebAlbumDeleteSingleCard = ({
  cardInfo,
}: {
  cardInfo: ExternalCardType | CardType
}) => {
  const userId = useRecoilValue(userState).userId
  const [isRefreshed, setIsRefreshed] = useRecoilState(isRefreshedAlbumState)

  const { mutate } = useMutation({
    mutationKey: ['deleteMyAlbumCard'],
    mutationFn: deleteMyAlbumCard,
    onSuccess(result) {
      console.log('삭제 성공', result)
      setIsRefreshed(!isRefreshed)
    },
    onError(error) {
      console.error('삭제 실패:', error)
    },
  })

  const handleDelete = () => {
    mutate({ userId: userId, cardId: cardInfo.cardId })
    alert('삭제되었습니다.')
  }

  return (
    <Dialog modalType="alert">
      <DialogTrigger disableButtonEnhancement>
        <Delete24Filled />
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>명함을 삭제하시겠습니까?</DialogTitle>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button
                shape="circular"
                css={buttonStyles}
                onClick={handleDelete}
              >
                삭제
              </Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button shape="circular" css={buttonStyles2}>
                취소
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}

export default WebAlbumDeleteSingleCard

const buttonStyles = css`
  background-color: #f00;
  color: white;
`
const buttonStyles2 = css`
  background-color: ${colors.poscoSilver};
  color: white;
`
