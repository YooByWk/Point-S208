/** @jsxImportSource @emotion/react */
import { shareCard } from "@/apis/album"
import { shareCardType } from "@/types/cardInput"
import { useMutation } from "@tanstack/react-query"
import resModal from "@/components/shared/resModal"
export const useShareCard = () => {
  const Mutate= useMutation({
    mutationKey: ['shareCard'],
    mutationFn: ({id,email}: shareCardType) => shareCard({id,email}),
    onSuccess: () => {
      console.log('shareCard success')
      alert('이메일을 전송했습니다.')
    }
  })
  return Mutate
}
