import WebTeamDetailHeader from '@/components/web/WebTeam/WebTeamDetail/WebTeamDetailHeader'
import WebTeamDetailList from '@/components/web/WebTeam/WebTeamDetail/WebTeamDetailList'
import WebTeamHeader from '@/components/web/WebTeam/WebTeamHeader'
import WebTeamList from '@/components/web/WebTeam/WebTeamList'
import { hasSelectedTeam as hasSelectedTeamState } from '@/stores/team'
import { useRecoilValue } from 'recoil'

const WebTeam = () => {
  const hasSelectedTeam = useRecoilValue(hasSelectedTeamState)

  return (
    <>
      {hasSelectedTeam ? (
        <>
          <WebTeamDetailHeader />
          <WebTeamDetailList />
        </>
      ) : (
        <>
          <WebTeamHeader />
          <WebTeamList />
        </>
      )}
    </>
  )
}

export default WebTeam
