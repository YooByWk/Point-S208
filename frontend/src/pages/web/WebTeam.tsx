import { fetchTeamList } from '@/apis/team'
import Modal from '@/components/shared/Modal'
import WebTeamAdd from '@/components/web/WebTeam/WebTeamAdd'
import WebTeamDetailHeader from '@/components/web/WebTeam/WebTeamDetail/WebTeamDetailHeader'
import WebTeamDetailList from '@/components/web/WebTeam/WebTeamDetail/WebTeamDetailList'
import WebTeamHeader from '@/components/web/WebTeam/WebTeamHeader'
import WebTeamList from '@/components/web/WebTeam/WebTeamList'
import { hasSelectedTeam as hasSelectedTeamState } from '@/stores/team'
import { userState } from '@/stores/user'
import { Spinner } from '@fluentui/react-components'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'

const WebTeam = () => {
  const userId = useRecoilValue(userState).userId as number
  const hasSelectedTeam = useRecoilValue(hasSelectedTeamState)
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [isDetail, setIsDetail] = useState(false)
  const [isAdd, setIsAdd] = useState(false)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['fetchTeamList'],
    queryFn: () => fetchTeamList(6),
  })

  // 특정 팀 내 특정 명함 페이지
  if (isDetail) {
    return <>특정 팀 내 특정 명함 디테일</>
  }

  // 특정 팀 페이지
  if (hasSelectedTeam) {
    return (
      <>
        <WebTeamDetailHeader />
        <WebTeamDetailList
          selectedCards={selectedCards}
          setIsDetail={setIsDetail}
          setSelectedCards={setSelectedCards}
        />
      </>
    )
  }

  // 내 팀 목록 페이지
  return (
    <>
      {isLoading && <Spinner label="로딩 중..." style={{ height: '100vh' }} />}
      {!isLoading && (
        <>
          <WebTeamHeader value={isAdd} setValue={setIsAdd} />
          <WebTeamList data={data} value={isAdd} setValue={setIsAdd} />
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
