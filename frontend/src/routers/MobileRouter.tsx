import { Route, Routes } from 'react-router-dom'
import MyAlbum from '@pages/mobile/MyAlbum'
import MyCard from '@pages/mobile/MyCard'
import MyTeam from '@pages/mobile/MyTeam'

const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MyCard />} />
      <Route path="/myAlbum" element={<MyAlbum />} />
      <Route path="/myTeam" element={<MyTeam />} />
      <Route path="*" element={<MyCard />} />
    </Routes>
  )
}

export default AuthRouter
