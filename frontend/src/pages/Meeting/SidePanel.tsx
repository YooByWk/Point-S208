import { fetchMyCard } from '@/apis/card'
import { backCardState, frontCardState } from '@/stores/card'
import { userState } from '@/stores/user'
import MeetingAlbumSection from '@components/Meeting/MeetingAlbumSection'
import MeetingCardSection from '@components/Meeting/MeetingCardSection'
import MeetingShareSection from '@components/Meeting/MeetingShareSection'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

const SidePanel = () => {
  const userId = useRecoilValue(userState).userId
  const setFrontCard = useSetRecoilState(frontCardState)
  const setBackCard = useSetRecoilState(backCardState)
  // const card = isFront ? frontCard : backCard

  const { mutate } = useMutation({
    mutationKey: ['fetchMyCard'],
    mutationFn: fetchMyCard,
    onSuccess(result) {
      console.log('불러오기 성공', result)
      setFrontCard(result.front)
      setBackCard(result.back)
    },
    onError(error) {
      console.error('불러오기 실패:', error)
    },
  })

  useEffect(() => {
    mutate(userId)
  }, [userId, mutate])

  return (
    <Flex direction="column" justify="space-around">
      <MeetingCardSection />
      <MeetingShareSection />
      <Spacing direction="vertical" size={2} />
      <MeetingAlbumSection />
    </Flex>
  )
}

export default SidePanel
