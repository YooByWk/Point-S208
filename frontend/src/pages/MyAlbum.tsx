import useWindowSize from "@/hooks/useWindowSize"
import WebAlbum from "./web/WebAlbum"
import AppAlbum from "./mobile/AppAlbum"

const MyAlbum = () => {
  const width = useWindowSize()
  
  return (
    <div>
      {width >= 768 ? <WebAlbum /> : <AppAlbum />}
    </div>
  )
}

export default MyAlbum