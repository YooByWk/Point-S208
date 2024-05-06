/** @jsxImportSource @emotion/react */
import { ReactElement, ReactNode } from 'react'
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


import { useQuery } from '@tanstack/react-query'
import { fetchFilter } from '@/apis/album'
import { useRecoilValue } from 'recoil'
import { userState } from '@/stores/user'
import { FilterListType } from '@/types/FilterType'

interface LargeModalProps {
  dialogTitle: string
  dialogContent: ReactNode | string
  onClick: () => void
  closeButtonText?: string
  cardId?: number
  icon: ReactElement
}

/**
 * 뭔가 뭔가
 * @returns
 */
const DetailAddFilterModal: React.FC<LargeModalProps> = ({
  dialogTitle,
  dialogContent,
  closeButtonText,
  icon
}) => {
  const userId = useRecoilValue(userState).userId
  const { data } = useQuery({
    queryKey: ['fetchFilterList'],
    queryFn: () => fetchFilter(userId as number),
  })
  const filterList: FilterListType = data?.data_body || []

  
  return (
    <Dialog modalType="alert">
      <DialogTrigger disableButtonEnhancement>
        {icon}
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            {
              <>
                {filterList !== undefined ? (
                  filterList.map((filter, index) => {
                    return <div onClick={()=>console.log(filter.filterId)}>{filter.filterName}</div>
                  })
                ) : (
                  <p>명함 필터가 없습니다. 필터를 생성해주세요</p>
                )}
                {dialogContent}
              </>
            }
          </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">
                  {closeButtonText ? closeButtonText : '닫기'}{' '}
                </Button>
              </DialogTrigger>
            </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}

export default DetailAddFilterModal
