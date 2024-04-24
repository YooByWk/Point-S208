/** @jsxImportSource @emotion/react */
import EmptyCard from '@/components/mobile/MyCard/EmptyCard'
import * as s from './AppCard.styled'

const AppCard = () => {
  const isCard = false

  return (
    <>
      {!isCard && <EmptyCard />}
    </>
  )
}

export default AppCard
