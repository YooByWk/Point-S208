/** @jsxImportSource @emotion/react */
import WriteCardInfo from '@components/mobile/MyCard/WriteCardInfo'
import EmptyCard from '@components/mobile/MyCard/EmptyCard'
import { useRecoilValue } from 'recoil'
import { cameraState, writeInfoState } from '@/stores/emptyCard'
import Camera from '@/components/mobile/MyCard/Camera'

const AppCard = () => {
  const isCard = false
  const writeInfo = useRecoilValue(writeInfoState)
  const camera = useRecoilValue(cameraState)

  return (
    <>
      {isCard ? null : (
        <>
          {writeInfo ? <WriteCardInfo /> : camera ? <Camera /> : <EmptyCard />}
        </>
      )}
    </>
  )
}

export default AppCard
