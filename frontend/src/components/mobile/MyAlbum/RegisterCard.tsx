import BackArrow from '@/components/shared/BackArrow'
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import RegisterOtherCardInfo from '@/components/mobile/MyAlbum/RegisterOtherCardInfo'
import PhotoReg from '../MyCard/PhotoCardInfo/PhotoReg'
import { useRecoilValue } from 'recoil'
import { cameraState } from '@/stores/emptyCard'

const RegisterCard = () => {
  const location = useLocation()
  const { userId } = useParams()
  const camera = useRecoilValue(cameraState)
  const isDirectInput = location.state?.isDirectInput

  const [isEnglish, setIsEnglish] = React.useState(false)

  return (
    <div>
      <BackArrow />
      {camera && <PhotoReg isMyCard={false} refetch={() => {}} />}
      {isDirectInput && <RegisterOtherCardInfo isEnglish={isEnglish} />}
    </div>
  )
}

export default RegisterCard
