import LargeButton from "@/components/shared/LargeButton"

const WebAlbum = () => {
  return (
    <div>
      웹 명함 지갑
      <LargeButton text="명함 추가" onClick={() => {console.log('혹시설마진짜?')}} bgColor="ssafyLightBlue" />
    </div>
  )
}

export default WebAlbum