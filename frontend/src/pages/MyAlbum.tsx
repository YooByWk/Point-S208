import useWindowSize from '@/hooks/useWindowSize'
import WebAlbum from './web/WebAlbum'
import AppAlbum from './mobile/AppAlbum'

const MyAlbum = () => {
  const width = useWindowSize()

  return <>{width >= 768 ? <WebAlbum /> : <AppAlbum />}</>
}

export default MyAlbum
