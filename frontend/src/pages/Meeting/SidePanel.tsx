import MeetingAlbumSection from '@components/Meeting/MeetingAlbumSection'
import MeetingCardSection from '@components/Meeting/MeetingCardSection'
import MeetingShareSection from '@components/Meeting/MeetingShareSection'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'

const SidePanel = () => {
  return (
    <Flex direction="column" justify="space-around">
      <MeetingCardSection />
      <MeetingShareSection />
      <Spacing direction="vertical" size={10} />
      <MeetingAlbumSection />
    </Flex>
  )
}

export default SidePanel
