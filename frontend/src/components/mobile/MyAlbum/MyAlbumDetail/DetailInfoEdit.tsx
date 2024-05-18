/** @jsxImportSource @emotion/react */
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import TextField from '@shared/TextField'
import { cardInput } from '@/types/cardInput'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { css } from '@emotion/react'
import { Button } from '@fluentui/react-components'
import { useRecoilValue } from 'recoil'
import { userState } from '@/stores/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editMyAlbumCard } from '@/apis/album'
import { useParams } from 'react-router-dom'
import { BooleanStateType } from '@/types/commonType'
import { CardType } from '@/types/cardType'
import { useTeamCardEdit } from '@/hooks/useTeamCardEdit'
import { ExternalCardType } from '@/types/ExternalCard'

const DetailInfoEdit = ({
  isEdit,
  card,
}: {
  isEdit: BooleanStateType
  card: CardType | ExternalCardType
}) => {
  const { setValue: setEdit } = isEdit
  const [cardInputs, setCardInputs] = useState({
    name: card.name,
    company: card.company,
    position: card.position,
    rank: card.rank,
    department: card.department,
    email: card.email,
    landlineNumber: card.landlineNumber,
    faxNumber: card.faxNumber,
    phoneNumber: card.phoneNumber,
    address: card.address,
    domainUrl: card.domainUrl,
  })

  const userId = useRecoilValue(userState).userId
  const [dirty, setDirty] = useState<Partial<cardInput>>({})
  const queryClient = useQueryClient()
  const teamCardMutation = useTeamCardEdit(card)
  const param = useParams()
  const teamAlbumId = param.teamAlbumId
  const handleCardInputs = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCardInputs(prevCardInputs => ({
      ...prevCardInputs,
      [e.target.name]: e.target.value,
    }))
  }, [])
  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty(prevDirty => ({
      ...prevDirty,
      [e.target.name]: 'true',
    }))
  }, [])

  // 명함 수정하기 - 개인 앨범
  const { mutate } = useMutation({
    mutationKey: ['editMyAlbumCard'],
    mutationFn: editMyAlbumCard,
    onSuccess: res => {
      queryClient.invalidateQueries({
        queryKey: ['fetchAlbumCardDetail', userId, card.cardId],
      })
      setEdit(false)
    },
    onError: error => {
      console.log('error: ')
    },
  })

  const handleRegisterCard = async (cardInputs: cardInput) => {
    var params = {
      userId: userId as number,
      cardId: card.cardId,
      data: {
        name: cardInputs.name,
        company: cardInputs.company,
        department: cardInputs.department,
        position: cardInputs.position,
        email: cardInputs.email,
        phoneNumber: cardInputs.phoneNumber,
        landlineNumber: cardInputs.landlineNumber,
        faxNumber: cardInputs.faxNumber,
        address: cardInputs.address,
        domainUrl: cardInputs.domainUrl,
        frontBack: 'FRONT',
      },
    }
    if (teamAlbumId === undefined) {
      mutate(params)
      return
    }

    // 팀 환경에서 명함 수정
    if (teamAlbumId !== undefined) {
      teamCardMutation.mutate({
        userId: userId as number,
        teamAlbumId: teamAlbumId as unknown as number,
        cardId: card.cardId,
        data: params.data,
      })
      queryClient.invalidateQueries({
        queryKey: ['fetchTeamCardDetail', teamAlbumId, card.cardId],
      })
      setEdit(false)
    }
  }

  const errors = useMemo(() => validate(cardInputs), [cardInputs])

  const isSubmittable = Object.keys(errors).length === 0
  return (
    <>
      <Flex direction="column" css={formContainerStyles}>
        <TextField
          label="이름"
          type="name"
          name="name"
          placeholder={card.name}
          isRequired={true}
          onChange={handleCardInputs}
          value={cardInputs.name}
          hasError={Boolean(dirty.name) && Boolean(errors.name)}
          helpMessage={Boolean(dirty.name) ? errors.name : ''}
          onBlur={handleBlur}
        />

        <Spacing size={16} />

        <TextField
          label="회사"
          type="company"
          name="company"
          placeholder={card.company}
          onChange={handleCardInputs}
          value={cardInputs.company}
          hasError={Boolean(dirty.company) && Boolean(errors.company)}
          helpMessage={Boolean(dirty.company) ? errors.company : ''}
          onBlur={handleBlur}
        />

        <Spacing size={16} />

        <TextField
          label="부서"
          type="department"
          name="department"
          placeholder={card.department}
          isRequired={true}
          onChange={handleCardInputs}
          value={cardInputs.department}
          hasError={Boolean(dirty.department) && Boolean(errors.department)}
          helpMessage={Boolean(dirty.department) ? errors.department : ''}
          onBlur={handleBlur}
        />

        <Spacing size={16} />

        <TextField
          label="직책"
          type="position"
          name="position"
          placeholder={card.position}
          isRequired={true}
          onChange={handleCardInputs}
          value={cardInputs.position}
          hasError={Boolean(dirty.position) && Boolean(errors.position)}
          helpMessage={Boolean(dirty.position) ? errors.position : ''}
          onBlur={handleBlur}
        />

        <Spacing size={16} />

        <TextField
          label="이메일"
          name="email"
          placeholder="gdhong@gmail.com"
          isRequired={true}
          onChange={handleCardInputs}
          value={cardInputs.email}
          hasError={Boolean(dirty.email) && Boolean(errors.email)}
          helpMessage={Boolean(dirty.email) ? errors.email : ''}
          onBlur={handleBlur}
        />

        <Spacing size={16} />

        <TextField
          label="유선번호"
          type="landlineNumber"
          name="landlineNumber"
          placeholder={card.landlineNumber}
          isRequired={true}
          onChange={handleCardInputs}
          value={cardInputs.landlineNumber}
          hasError={
            Boolean(dirty.landlineNumber) && Boolean(errors.landlineNumber)
          }
          helpMessage={
            Boolean(dirty.landlineNumber) ? errors.landlineNumber : ''
          }
          onBlur={handleBlur}
        />

        <Spacing size={16} />

        <TextField
          label="핸드폰 번호"
          type="phoneNumber"
          name="phoneNumber"
          placeholder={card.phoneNumber}
          isRequired={true}
          onChange={handleCardInputs}
          value={cardInputs.phoneNumber}
          hasError={Boolean(dirty.phoneNumber) && Boolean(errors.phoneNumber)}
          helpMessage={Boolean(dirty.phoneNumber) ? errors.phoneNumber : ''}
          onBlur={handleBlur}
        />
        <Spacing size={16} />

        <TextField
          label="주소"
          type="address"
          name="address"
          placeholder={card.address}
          isRequired={false}
          onChange={handleCardInputs}
          value={cardInputs.address}
          hasError={Boolean(dirty.address) && Boolean(errors.address)}
          helpMessage={Boolean(dirty.address) ? errors.address : ''}
          onBlur={handleBlur}
        />

        <Spacing size={16} />

        <Flex justify="space-around">
          <Button
            shape="circular"
            onClick={() => {
              setEdit(false)
            }}
          >
            취소
          </Button>
          <Button
            shape="circular"
            disabled={isSubmittable === false}
            onClick={() => handleRegisterCard(cardInputs)}
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

  if (cardInput.name && cardInput.name.length === 0) {
    errors.name = '이름을 입력해주세요'
  }

  if (cardInput.position && cardInput.position.length === 0) {
    errors.position = '직책을 입력해주세요'
  }

  if (cardInput.department && cardInput.department.length === 0) {
    errors.department = '부서를 입력해주세요'
  }

  if (cardInput.email && cardInput.email.length === 0) {
    errors.email = '이메일을 입력해주세요'
  }

  if (cardInput.landlineNumber && cardInput.landlineNumber.length === 0) {
    errors.landlineNumber = '유선번호를 입력해주세요'
  }

  if (cardInput.phoneNumber && cardInput.phoneNumber.length === 0) {
    errors.phoneNumber = '핸드폰 번호를 입력해주세요'
  }

  return errors
}

const formContainerStyles = css`
  padding: 24px;
`

export default DetailInfoEdit
