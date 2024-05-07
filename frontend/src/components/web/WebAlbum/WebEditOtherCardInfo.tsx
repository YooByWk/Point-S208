/** @jsxImportSource @emotion/react */
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import TextField from '@shared/TextField'
import { cardInput } from '@/types/cardInput'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { css } from '@emotion/react'
import { Button } from '@fluentui/react-components'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userState } from '@/stores/user'
import { useMutation } from '@tanstack/react-query'
import { selectedCardState } from '@/stores/card'
import { editMyAlbumCard } from '@/apis/album'
import { CardType } from '@/types/cardType'

const WebEditOtherCardInfo = ({
  setEditOpen,
}: {
  setEditOpen: (isOpen: boolean) => void
}) => {
  const userId = useRecoilValue(userState).userId
  const [selectedCard, setSelectedCard] = useRecoilState(selectedCardState)
  const [editInfo, setEditInfo] = useState<CardType>(selectedCard)

  const handleCardInputs = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEditInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const { mutate } = useMutation({
    mutationKey: ['editMyAlbumCard'],
    mutationFn: editMyAlbumCard,
    onSuccess(result) {
      console.log('수정 성공', result)
      setSelectedCard(editInfo)
      setEditOpen(false)
      // refetch()
    },
    onError(error) {
      console.error('수정 실패:', error)
    },
  })

  const handleOnSubmit = () => {
    let params = {
      userId: userId as number,
      cardId: selectedCard.cardId,
      data: editInfo,
    }

    mutate(params)
  }

  const errors = useMemo(() => validate(editInfo), [editInfo])

  const isSubmittable = Object.keys(errors).length === 0

  return (
    <>
      <Flex direction="column" css={formContainerStyles}>
        <TextField
          label="이름"
          type="name"
          name="name"
          isRequired={true}
          onChange={handleCardInputs}
          value={editInfo.name}
          hasError={Boolean(errors.name)}
        />

        <Spacing size={16} />

        <TextField
          label="회사"
          type="company"
          name="company"
          onChange={handleCardInputs}
          value={editInfo.company}
          hasError={Boolean(errors.company)}
        />

        <Spacing size={16} />

        <TextField
          label="부서"
          type="department"
          name="department"
          onChange={handleCardInputs}
          value={editInfo.department}
          hasError={Boolean(errors.department)}
        />

        <Spacing size={16} />

        <TextField
          label="직무"
          type="rank"
          name="rank"
          onChange={handleCardInputs}
          value={editInfo.rank}
          hasError={Boolean(errors.rank)}
        />

        <Spacing size={16} />

        <TextField
          label="직책"
          type="position"
          name="position"
          onChange={handleCardInputs}
          value={editInfo.position}
          hasError={Boolean(errors.position)}
        />

        <Spacing size={16} />

        <TextField
          label="이메일"
          name="email"
          placeholder="gdhong@poscointl.com"
          isRequired={true}
          onChange={handleCardInputs}
          value={editInfo.email}
          hasError={Boolean(errors.email)}
        />

        <Spacing size={16} />

        <TextField
          label="유선번호"
          type="landlineNumber"
          name="landlineNumber"
          onChange={handleCardInputs}
          value={editInfo.landlineNumber}
          hasError={Boolean(errors.landlineNumber)}
        />

        <Spacing size={16} />

        <TextField
          label="핸드폰 번호"
          type="phoneNumber"
          name="phoneNumber"
          isRequired={true}
          onChange={handleCardInputs}
          value={editInfo.phoneNumber}
          hasError={Boolean(errors.phoneNumber)}
        />

        <Spacing size={16} />

        <TextField
          label="팩스번호"
          type="faxNumber"
          name="faxNumber"
          onChange={handleCardInputs}
          value={editInfo.faxNumber}
          hasError={Boolean(errors.faxNumber)}
        />

        <Spacing size={16} />

        <TextField
          label="웹사이트"
          type="domainUrl"
          name="domainUrl"
          onChange={handleCardInputs}
          value={editInfo.domainUrl}
          hasError={Boolean(errors.domainUrl)}
        />

        <Spacing size={16} />

        <TextField
          label="주소"
          type="address"
          name="address"
          onChange={handleCardInputs}
          value={editInfo.address}
          hasError={Boolean(errors.address)}
        />

        <Spacing size={32} />

        <Flex justify="space-around">
          <Button
            shape="circular"
            onClick={() => {
              setEditOpen(false)
            }}
          >
            취소
          </Button>
          <Button
            shape="circular"
            disabled={isSubmittable === false}
            onClick={() => handleOnSubmit()}
          >
            저장
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

function validate(cardInput: cardInput) {
  let errors: Partial<cardInput> = {}

  if (cardInput.name.length === 0) {
    errors.name = '이름을 입력해주세요'
  }

  if (cardInput.email.length === 0) {
    errors.email = '이메일을 입력해주세요'
  }

  if (cardInput.phoneNumber.length === 0) {
    errors.phoneNumber = '핸드폰 번호를 입력해주세요'
  }

  return errors
}

export default WebEditOtherCardInfo

const formContainerStyles = css`
  padding: 24px;
`
