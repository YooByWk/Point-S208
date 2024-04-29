import MyAlbum from '@/pages/MyAlbum'
import MyCard from '@/pages/MyCard'
import MyTeam from '@/pages/MyTeam'
import { Route, Routes } from 'react-router-dom'

const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MyCard />} />
      <Route path="/myAlbum" element={<MyAlbum />} />
      <Route path="/myTeam/*" element={<MyTeam />} />
      <Route path="*" element={<MyCard />} />
    </Routes>
  )
}

export default AuthRouter
