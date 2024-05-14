/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import { TeamListType } from '@/types/TeamListType'
import styled from '@emotion/styled'
import { Button, Input, InputProps } from '@fluentui/react-components'
import { useEffect, useState } from 'react'

const Index = (props: {
  team: TeamListType | undefined
  data: TeamListType[]
}) => {
  const { team, data } = props
  const [isNameEdit, setIsNameEdit] = useState(false)
  const [newName, setNewName] = useState('')
  const [isError, setIsError] = useState(false)
  const onChange: InputProps['onChange'] = (v, data) => {
    if (data.value.length <= 20) {
      setNewName(data.value)
    }
  }

  useEffect(() => {
    const isName = data.some(item => item.teamName === newName)

    if (isName) {
      setIsError(true)
    } else {
      setIsError(false)
    }
  }, [data, newName])

  const renderContent = () => {
    if (isNameEdit)
      return (
        <Flex direction="column">
          <Flex>
            <Text typography="t8" bold={true}>
              {'팀이름 수정하기'}
            </Text>
          </Flex>
          <Spacing size={20} />
          <Input
            placeholder="팀 이름을 입력해 주세요"
            value={newName}
            onChange={onChange}
            css={inputStyle(isError)}
            appearance="underline"
          />
          <Spacing size={20} />
          {isError && (
            <Text typography="t9" className="red">
              {team?.teamName === newName
                ? '현재 팀 이름과 동일합니다. 팀 이름을 다시 입력해 주세요'
                : '이미 해당 팀이 존재합니다. 팀 이름을 다시 입력해 주세요'}
            </Text>
          )}
          <Flex justify="space-between" css={bottomStyle}>
            <Button shape="circular" onClick={() => setIsNameEdit(false)}>
              취소
            </Button>
            <Button
              shape="circular"
              onClick={() => {}}
              disabled={newName === '' || isError}
            >
              수정하기
            </Button>
          </Flex>
        </Flex>
      )

    return (
      <Flex direction="column">
        <Text typography="t6" bold={true} css={TeamNameStyle}>
          {team?.teamName}
        </Text>
        <Flex justify="space-between" css={bottomStyle}>
          <Button shape="circular" onClick={() => {}} className="redBg">
            팀 삭제
          </Button>
          <Button shape="circular" onClick={() => setIsNameEdit(true)}>
            팀 이름 수정
          </Button>
        </Flex>
      </Flex>
    )
  }

  return <Container>{renderContent()}</Container>
}

export default Index

// style

const Container = styled.div`
  width: 500px;
  height: 250px;
  background-color: #fff;
  border-radius: 20px;
  padding: 30px;

  span,
  input {
    color: #000;
  }

  .redBg {
    background-color: #d13448;
  }

  .red {
    color: red;
  }
`

const inputStyle = (isError: boolean) => css`
  background-color: #fff;
  ${isError && 'border-bottom: 1px solid red;'}
  ::after {
    ${isError && 'bottom: -1px; border-bottom: 2px solid red;'}
  }
`

// css

const TeamNameStyle = css`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 440px;
  height: 170px;
`

const bottomStyle = css`
  position: absolute;
  bottom: 30px;
  margin-inline: 50px;
  width: 340px;
`
