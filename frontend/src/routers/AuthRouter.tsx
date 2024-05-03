import TeamDetail from '@/components/mobile/Team/TeamDetail/TeamDetail'
import AppTeamList from '@/components/mobile/Team/TeamList' // 구분을 위해 이름 변경 : 원래는 TeamList
import CardList from '@/components/shared/CardList'
import useWindowSize from '@/hooks/useWindowSize'
import MyAlbum from '@/pages/MyAlbum'
import MyCard from '@/pages/MyCard'
import MyTeam from '@/pages/MyTeam'
import AppAlbum from '@/pages/mobile/AppAlbum'
import AppTeam from '@/pages/mobile/AppTeam'
import WebAlbum from '@/pages/web/WebAlbum'
import WebTeam from '@/pages/web/WebTeam'
import { Route, Routes } from 'react-router-dom'
import AppAlbumList from '@/components/mobile/MyAlbum/AlbumList'
import RegisterCard from '@/components/mobile/MyAlbum/RegisterCard'
import AlbumCardDetail from '@/components/mobile/MyAlbum/MyAlbumDetail/AlbumCardDetail'

const AuthRouter = () => {
  const width = useWindowSize()

  return (
    <Routes>
      <Route path="/" element={<MyCard />} />
      {/* <Route path="/myAlbum" element={<MyAlbum />} /> */}
      {width >= 768 ? (
        <Route path="/myAlbum" element={<WebAlbum />} />
      ) : (
        <Route path="/myAlbum" element={<AppAlbum />}>
          <Route index element={<AppAlbumList />} />
          <Route path='register/:userId' element={<RegisterCard/>} />
          <Route path=':userId/:cardId' element={<AlbumCardDetail/>} />
          {/* <Route path=':cardId' element={<CardDetail />} /> */}
          {/* <Route path=":teamId" element={<TeamDetail />} /> */}
        </Route>
      )}
      {width >= 768 ? (
        <Route path="/myTeam" element={<WebTeam />} />
      ) : (
        <Route path="/myTeam" element={<AppTeam />}>
          <Route index element={<AppTeamList />} />
          {/* <Route path=':teamId' element={<CardList />}/>  */}
          <Route path=":teamId" element={<TeamDetail />} />
        </Route>
      )}
      <Route path="*" element={<MyCard />} />
    </Routes>
  )
}

export default AuthRouter