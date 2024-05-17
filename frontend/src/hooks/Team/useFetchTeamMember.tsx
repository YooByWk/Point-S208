import { useQuery } from '@tanstack/react-query'
import { fetchTeamMember } from '@/apis/team'
import { useRecoilValue } from 'recoil'
import { userState } from '@/stores/user'

export const useFetchTeamMember = ({ teamId }: { teamId: number }) => {
  const userId = useRecoilValue(userState).userId

  const data = useQuery({
    queryKey: ['fetchTeamMember', userId],
    queryFn: () => {
      if (!userId) {
        throw new Error('User ID is not available')
      }
      return fetchTeamMember(teamId, userId)
    },
  })
  return data
}
