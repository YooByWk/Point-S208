/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import {
  DialogTrigger,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from '@fluentui/react-components'
import Text from '@shared/Text'
import Input from '@shared/Input'
import { createFilter } from '@/apis/album'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { createTeamFilter } from '@/apis/team'

const AddFilter = ({
  handleAddFilter,
  userId,
  handleModalOpen,
}: {
  onClick?: any
  handleAddFilter: () => void
  userId: number
  handleModalOpen: () => void
}) => {
  const [filterNameInput, setFilterNameInput] = useState('')
  const queryClient = useQueryClient()
  const teamAlbumId = Number(useParams().teamAlbumId)

  const { mutate } = useMutation({
    mutationKey: teamAlbumId
      ? ['createTeamFilter', teamAlbumId, filterNameInput]
      : ['createFilter', userId, filterNameInput],
    mutationFn: teamAlbumId
      ? () => createTeamFilter(userId, teamAlbumId, filterNameInput)
      : () => createFilter({ userId: userId, filterName: filterNameInput }),
    onSuccess(res) {
      handleAddFilter()
      queryClient.invalidateQueries({
        queryKey: teamAlbumId
          ? ['fetchTeamFilterList', teamAlbumId]
          : ['fetchFilterList'],
      })
    },
    onError(err) {
      console.log(err)
    },
  })

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterNameInput(e.target.value)
  }

  const handleAddButtonClick = () => {
    if (filterNameInput.trim() === '') {
      alert('필터 이름을 입력해주세요')
      return
    }
    mutate()
  }
  const closeModal = () => {
    handleAddFilter()
    handleModalOpen()
  }

  return (
    <DialogBody>
      <DialogTitle>
        <Text typography="t6" textAlign="center">
          필터 추가
        </Text>
      </DialogTitle>
      <DialogContent>
        <Input
          placeholder="필터 이름을 입력해주세요"
          onChange={handleInput}
        ></Input>
      </DialogContent>
      <DialogActions>
        <DialogTrigger disableButtonEnhancement>
          <Button appearance="primary" onClick={handleAddButtonClick}>
            추가
          </Button>
        </DialogTrigger>
        <DialogTrigger disableButtonEnhancement>
          <Button appearance="secondary" onClick={closeModal}>
            닫기
          </Button>
        </DialogTrigger>
      </DialogActions>
    </DialogBody>
  )
}

export default AddFilter
