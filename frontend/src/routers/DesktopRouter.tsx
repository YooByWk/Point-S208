import { Route, Routes } from 'react-router-dom'
import PcMyAlbum from '@pages/desktop/PcMyAlbum'
import PcMyCard from '@pages/desktop/PcMyCard'
import PcMyTeam from '@pages/desktop/PcMyTeam'

const DesktopRouter = () => {
  return (
    <Routes>
      <Route path="/web/" element={<PcMyCard />} />
      <Route path="/web/myAlbum" element={<PcMyAlbum />} />
      <Route path="/web/myTeam" element={<PcMyTeam />} />
    </Routes>
  )
}

export default DesktopRouter
