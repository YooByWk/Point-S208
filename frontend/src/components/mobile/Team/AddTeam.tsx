/** @jsxImportSource @emotion/react */
import { ArrowLeft24Regular } from '@fluentui/react-icons'
import { useState } from 'react'
import Text from '@shared/Text'
import Flex from '@/components/shared/Flex'
import SearchBox from '@/components/shared/SearchBox'
import LargeButton from '@/components/shared/LargeButton'
import { css } from '@emotion/react'
import Spacing from '@/components/shared/Spacing'
import { Input as FluentInput, tokens } from '@fluentui/react-components'


interface AddTeamProps {
  setIsWrite: (isWrite: boolean) => void
  isWrite: boolean
}

const AddTeam = ({ setIsWrite, isWrite }: AddTeamProps) => {
  const [step, setStep] = useState(1)
  const [teamName, setTeamName] = useState('')
  const [teamSearchValue, setTeamSearchValue] = useState('')
  const [selectedMember , setSelectedMember] = useState([]) // userType 으로 수정하기
  const handleTeamNameInput = (e: any) => {
    setTeamName(e.target.value)
    if (teamName.length > 0) {
      console.log('팀 이름이 입력되었습니다.', teamName)
    }
  }
  
  const handleBackArrow = () => {
    if (step === 1) {
      setIsWrite(!isWrite)
      
    } else {
      setStep(step - 1)
    }
  }
  
  const handleSearch = () => {
    console.log('검색버튼 클릭', teamSearchValue)
  }
  
  return (
    <div css={Step1mainContainerCss}>
      <Flex direction='row' onClick={handleBackArrow} css={arrowContainer}>
      <ArrowLeft24Regular />
      <Spacing size={10} direction='horizontal'/> 
      <Text typography='t7'>뒤로가기</Text>
      </Flex >
      {step === 1 ?
        <Flex
          direction="column"
          justify="space-around"
          align="center"
          css={Step1mainContainerCss}
        >
          {/* step 1*/}
          <Flex direction="column" align="flex-start" style={{ width: '100%' }}>
            <Text typography="t6" bold={true}>
              팀 이름 설정
            </Text>
            <Spacing size={20} direction="vertical" />
            <FluentInput
              placeholder={teamName.length > 0 ? teamName : '팀 이름을 입력해주세요'}
              appearance="filled-lighter-shadow"
              size="large"
              onChange={handleTeamNameInput}
              css={inputCss}
            />
          </Flex>

          <Flex css={btnContainer} justify="flex-end">
            <LargeButton
              text="취소"
              secondary={true}
              width="35vw"
              onClick={() => setIsWrite(!isWrite)}
            />
            <Spacing size={20} direction="horizontal" />
            {teamName.length > 0 
            ? <LargeButton text="다음" width="35vw" onClick={()=> {setStep(2);console.log(teamName)}} />
            : <LargeButton text="다음" width="35vw" disabled={true} />}
          </Flex>
        </Flex>
        :
        <div>
          <Flex
          direction="column"
          justify="space-around"
          align="center"
          css={Step1mainContainerCss}
        >
          {/* step 2*/}
          <Flex direction="column" align="flex-start" style={{ width: '100%' }}>
            <Text typography="t6" bold={true}>
              {teamName}에 구성원 추가
            </Text>
            <Spacing size={20} direction="vertical" />
            <Text bold={true} typography='t8'>
             명함을 공유할 사람의 이름 또는 메일을 입력합니다.
            </Text>
            <Spacing size={20} direction="vertical" />
              <Flex direction='row' align='center' justify='center' css={searchCss}>
                <SearchBox value={teamSearchValue} onChange={(e:any) => {setTeamSearchValue(e.target.value)}} lefticon={false} bgColor='colorNeutralBackground3'  memberIcon={false} filterIcon={false} sortIcon={false} width='70vw'/>
                <LargeButton text='검색' onClick={handleSearch} width='10vw'/>
              </Flex>
          </Flex>

          <Flex css={step2BtnContainer} justify="flex-end">
            <LargeButton
              text="건너뛰기"
              secondary={true}
              width="35vw"
              onClick={() => console.log('건너뛰기 로직넣기 : 수정하기')}
            />
            <Spacing size={20} direction="horizontal" />
            {selectedMember.length > 0 
            ? <LargeButton text="완료" width="35vw" onClick={()=> {setStep(2);console.log(teamName)}} />
            : <LargeButton text="완료" width="35vw" disabled={true} />}
          </Flex>
        </Flex>
        </div>
      }
    </div>
  )
}

export default AddTeam

const btnContainer = css`
  width: 100%;
`
const inputCss = css`
  width: 90%;
  /* margin-left: 5%; */
  background-color: ${tokens.colorNeutralBackground1Hover} !important;
`
const Step1mainContainerCss = css`
margin-top: 2vh;
  padding-left: 5%;
  height: 40vh;
  padding-bottom: 10vh;
  padding-right: 5vw;
`
const arrowContainer = css`
  width: fit-content;
`

const step2BtnContainer = css`
  position: fixed;
  bottom: 0;
  height: 50px;
  background-color: ${tokens.colorNeutralBackground1};
`

const searchCss = css`
  margin-left: -5%;
`