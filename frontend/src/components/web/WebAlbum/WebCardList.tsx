import WebCardThumbnail from '@shared/WebCardThumbnail'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'

const WebCardList = (cards: any[]) => {
  return (
    <>
      <Flex direction="column" justify="center" align="center">
        {cards
          .filter(card => card)
          .map(card => {
            return (
              <WebCardThumbnail
                cardInfo={card}
                key={card.cardId}
                onSelect={() => {}}
                selectedCards={[]}
              />
            )
          })}
        <Spacing size={40} direction="vertical" />
      </Flex>
    </>
  )
}

export default WebCardList
