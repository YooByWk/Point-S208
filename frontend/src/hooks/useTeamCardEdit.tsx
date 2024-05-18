import { editTeamCard } from '@/apis/team'
import { selectedTeamAlbumIdState } from '@/stores/team'
import { ExternalCardType } from '@/types/ExternalCard'
import { cardInput } from '@/types/cardInput'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'

export const useTeamCardEdit = (card: ExternalCardType) => {
  const selectedAlbumId = useRecoilValue(selectedTeamAlbumIdState)
    .teamAlbumId as number
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ['editTeamCard'],
    mutationFn: ({
      userId,
      teamAlbumId,
      cardId,
      data,
    }: {
      userId: number
      cardId: number
      teamAlbumId: number
      data: cardInput
    }) =>
      editTeamCard({
        userId: userId,
        cardId: cardId,
        teamAlbumId: teamAlbumId,
        data: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['fetchTeamCardDetail', selectedAlbumId, card.cardId],
      })
    },
    onError: error => {
      console.log('팀 카드 생성 실패', error, error.message)
      window.alert('팀 카드 생성에 실패했습니다. 다시 시도해주세요.')
    },
  })

  return mutation
}
