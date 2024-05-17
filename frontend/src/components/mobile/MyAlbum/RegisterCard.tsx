import BackArrow from '@/components/shared/BackArrow'
import React from 'react'
import { useLocation } from 'react-router-dom'
import RegisterOtherCardInfo from '@/components/mobile/MyAlbum/RegisterOtherCardInfo'
import PhotoReg from '../MyCard/PhotoCardInfo/PhotoReg'
import { useRecoilValue } from 'recoil'
import { cameraState } from '@/stores/emptyCard'

const RegisterCard = () => {
  const location = useLocation()
  const camera = useRecoilValue(cameraState)
  const isDirectInput = location.state?.isDirectInput
  const [isEnglish] = React.useState(false)

  return (
    <>
      {camera && <PhotoReg isMyCard={false} refetch={() => {}} />}
      {isDirectInput && (
        <>
          <BackArrow />
          <RegisterOtherCardInfo isEnglish={isEnglish} />
        </>
      )}
    </>
  )
}

export default RegisterCard
