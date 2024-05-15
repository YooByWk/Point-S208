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

import Text from '@/components/shared/Text'
import { useMutation, useQuery } from '@tanstack/react-query'
import { addFilterToCard, fetchFilter } from '@/apis/album'
import { useRecoilValue } from 'recoil'
import { userState } from '@/stores/user'
import { FilterListType } from '@/types/FilterType'
import Flex from '@/components/shared/Flex'
import Spacing from './../../../shared/Spacing';
import { useParams } from 'react-router-dom'
import { fetchTeamCardsFilter, fetchTeamFilterList } from '@/apis/team'

interface LargeModalProps {
  dialogTitle: string
  dialogContent?: ReactNode | string
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
  icon,
  cardId
}) => {
  const userId = useRecoilValue(userState).userId
  const params = useParams()
  const teamAlbumId = Number(params?.teamAlbumId) || undefined
  
  // 팀여부 확인완료
  const { data } = useQuery({
    queryKey: params.teamAlbumId? ['fetchTeamFilterList',params.teamAlbumId] : ['fetchMyFilterList'],
    queryFn: params.teamAlbumId?()=>fetchTeamFilterList(teamAlbumId as number)  :() => fetchFilter(userId as number),
  })
  const filterList: FilterListType = data?.data_body || []

  console.log(data,'필터필터')
  console.log(params,'파라')
  const handleAddFilter = (userId: number, cardId: number, filterId: number) => {
    
  }
  
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
              <Flex direction='column' justify='center' align='center'>
                {filterList !== undefined ? (
                  filterList.map((filter, index) => {
                    return <>
                    <Text typography='t7' onClick={()=>addFilterToCard(userId as number,cardId as number,filter.filterId)}>{filter.filterName}</Text>
                    <Spacing size={10}/>
                    </>
                  })
                ) : (
                  <p>명함 필터가 없습니다. 필터를 생성해주세요</p>
                )}
                {dialogContent}
              </Flex>
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
