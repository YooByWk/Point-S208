/** @jsxImportSource @emotion/react */
import { ReactElement, useEffect, useMemo, useReducer, useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  tokens,
} from '@fluentui/react-components'
import Text from '@shared/Text'
import Input from '@shared/Input'
import {
  Add16Filled,
  Edit16Filled,
  Delete16Filled,
} from '@fluentui/react-icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteFilter, editFilter, fetchFilter } from '@/apis/album'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userState } from '@/stores/user'
import {
  EditFilterArgs,
  FilterListType,
  FilterNameAction,
  FilterNameState,
  FilterType,
  editTeamFilterType,
} from '@/types/FilterType'
import LargeButton from '@shared/LargeButton'
import Flex from '@/components/shared/Flex'
import Spacing from '@shared/Spacing'
import { css } from '@emotion/react'
import AddFilter from '@/components/mobile/MyAlbum/Filter/AddFillter'
import React from 'react'
import { filterState as filterStoreState } from '@/stores/album'
import { useParams } from 'react-router-dom'
import {
  deleteTeamFilter,
  editTeamFilter,
  fetchTeamFilterList,
} from '@/apis/team'

const NoFilter = ({ handleAddFilter }: { handleAddFilter: () => void }) => {
  return (
    <Flex direction="column" justify="space-evenly">
      <Text typography="t7" textAlign="center">
        생성된 명함 필터가 없습니다.
      </Text>
      <Spacing size={20} direction="vertical" />
      <LargeButton
        text="필터 추가하기"
        width="100%"
        height="32"
        onClick={handleAddFilter}
      />
    </Flex>
  )
}

const Filter = ({
  filterId,
  filterName,
  onClick,
  onDelete,
}: {
  filterId: number
  filterName: string
  onClick?: () => void
  onDelete: (filterId: number, filterName: string) => void
}) => {
  return (
    <Flex direction="row" justify="center" align="center">
      <Text typography="t7">{filterName}</Text>
      <Spacing size={30} direction="horizontal" />
      <Edit16Filled onClick={onClick} />
      <Spacing size={15} direction="horizontal" />
      <Delete16Filled
        onClick={e => {
          e.stopPropagation()
          onDelete(filterId, filterName)
        }}
      />
    </Flex>
  )
}

interface LargeModalProps {
  dialogTitle: string
  dialogContent?: ReactElement | string
  icon: ReactElement
}

