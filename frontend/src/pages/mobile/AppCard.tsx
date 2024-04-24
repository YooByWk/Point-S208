/** @jsxImportSource @emotion/react */
import WriteCardInfo from '@components/mobile/MyCard/WriteCardInfo'
import EmptyCard from '@components/mobile/MyCard/EmptyCard'
import { writeInfoState } from '@stores/writeInfo'
import { useRecoilValue } from 'recoil'

const AppCard = () => {
  const isCard = false
  const writeInfo = useRecoilValue(writeInfoState)

  return <>{!isCard ? writeInfo ? <WriteCardInfo /> : <EmptyCard /> : null}</>
}

export default AppCard
