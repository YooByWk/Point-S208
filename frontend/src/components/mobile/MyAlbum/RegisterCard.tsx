import BackArrow from '@/components/shared/BackArrow';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RegisterOtherCardInfo from'@/components/mobile/MyAlbum/RegisterOtherCardInfo'

const RegisterCard = () => {
  
  const location = useLocation();
  const { userId } = useParams();
  const isCameraInput = location.state?.isCameraInput;
  const isDirectInput = location.state?.isDirectInput;
  console.log('isCameraInput: ', isCameraInput);
  console.log('isDirectInput: ', isDirectInput);
  
  const [isEnglish, setIsEnglish] = React.useState(false);
  
  return (
    <div>
      <BackArrow/>
      {isCameraInput && '카메라 입력' }
      {isDirectInput && <RegisterOtherCardInfo isEnglish={isEnglish} />}
    </div>
  );
};

export default RegisterCard;