const FilterIconModal: React.FC<LargeModalProps> = ({
  dialogTitle,
  dialogContent,
  icon,
}) => {
  const userId = useRecoilValue(userState).userId
  const [isAddFilter, setIsAddFilter] = useState(false)
  const [editingFilterId, setEditingFilterId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [, setFilterState] = useRecoilState(filterStoreState)
  const queryClient = useQueryClient()
  const params = useParams()
  const teamAlbumId = Number(params['teamAlbumId'])

  const { data } = useQuery({
    queryKey: teamAlbumId ? ['fetchTeamFilterList'] : ['fetchFilterList'],
    queryFn: teamAlbumId
      ? () => fetchTeamFilterList(teamAlbumId)
      : () => fetchFilter(userId as number),
  })
  let filterList: FilterListType = useMemo(() => {
    return data?.data_body || []
  }, [data])
  const handleAddFilter = () => {
    setIsAddFilter(!isAddFilter)
  }

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleEditClick = (filterId: number) => {
    setEditingFilterId(filterId)
  }

  const handleCardClick = (filter: FilterType) => {
    setFilterState({
      filterId: filter.filterId,
      filterName: filter.filterName,
    })
    handleModalOpen()
  }

  const filterNameReducer = (
    state: FilterNameState,
    action: FilterNameAction,
  ): FilterNameState => {
    switch (action.type) {
      case 'SET_NAME':
        return { ...state, [action.filterId]: action.name }
      default:
        throw new Error()
    }
  }
  const [filterNames, dispatch] = useReducer(filterNameReducer, {})
  useEffect(() => {
    const initialFilterNames = filterList.reduce((acc, filter) => {
      acc[filter.filterId] = filter.filterName
      return acc
    }, {} as FilterNameState)

    for (const filterId in initialFilterNames) {
      dispatch({
        type: 'SET_NAME',
        filterId: Number(filterId),
        name: initialFilterNames[filterId],
      })
    }
  }, [filterList])

  const { mutate: mutateFilter } = useMutation({
    mutationKey: ['editFilter'],
    mutationFn: teamAlbumId
      ? ({ userId, filterId, filterName, teamAlbumId }: editTeamFilterType) =>
          editTeamFilter({ userId, filterId, filterName, teamAlbumId })
      : ({ userId, filterId, filterName }: EditFilterArgs) =>
          editFilter(userId, filterId, filterName),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: teamAlbumId
          ? ['fetchTeamFilterList', teamAlbumId]
          : ['fetchFilterList'],
      })
    },
  })

  const { mutate: mutateDeleteFilter } = useMutation({
    mutationKey: ['deleteFilter'],
    mutationFn: teamAlbumId
      ? ({
          userId,
          filterId,
          teamAlbumId,
        }: {
          userId: number
          filterId: number
          teamAlbumId: number
        }) => deleteTeamFilter(userId, teamAlbumId, filterId)
      : ({ userId, filterId }: { userId: number; filterId: number }) =>
          deleteFilter(userId, filterId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['fetchFilterList'] })
    },
  })

  const handleFilterNameSave = (filterId: number) => {
    let editData = {
      userId: userId as number,
      filterId: filterId,
      filterName: filterNames[filterId],
      teamAlbumId,
    }
    mutateFilter(editData)
    setEditingFilterId(null)
  }

  const handleDeleteFilter = (filterId: number, filterName: string) => {
    if (window.confirm(`${filterName}을/를 삭제하시겠습니까?`)) {
      mutateDeleteFilter({
        userId: userId as number,
        filterId: filterId,
        teamAlbumId,
      })
    }
  }

  const handleFilterNameChange =
    (filterId: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'SET_NAME', filterId, name: e.target.value })
    }

  return (
    <Dialog modalType="alert" open={isModalOpen}>
      <DialogTrigger disableButtonEnhancement>
        <div onClick={handleModalOpen}>{icon}</div>
      </DialogTrigger>
      <DialogSurface>
        {isAddFilter ? (
          <AddFilter
            handleModalOpen={handleModalOpen}
            handleAddFilter={handleAddFilter}
            userId={userId as number}
          />
        ) : (
          <DialogBody css={bodyCss}>
            <DialogTitle>
              <Flex align="center" justify="space-between">
                {dialogTitle}
                {filterList !== undefined && (
                  <Flex>
                    <Add16Filled
                      color={tokens.colorBrandForeground1}
                      onClick={() => {
                        setIsAddFilter(!isAddFilter)
                      }}
                    />
                  </Flex>
                )}
              </Flex>
              <hr />
            </DialogTitle>
            <DialogContent>
              {
                <Flex direction="column">
                  {filterList !== undefined && filterList.length > 0 ? (
                    filterList.map((filter, index) => {
                      const isEditing = filter.filterId === editingFilterId
                      return (
                        <div key={index}>
                          {isEditing ? (
                            <Flex align="center">
                              <Input
                                value={filterNames[filter.filterId] || ''}
                                onChange={handleFilterNameChange(
                                  filter.filterId,
                                )}
                              />
                              <Button
                                appearance="primary"
                                onClick={() =>
                                  handleFilterNameSave(filter.filterId)
                                }
                                css={btnCss}
                              >
                                완료
                              </Button>
                            </Flex>
                          ) : (
                            <div
                              key={index}
                              onClick={() => handleCardClick(filter)}
                            >
                              <Filter
                                filterId={filter.filterId}
                                filterName={filter.filterName}
                                onClick={() => handleEditClick(filter.filterId)}
                                onDelete={handleDeleteFilter}
                              />
                            </div>
                          )}
                        </div>
                      )
                    })
                  ) : (
                    <NoFilter handleAddFilter={handleAddFilter} />
                  )}
                  {dialogContent}
                </Flex>
              }
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary" onClick={handleModalOpen}>
                  닫기
                </Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        )}
      </DialogSurface>
    </Dialog>
  )
}

export default FilterIconModal

const btnCss = css`
  height: 48px;
`

const bodyCss = css`
  height: fit-content;
  max-height: 40vh;
  overflow-y: scroll;
`
