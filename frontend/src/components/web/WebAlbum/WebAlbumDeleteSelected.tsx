/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Delete24Filled } from '@fluentui/react-icons'
import Text from '@shared/Text'
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogActions,
  Popover,
  PopoverTrigger,
  PopoverSurface,
} from '@fluentui/react-components'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userState } from '@/stores/user'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { deleteMyAlbumCard } from '@/apis/album'
import { isRefreshedAlbumState } from '@/stores/card'
import { colors } from '@/styles/colorPalette'

const WebAlbumDeleteSelected = ({
  selectedCards,
  setSelectedCards,
}: {
  selectedCards: number[]
  setSelectedCards: React.Dispatch<React.SetStateAction<number[]>>
}) => {
  const userId = useRecoilValue(userState).userId
  const [modalOpen, setModalOpen] = useState(false)
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

  const handleDelete = async () => {
    try {
      const deletePromises = selectedCards.map(cardId =>
        mutate({ userId: userId, cardId: cardId }),
      )
      await Promise.all(deletePromises)

      setSelectedCards(selectedCards.filter(id => !selectedCards.includes(id)))

      setModalOpen(false)
      alert('삭제되었습니다.')
    } catch (error) {
      console.error('카드 삭제 중 오류 발생:', error)
    }
  }

  return (
    <Dialog modalType="alert" open={modalOpen}>
      <DialogTrigger disableButtonEnhancement>
        <Popover openOnHover={true} mouseLeaveDelay={0.1}>
          <PopoverTrigger disableButtonEnhancement>
            <Button
              appearance="transparent"
              size="small"
              css={buttonStyles}
              onClick={() => setModalOpen(true)}
            >
              <Delete24Filled />
            </Button>
          </PopoverTrigger>

          <PopoverSurface tabIndex={-1}>
            <Text typography="t9"> 선택한 명함 삭제하기</Text>
          </PopoverSurface>
        </Popover>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>
            선택하신 {selectedCards.length}개의 명함을 전부 삭제하시겠습니까?
          </DialogTitle>
          <DialogActions>
            <Button shape="circular" css={buttonStyles3} onClick={handleDelete}>
              삭제
            </Button>
            <DialogTrigger disableButtonEnhancement>
              <Button
                shape="circular"
                css={buttonStyles2}
                onClick={() => {
                  setModalOpen(false)
                }}
              >
                취소
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}

export default WebAlbumDeleteSelected

const buttonStyles = css`
  padding: 0;
  margin: 0;
`

const buttonStyles3 = css`
  background-color: #f00;
  color: white;
`
const buttonStyles2 = css`
  background-color: ${colors.poscoSilver};
  color: white;
`
