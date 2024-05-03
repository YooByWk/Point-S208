import WebAlbumTopBar from '@components/web/WebAlbum/WebAlbumTopBar'
import WebMyAlbumList from '@components/web/WebAlbum/WebMyAlbumList'
import { useState } from 'react'

const WebAlbum = () => {
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  return (
    <>
      <WebAlbumTopBar />
      <WebMyAlbumList selectedCards={selectedCards} />
    </>
  )
}

export default WebAlbum
