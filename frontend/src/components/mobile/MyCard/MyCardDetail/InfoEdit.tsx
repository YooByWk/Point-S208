import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import TextField from '@/components/shared/TextField'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Dismiss24Filled } from '@fluentui/react-icons'
import { Button } from '@fluentui/react-components'
import ScrollToTop from '@/utils/scrollToTop'
import { useRecoilState, useRecoilValue } from 'recoil'
import { backCardState, frontCardState, isFrontState } from '@/stores/card'
import { CardType } from '@/types/cardType'
import { useMutation } from '@tanstack/react-query'
import { editMyCard } from '@/apis/card'
import { userState } from '@/stores/user'

const InfoEdit = ({
  value,
  setValue,
}: {
  value: boolean
  setValue: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const isFront = useRecoilValue(isFrontState)
  const [frontCard, setFrontCard] = useRecoilState(frontCardState)
  const [backCard, setBackCard] = useRecoilState(backCardState)
  const [editInfo, setEditInfo] = useState<CardType>(frontCard)
  const userId = useRecoilValue(userState).userId as number

  const handleCardInfo = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEditInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const { mutate } = useMutation({
    mutationKey: ['editMyCard'],
    mutationFn: editMyCard,
    onSuccess(result) {
      isFront ? setFrontCard(editInfo) : setBackCard(editInfo)
      setValue(false)
    },
    onError(error) {
      console.error('명함 수정 실패:', error)
    },
  })

  const onSubmit = () => {
    let params = {
      userId: userId,
      cardId: editInfo.cardId,
      data: editInfo,
    }

    mutate(params)

    setValue(false)
  }

  useEffect(() => {
    setEditInfo(isFront ? frontCard : backCard)
  }, [isFront, frontCard, backCard])

  useEffect(() => {
    ScrollToTop()
  }, [])

  return (
    <Flex direction="column" style={{ padding: '24px' }}>
      <Flex align="center" justify="space-between">
        <Text typography="t5">내 명함 정보 수정</Text>
        <Dismiss24Filled onClick={() => setValue(false)} />
      </Flex>

      <Spacing size={16} />

      <TextField
        label="이름"
        type="name"
        name="name"
        onChange={handleCardInfo}
        value={editInfo.name}
      />

      <Spacing size={16} />

      <TextField
        label="회사"
        type="company"
        name="company"
        onChange={handleCardInfo}
        value={editInfo.company}
      />

      <Spacing size={16} />

      <TextField
        label="부서"
        type="department"
        name="department"
        onChange={handleCardInfo}
        value={editInfo.department}
      />

      <Spacing size={16} />

      <TextField
        label="직책"
        type="position"
        name="position"
        onChange={handleCardInfo}
        value={editInfo.position}
      />

      <Spacing size={16} />

      <TextField
        label="이메일"
        type="email"
        name="email"
        onChange={handleCardInfo}
        value={editInfo.email}
      />

      <Spacing size={16} />

      <TextField
        label="유선전화"
        type="landlineNumber"
        name="landlineNumber"
        onChange={handleCardInfo}
        value={editInfo.landlineNumber}
      />

      <Spacing size={32} />

      <TextField
        label="휴대전화"
        type="phoneNumber"
        name="phoneNumber"
        onChange={handleCardInfo}
        value={editInfo.phoneNumber}
      />

      <Spacing size={16} />

      <Flex justify="space-around">
        <Button
          shape="circular"
          onClick={() => {
            setValue(false)
          }}
        >
          취소
        </Button>
        <Button
          shape="circular"
          onClick={() => {
            onSubmit()
          }}
        >
          저장
        </Button>
      </Flex>
    </Flex>
  )
}

export default InfoEdit
