import { fetchTeamList } from '@/apis/team'
import Modal from '@/components/shared/Modal'
import WebTeamAdd from '@/components/web/WebTeam/WebTeamAdd'
import WebTeamDetail from '@/components/web/WebTeam/WebTeamDetail/WebTeamDetail'
import WebTeamHeader from '@/components/web/WebTeam/WebTeamHeader'
import WebTeamList from '@/components/web/WebTeam/WebTeamList'
import { hasSelectedTeam as hasSelectedTeamState } from '@/stores/team'
import { userState } from '@/stores/user'
import { TeamListType } from '@/types/TeamListType'
import { Spinner } from '@fluentui/react-components'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'

const WebTeam = () => {
  const userId = useRecoilValue(userState).userId as number
  const hasSelectedTeam = useRecoilValue(hasSelectedTeamState)
  const [isAdd, setIsAdd] = useState(false)
  const [searchTeamList, setSearchTeamList] = useState<TeamListType[]>([]) // 검색한 팀 목록
  const [isEdit, setIsEdit] = useState(false)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['fetchTeamList'],
    queryFn: () => fetchTeamList(userId),
  })

  // 특정 팀 페이지
  if (hasSelectedTeam) {
    return <WebTeamDetail />
  }

  // 내 팀 목록 페이지
  return (
    <>
      {isLoading && <Spinner label="로딩 중..." style={{ height: '100vh' }} />}
      {!isLoading && (
        <>
          <WebTeamHeader
            data={data}
            setSearchTeamList={setSearchTeamList}
            value={isAdd}
            setValue={setIsAdd}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
          <WebTeamList
            data={searchTeamList}
            value={isAdd}
            setValue={setIsAdd}
            isEdit={isEdit}
          />
        </>
      )}
      {isAdd && (
        <Modal onClose={() => setIsAdd(false)}>
          <WebTeamAdd
            value={isAdd}
            setValue={setIsAdd}
            data={data}
            refetch={refetch}
          />
        </Modal>
      )}
    </>
  )
}

export default WebTeam
