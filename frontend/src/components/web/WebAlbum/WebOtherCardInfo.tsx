/** @jsxImportSource @emotion/react */
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import TextField from '@shared/TextField'
import { ChangeEvent, useCallback, useState } from 'react'
import { css } from '@emotion/react'
import { Button } from '@fluentui/react-components'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { userState } from '@/stores/user'
import { useMutation } from '@tanstack/react-query'
import { selectedCardState } from '@/stores/card'
import { editMyAlbumCard, RegisterOtherCard } from '@/apis/album'
import { CardType } from '@/types/cardType'
import { ExternalCardType } from '@/types/ExternalCard'
import BackArrow from '@/components/shared/BackArrow'
import { isAddCardByInfoState } from '@/stores/album'

const emptyCard: CardType = {
  cardId: 0,
  name: '',
  company: '',
  position: '',
  rank: '',
  department: '',
  email: '',
  landlineNumber: '',
  faxNumber: '',
  phoneNumber: '',
  address: '',
  realPicture: '',
  digitalPicture: '',
  frontBack: 'FRONT',
  domainUrl: '',
  memo: '',
}

const WebOtherCardInfo = ({
  setEditOpen,
  isEdit,
}: {
  setEditOpen: (isOpen: boolean) => void
  isEdit: boolean
}) => {
  const userId = useRecoilValue(userState).userId
  const [selectedCard, setSelectedCard] = useRecoilState(selectedCardState)
  const [editInfo, setEditInfo] = useState<CardType | ExternalCardType>(
    isEdit ? selectedCard : emptyCard,
  )
  const setIsAddCardByInfo = useSetRecoilState(isAddCardByInfoState)

  const handleCardInputs = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEditInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const { mutate: editMyAlbumInfo } = useMutation({
    mutationKey: ['editMyAlbumCard'],
    mutationFn: editMyAlbumCard,
    onSuccess(result) {
      setSelectedCard(editInfo)
      setEditOpen(false)
    },
    onError(error) {
      console.error('수정 실패:', error)
    },
  })

  const { mutate: addOtherCard } = useMutation({
    mutationKey: ['RegisterOtherCard'],
    mutationFn: RegisterOtherCard,
    onSuccess(result) {
      setSelectedCard(editInfo)
      setEditOpen(false)
    },
    onError(error) {
      console.error('타인 명함 등록 실패:', error)
    },
  })

  const handleOnSubmit = () => {
    if (isEdit) {
      let params = {
        userId: userId as number,
        cardId: selectedCard.cardId,
        data: editInfo,
      }

      editMyAlbumInfo(params)
    } else {
      let params = {
        userId: userId as number,
        data: editInfo,
      }

      addOtherCard(params)
      setIsAddCardByInfo(false)
    }
  }

  return (
    <>
      {!isEdit && (
        <Flex justify="flex-start">
          <BackArrow onClick={() => setIsAddCardByInfo(false)} />
        </Flex>
      )}
      <Flex direction="column" css={formContainerStyles}>
        <TextField
          label="이름"
          type="name"
          name="name"
          onChange={handleCardInputs}
          value={editInfo.name}
        />

        <Spacing size={16} />

        <TextField
          label="회사"
          type="company"
          name="company"
          onChange={handleCardInputs}
          value={editInfo.company}
        />

        <Spacing size={16} />

        <TextField
          label="부서"
          type="department"
          name="department"
          onChange={handleCardInputs}
          value={editInfo.department}
        />

        <Spacing size={16} />

        <TextField
          label="직무"
          type="rank"
          name="rank"
          onChange={handleCardInputs}
          value={editInfo.rank}
        />

        <Spacing size={16} />

        <TextField
          label="직책"
          type="position"
          name="position"
          onChange={handleCardInputs}
          value={editInfo.position}
        />

        <Spacing size={16} />

        <TextField
          label="이메일"
          name="email"
          onChange={handleCardInputs}
          value={editInfo.email}
        />

        <Spacing size={16} />

        <TextField
          label="유선번호"
          type="landlineNumber"
          name="landlineNumber"
          onChange={handleCardInputs}
          value={editInfo.landlineNumber}
        />

        <Spacing size={16} />

        <TextField
          label="핸드폰 번호"
          type="phoneNumber"
          name="phoneNumber"
          onChange={handleCardInputs}
          value={editInfo.phoneNumber}
        />

        <Spacing size={16} />

        <TextField
          label="팩스번호"
          type="faxNumber"
          name="faxNumber"
          onChange={handleCardInputs}
          value={editInfo.faxNumber}
        />

        <Spacing size={16} />

        <TextField
          label="웹사이트"
          type="domainUrl"
          name="domainUrl"
          onChange={handleCardInputs}
          value={editInfo.domainUrl}
        />

        <Spacing size={16} />

        <TextField
          label="주소"
          type="address"
          name="address"
          onChange={handleCardInputs}
          value={editInfo.address}
        />

        <Spacing size={32} />

        <Flex justify="space-around">
          <Button
            shape="circular"
            onClick={() => {
              if (isEdit) setEditOpen(false)
              else setIsAddCardByInfo(false)
            }}
          >
            취소
          </Button>
          <Button shape="circular" onClick={() => handleOnSubmit()}>
            저장
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export default WebOtherCardInfo

const formContainerStyles = css`
  padding: 24px;
`
