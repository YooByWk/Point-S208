import { dummyCard } from '@/assets/data/dummyCard'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import TextField from '@/components/shared/TextField'
import { BooleanStateType } from '@/types/commonType'
import { ChangeEvent, useCallback, useState } from 'react'
import { Dismiss24Filled } from '@fluentui/react-icons'
import { Button } from '@fluentui/react-components'
import ScrollToTop from '@/utils/scrollToTop'

const InfoEdit = (props: BooleanStateType) => {
  const { setValue } = props
  const [editInfo, setEditInfo] = useState(dummyCard[0])

  const handleCardInfo = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEditInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const onSubmit = () => {
    console.log('내 명함 수정 api 보내기')
  }

  ScrollToTop()

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
        label="휴대전화"
        type="phoneNumber"
        name="phoneNumber"
        onChange={handleCardInfo}
        value={editInfo.phoneNumber}
      />

      <Spacing size={16} />

      <TextField
        label="팩스"
        type="faxNumber"
        name="faxNumber"
        onChange={handleCardInfo}
        value={editInfo.faxNumber}
      />

      <Spacing size={16} />

      <TextField
        label="주소"
        type="address"
        name="address"
        onChange={handleCardInfo}
        value={editInfo.address}
      />

      <Spacing size={32} />

      <Flex justify="space-around">
        <Button
          shape="circular"
          onClick={() => {
            setValue(false)
          }}
        >
          취소
        </Button>
        <Button shape="circular" onClick={() => onSubmit()}>
          저장
        </Button>
      </Flex>
    </Flex>
  )
}

export default InfoEdit
