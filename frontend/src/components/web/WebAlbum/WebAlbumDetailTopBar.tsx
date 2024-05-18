import {
  ShareAndroid16Filled,
  ArrowLeft16Filled,
  Delete16Filled,
  Edit16Filled,
} from '@fluentui/react-icons'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import TextButton from '@shared/TextButton'
import Spacing from '@shared/Spacing'
import { Button } from '@fluentui/react-components'
import { useRecoilValue } from 'recoil'
import { selectedCardState } from '@/stores/card'
import WebAlbumDeleteSingleCard from './WebAlbumDeleteSingleCard'
import WebAlbumShare from './WebAlbumShare'

const WebAlbumDetailTopBar = ({
  setIsDetail,
  setEditOpen,
}: {
  setIsDetail: (isCard: boolean) => void
  setEditOpen: (isOpen: boolean) => void
}) => {
  const selectedCard = useRecoilValue(selectedCardState)

  return (
    <>
      <Flex justify="space-between" align="center">
        <Button appearance="transparent" onClick={() => setIsDetail(false)}>
          <Text typography="t9" textAlign="center">
            <ArrowLeft16Filled /> 뒤로가기
          </Text>
        </Button>
        <Flex>
          <TextButton
            onClick={() => {
              setEditOpen(true)
            }}
          >
            <Edit16Filled /> 수정
          </TextButton>
          <Spacing size={10} direction="horizontal" />

          <WebAlbumShare card={selectedCard}>
            <Button shape="circular">
              <Text typography="t7">
                <ShareAndroid16Filled /> 공유
              </Text>
            </Button>
          </WebAlbumShare>

          <Spacing size={10} direction="horizontal" />

          <WebAlbumDeleteSingleCard
            cardInfo={selectedCard}
            setIsDetail={setIsDetail}
          >
            <Button shape="circular">
              <Text typography="t7">
                <Delete16Filled /> 삭제
              </Text>
            </Button>
          </WebAlbumDeleteSingleCard>

          <Spacing size={10} direction="horizontal" />
        </Flex>
      </Flex>
    </>
  )
}

export default WebAlbumDetailTopBar
