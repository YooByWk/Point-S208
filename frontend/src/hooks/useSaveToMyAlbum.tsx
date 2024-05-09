import { saveToMyAlbum } from '@/apis/album'
import { useMutation } from '@tanstack/react-query'

export const useSaveToMyAlbum = () => {
  const mutation = useMutation({
    mutationKey: ['SaveToMyAlbum'],
    mutationFn: ({ userId, cardIds }: { userId: number; cardIds: number[] }) =>
      saveToMyAlbum(userId, cardIds),
    onSuccess: () => {
      console.log('저장 성공')
    },
    onError: error => {
      console.log('저장 실패', error)
      window.alert('저장에 실패했습니다. 다시 시도해주세요.')
    },
  })

  return mutation
}
