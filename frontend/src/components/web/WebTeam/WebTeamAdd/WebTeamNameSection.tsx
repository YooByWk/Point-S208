/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { TeamNameType } from '@/types/TeamListType'
import { Button, Input, InputProps } from '@fluentui/react-components'
import Flex from '@/components/shared/Flex'
import Text from '@shared/Text'
import Spacing from '@/components/shared/Spacing'
import { useEffect, useState } from 'react'
import { KeyboardEvent } from 'react'

const WebTeamNameSection = ({
  name,
  setName,
  setStage,
  data,
}: TeamNameType) => {
  const [isError, setIsError] = useState(false)
  const onChange: InputProps['onChange'] = (v, data) => {
    if (data.value.length <= 20) {
      setName(data.value)
    }
  }

  const onKeyDown = (e: KeyboardEvent<Element>) => {
    if (e.key === 'Enter') {
      !isError && setStage(1)
    }
  }

  useEffect(() => {
    data.forEach(item => {
      if (item.teamName === name) {
        setIsError(true)
      }
    })
  }, [data, name])

  return (
    <Flex direction="column" justify="space-between">
      <Text typography="t8" bold={true}>
        새로운 팀 만들기
      </Text>
      <Spacing size={20} />
      <Input
        placeholder="팀 이름을 입력해 주세요"
        value={name}
        onChange={onChange}
        css={inputStyle(isError)}
        appearance="underline"
        onKeyDown={onKeyDown}
      />
      <Spacing size={20} />
      {isError && (
        <Text typography="t9" className="red">
          이미 해당 팀이 존재합니다. 팀 이름을 다시 입력해 주세요
        </Text>
      )}
      <Flex justify="space-between" css={bottomStyle}>
        <Button shape="circular" onClick={() => setStage(-1)}>
          취소
        </Button>
        <Button
          shape="circular"
          onClick={() => setStage(1)}
          disabled={name === '' || isError}
        >
          다음
        </Button>
      </Flex>
    </Flex>
  )
}

export default WebTeamNameSection

// css

const inputStyle = (isError: boolean) => css`
  background-color: #fff;
  ${isError && 'border-bottom: 1px solid red;'}
  ::after {
    ${isError && 'bottom: -1px; border-bottom: 2px solid red;'}
  }
`

const bottomStyle = css`
  position: absolute;
  bottom: 30px;
  width: 440px;
`
