/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import { TeamListType } from '@/types/TeamListType'
import styled from '@emotion/styled'
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Input,
  InputProps,
} from '@fluentui/react-components'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { deleteTeam, editTeamName } from '@/apis/team'
import { useRecoilValue } from 'recoil'
import { userState } from '@/stores/user'

const AppTeamEdit = (props: {
  team: TeamListType | undefined
  data: TeamListType[]
  refetch: any
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const { team, data, refetch, setIsOpen } = props
  const userId = useRecoilValue(userState).userId as number
  const [isNameEdit, setIsNameEdit] = useState(false)
  const [newName, setNewName] = useState('')
  const [isError, setIsError] = useState(false)
  const onChange: InputProps['onChange'] = (v, data) => {
    if (data.value.length <= 20) {
      setNewName(data.value)
    }
  }

  const { mutate: deleteTeamMutate } = useMutation({
    mutationKey: ['deleteTeam'],
    mutationFn: deleteTeam,
    onSuccess(result) {
      console.log('등록 성공', result)
      refetch()
      setIsOpen(false)
    },
    onError(error) {
      console.error('등록 실패:', error)
    },
  })

  const deleteHandler = () => {
    try {
      deleteTeamMutate({ userId: userId, teamAlbumId: team?.teamAlbumId })
    } catch (error) {
      console.error('팀 삭제 중 오류 발생:', error)
    }
  }

  const { mutate: editTeamNameMutate } = useMutation({
    mutationKey: ['editTeamName'],
    mutationFn: editTeamName,
    onSuccess(result) {
      console.log('등록 성공', result)
      refetch()
      setIsOpen(false)
    },
    onError(error) {
      console.error('등록 실패:', error)
    },
  })

  const editTeamNameHandler = () => {
    try {
      editTeamNameMutate({
        userId: userId,
        teamAlbumId: team?.teamAlbumId,
        newName: newName,
      })
    } catch (error) {
      console.error('팀 삭제 중 오류 발생:', error)
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
              {team?.teamName === newName ? (
                <>
                  현재 팀 이름과 동일합니다.
                  <br /> 팀 이름을 다시 입력해 주세요
                </>
              ) : (
                <>
                  이미 해당 팀이 존재합니다.
                  <br /> 팀 이름을 다시 입력해 주세요
                </>
              )}
            </Text>
          )}
          <Flex justify="space-between" css={bottomStyle}>
            <Button shape="circular" onClick={() => setIsNameEdit(false)}>
              취소
            </Button>
            <Button
              shape="circular"
              onClick={editTeamNameHandler}
              disabled={newName === '' || isError}
            >
              수정하기
            </Button>
          </Flex>
        </Flex>
      )

    return (
      <Flex direction="column">
        <Text typography="t6" bold={true} css={teamNameStyle}>
          {team?.teamName}
        </Text>
        <Flex justify="space-between" css={bottomStyle}>
          <Dialog>
            <DialogTrigger disableButtonEnhancement>
              <Button shape="circular" onClick={() => {}} css={redBgStyle}>
                팀 삭제
              </Button>
            </DialogTrigger>
            <DialogSurface>
              <DialogBody>
                <DialogTitle>{team?.teamName}을 삭제하시겠습니까?</DialogTitle>
                <DialogActions>
                  <Button css={redBgStyle} onClick={deleteHandler}>
                    삭제
                  </Button>
                  <DialogTrigger disableButtonEnhancement>
                    <Button appearance="secondary">취소</Button>
                  </DialogTrigger>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
          <Button shape="circular" onClick={() => setIsNameEdit(true)}>
            팀 이름 수정
          </Button>
        </Flex>
      </Flex>
    )
  }

  return <Container $isNameEdit={isNameEdit}>{renderContent()}</Container>
}

export default AppTeamEdit

// style

const Container = styled.div<{ $isNameEdit: boolean }>`
  margin-inline: 30px;
  width: calc(100vw - 60px);
  height: ${props => (props.$isNameEdit ? '50vh' : '30vh')};
  background-color: #fff;
  border-radius: 20px;
  padding: 30px;

  span,
  input {
    color: #000;
  }

  .red {
    color: red;
  }
`

// css

const inputStyle = (isError: boolean) => css`
  background-color: #fff;
  ${isError && 'border-bottom: 1px solid red;'}
  ::after {
    ${isError && 'bottom: -1px; border-bottom: 2px solid red;'}
  }
`

const teamNameStyle = css`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 120px);
  height: 12vh;
`

const bottomStyle = css`
  position: absolute;
  bottom: 30px;
  width: calc(100vw - 120px);
`

const redBgStyle = css`
  background-color: #d13448;
  color: #fff;
`
