/** @jsxImportSource @emotion/react */
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import TextField from '@shared/TextField'
import { cardInput } from '@/types/cardInput'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { css } from '@emotion/react'
import { Button } from '@fluentui/react-components'
import { writeInfoState } from '@/stores/emptyCard'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userState } from '@/stores/user'

import axios from 'axios'

const WriteCardInfo = ({
  onSubmit,
  isEnglish,
}: {
  onSubmit: (isDone: boolean) => void
  isEnglish: boolean
}) => {
  const [cardInputs, setCardInputs] = useState({
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
    domainUrl: '',
  })

  const userId = useRecoilValue(userState).userId

  const setWriteInfo = useSetRecoilState(writeInfoState)

  const [dirty, setDirty] = useState<Partial<cardInput>>({})
  const [changed, setChanged] = useState(false)

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

  function sendCardInfo(cardInput: cardInput) {
    const url = `https://k10s208.p.ssafy.io/cud/api/my-card/${userId}`

    axios
      .post(url, {
        name: cardInput.name,
        company:
          cardInput.company.length === 0
            ? '포스코인터네셔널'
            : cardInput.company,
        department: cardInput.department,
        position: cardInput.position,
        email: cardInput.email,
        landlineNumber: cardInput.landlineNumber,
        phoneNumber: cardInput.phoneNumber,
        frontBack: 'FRONT',
      })
      .then(response => {
        setChanged(true)
        console.log('Success:', response.data) // 성공적으로 데이터가 전송되었을 때의 로직
      })
      .catch(error => {
        setChanged(false)
        console.error('Error:', error) // 에러 처리 로직
      })
  }

  const handleOnSubmit = async (cardInputs: cardInput) => {
    try {
      await sendCardInfo(cardInputs)
    } catch (error) {
      console.error('Failed to send card info:', error)
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
          placeholder={isEnglish ? 'Hong Gildong' : '홍길동'}
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
          placeholder={isEnglish ? 'POSCO INTERNATIONAL' : '포스코인터내셔널'}
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
          placeholder={isEnglish ? 'Communication Office' : '커뮤니케이션팀'}
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
          placeholder={isEnglish ? 'PR Planning, Leader' : '리더'}
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
          placeholder="gdhong@poscointl.com"
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
          placeholder={isEnglish ? '82 2 123 4567' : '02 123 4567'}
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
          placeholder={isEnglish ? '82 10 1234 5678' : '010 1234 5678'}
          isRequired={true}
          onChange={handleCardInputs}
          value={cardInputs.phoneNumber}
          hasError={Boolean(dirty.phoneNumber) && Boolean(errors.phoneNumber)}
          helpMessage={Boolean(dirty.phoneNumber) ? errors.phoneNumber : ''}
          onBlur={handleBlur}
        />

        <Spacing size={32} />

        <Flex justify="space-around">
          <Button
            shape="circular"
            onClick={() => {
              setWriteInfo(false)
            }}
          >
            취소
          </Button>
          <Button
            shape="circular"
            disabled={isSubmittable === false}
            onClick={async () => {
              await handleOnSubmit(cardInputs)
              onSubmit(changed)
            }}
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

  if (cardInput.position.length === 0) {
    errors.position = '직책을 입력해주세요'
  }

  if (cardInput.department.length === 0) {
    errors.department = '부서를 입력해주세요'
  }

  if (cardInput.email.length === 0) {
    errors.email = '이메일을 입력해주세요'
  }

  if (cardInput.landlineNumber.length === 0) {
    errors.landlineNumber = '유선번호를 입력해주세요'
  }

  if (cardInput.phoneNumber.length === 0) {
    errors.phoneNumber = '핸드폰 번호를 입력해주세요'
  }

  return errors
}

const formContainerStyles = css`
  padding: 24px;
`
export default WriteCardInfo
