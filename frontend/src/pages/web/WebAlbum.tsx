import WebAlbumDetail from '@/components/web/WebAlbum/WebAlbumDetail'
import WebAlbumTopBar from '@components/web/WebAlbum/WebAlbumTopBar'
import WebMyAlbumList from '@components/web/WebAlbum/WebMyAlbumList'
import { useState } from 'react'

const WebAlbum = () => {
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [isDetail, setIsDetail] = useState(false)

  const renderContent = () => {
    if (isDetail) {
      return <WebAlbumDetail setIsDetail={setIsDetail} />
    }
    return (
      <>
        <WebAlbumTopBar />
        <WebMyAlbumList
          selectedCards={selectedCards}
          setIsDetail={setIsDetail}
        />
      </>
    )
  }

  return <>{renderContent()}</>
}

export default WebAlbum
