import { RegisterTeammCard } from '@/apis/team'
import { userState } from '@/stores/user'
import { cardInput } from '@/types/cardInput'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'
export const useTeamCardAdd = () => {
  const userId = useRecoilValue(userState).userId
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['RegisterTeammCard'],
    mutationFn: ({
      userId,
      teamAlbumId,
      data,
    }: {
      userId: number
      teamAlbumId: number
      data: cardInput
    }) => RegisterTeammCard({userId: userId, teamId: teamAlbumId, data: data }),
    onSuccess: () => {
      console.log('팀 카드 등록 성공')
      queryClient.invalidateQueries({ queryKey: ['fetchTeamList'] })
    },
    onError: error => {
      console.log('팀 카드 생성 실패', error, error.message)
      window.alert('팀 카드 생성에 실패했습니다. 다시 시도해주세요.')
    },
  })

  return mutation
}
