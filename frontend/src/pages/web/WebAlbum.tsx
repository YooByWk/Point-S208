import LargeButton from "@/components/shared/LargeButton"

import { customLightTheme, customDarkTheme } from "@/styles/colorRamp"
import { tokens } from "@fluentui/react-components"
import { colors } from "@/styles/colorPalette"

const WebAlbum = () => {
  
  return (
    <div>
      웹 명함 지갑
      <LargeButton text="명함 추가" onClick={() => {console.log('혹시설마진짜?')}} bgColor="ssafyLightBlue" />
      <p 
      style={{backgroundColor: tokens.colorNeutralForeground3, color:tokens.colorNeutralBackground5, width: '100px', height: '100px'}}
      >으악</p>
      <p
      style={{backgroundColor: colors.themeMainBlue, color:colors.themeTextInverted }}>ㅁㄴㅇ로ㅓㅏㅁㄴㅇ로ㅓㅏㅣㅁㄴㅇ로ㅓㅏㅣㄻㄴ오ㅓㅏㅣㄻㄴ오ㅓㅏㅣㅇㅁㄴ로ㅓㅏㅣㅁㄹㄴ오ㅓㅏㅣㅇㅁㄴㄹ</p>
      {/* <button onClick={() => console.log(tk)}> 시이이일험</button> */}
    </div>
  )
}

export default WebAlbum