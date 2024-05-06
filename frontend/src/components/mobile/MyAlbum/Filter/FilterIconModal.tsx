/** @jsxImportSource @emotion/react */
import {
  ReactElement,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
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
import { useRecoilValue } from 'recoil'
import { userState } from '@/stores/user'
import {
  EditFilterArgs,
  FilterListType,
  FilterNameAction,
  FilterNameState,
} from '@/types/FilterType'
import LargeButton from '@shared/LargeButton'
import Flex from '@/components/shared/Flex'
import Spacing from '@shared/Spacing'
import { css } from '@emotion/react'
import AddFilter from '@/components/mobile/MyAlbum/Filter/AddFillter'

///
const NoFilter = ({
  handleAddFilter,
}: {
  handleAddFilter: () => void
}) => {
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
      <Text>{filterName}</Text>
      <Spacing size={30} direction="horizontal" />
      <Edit16Filled onClick={onClick} />
      <Delete16Filled onClick={()=>onDelete(filterId, filterName)}/>
    </Flex>
  )
}
///

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
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['fetchFilterList'],
    queryFn: () => fetchFilter(userId as number),
  })

  let filterList: FilterListType = useMemo(() => {
    return data || []
  }, [data])

  const handleAddFilter = () => {
    setIsAddFilter(!isAddFilter)
  }

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleEditClick = (filterId: number) => () => {
    setEditingFilterId(filterId)
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
    mutationFn: ({ userId, filterId, filterName }: EditFilterArgs) =>
      editFilter(userId, filterId, filterName),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['fetchFilterList'] })
    },
  })
  
  const { mutate: mutateDeleteFilter } = useMutation({ 
    mutationKey: ['deleteFilter'],
    mutationFn: ({ userId, filterId }: { userId: number, filterId: number }) => deleteFilter(userId, filterId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['fetchFilterList'] })
    }
  })
  
  const handleFilterNameSave = (filterId: number) => {
    console.log(filterNames[filterId])
    let editData = {
      userId: userId as number,
      filterId: filterId,
      filterName: filterNames[filterId],
    }
    mutateFilter(editData)
    setEditingFilterId(null)
  }

  const handleDeleteFilter = (filterId: number, filterName: string) => {
    if (window.confirm(`${filterName}을/를 삭제하시겠습니까?`)) {
      mutateDeleteFilter({ userId: userId as number, filterId: filterId })
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
          <DialogBody>
            <DialogTitle>
              <Flex align="center" justify="space-between">
                {dialogTitle}
                {filterList !== undefined && (
                  <Flex>
                    <Add16Filled
                      onClick={() => {
                        setIsAddFilter(!isAddFilter)
                      }}
                    />

                  </Flex>
                )}
              </Flex>
            </DialogTitle>
            <DialogContent>
              {
                <Flex direction="column">
                  {filterList !== undefined && filterList.length > 0 ? (
                    filterList.map((filter, index) => {
                      const isEditing = filter.filterId === editingFilterId
                      return (
                        <>
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
                                onClick={() =>handleFilterNameSave(filter.filterId)}
                                css={btnCss}>
                                완료
                              </Button>
                            </Flex>
                          ) : (
                            <Filter
                              filterId={filter.filterId}
                              filterName={filter.filterName}
                              onClick={handleEditClick(filter.filterId)}
                              onDelete={handleDeleteFilter}
                            />
                          )}
                        </>
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
