/** @jsxImportSource @emotion/react */
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import TextField from '@shared/TextField'
import { cardInput } from '@/types/cardInput'
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { css } from '@emotion/react'
import { Button } from '@fluentui/react-components'
import { writeInfoState } from '@/stores/emptyCard'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userState } from '@/stores/user'
import { useMutation } from '@tanstack/react-query'
import { RegisterOtherCard } from '@/apis/album'
import { useNavigate } from 'react-router-dom'

const RegisterOtherCardInfo = ({isEnglish}: {
  isEnglish:boolean}) => {
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
  const navigate = useNavigate()
  const [dirty, setDirty] = useState<Partial<cardInput>>({})

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

  const { mutate } = useMutation({
    mutationKey: ['RegisterOtherCard'],
    mutationFn: RegisterOtherCard,
    onSuccess: res => {
      console.log('명함 등록 성공', res)
    },
    onError: error => {
      console.log('error: ', error)
    },
  })

  const handleRegisterCard = async(cardInputs: cardInput) => {
    var params = {
      userId: userId as number,
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
        frontBack: 'FRONT' // 첫 추가는 앞면.
      },
    }
    mutate(params)
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
          placeholder={'홍길동'}
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
          placeholder={isEnglish ? 'Company name' : '회사명을 입력해주세요'}
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
        <Spacing size={16} />
        
        <TextField
          label="주소"
          type="address"
          name="address"
          placeholder={isEnglish ? 'Address' : '주소를 입력해주세요'}
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
              navigate(-1)
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
export default RegisterOtherCardInfo