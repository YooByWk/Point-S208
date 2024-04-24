import LargeButton from '@/components/shared/LargeButton'

import { customLightTheme, customDarkTheme } from '@/styles/colorRamp'
import { tokens } from '@fluentui/react-components'
import { colors } from '@/styles/colorPalette'
import LargeModal from './../../components/shared/LargeModal'

const WebAlbum = () => {
  return (
    <div>
      웹 명함 지갑
      <LargeButton
        text="명함 추가"
        secondary={false}
        onClick={() => {
          console.log('혹시설마진짜?')
        }}
      />
      <LargeModal
        buttonText="모달 열기"
        dialogTitle="모달제목"
        dialogContent='내용내용내용내용내용내용내용내용'
        actionButtonText="확인"
        
        onClick={() => {
          console.log('혹시설마진짜모달?')
        }}
      />
      <p
        style={{
          backgroundColor: colors.themeMainBlue,
          color: colors.themeTextInverted,
        }}
      >
        ㅁㄴㅇ로ㅓㅏㅁㄴㅇ로ㅓㅏㅣㅁㄴㅇ로ㅓㅏㅣㄻㄴ오ㅓㅏㅣㄻㄴ오ㅓㅏㅣㅇㅁㄴ로ㅓㅏㅣㅁㄹㄴ오ㅓㅏㅣㅇㅁㄴㄹ
      </p>
    </div>
  )
}

export default WebAlbum
