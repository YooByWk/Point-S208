/** @jsxImportSource @emotion/react */
import WriteCardInfo from '@components/mobile/MyCard/WriteCardInfo'
import EmptyCard from '@components/mobile/MyCard/EmptyCard'
import { useRecoilValue } from 'recoil'
import { cameraState, writeInfoState } from '@/stores/emptyCard'
import PhotoReg from '@/components/mobile/MyCard/PhotoCardInfo/PhotoReg'

const AppCard = () => {
  const isCard = false
  const writeInfo = useRecoilValue(writeInfoState)
  const camera = useRecoilValue(cameraState)

  return (
    <>
      {isCard ? null : (
        <>
          {writeInfo ? (
            <WriteCardInfo />
          ) : camera ? (
            <PhotoReg isMyCard={true} />
          ) : (
            <EmptyCard />
          )}
        </>
      )}
    </>
  )
}

export default AppCard
