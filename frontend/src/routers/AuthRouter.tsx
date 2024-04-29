import AppTeamList from '@/components/mobile/Team/TeamList' // 구분을 위해 이름 변경 : 원래는 TeamList
import CardList from '@/components/shared/CardList'
import useWindowSize from '@/hooks/useWindowSize'
import MyAlbum from '@/pages/MyAlbum'
import MyCard from '@/pages/MyCard'
import MyTeam from '@/pages/MyTeam'
import AppTeam from '@/pages/mobile/AppTeam'
import WebTeam from '@/pages/web/WebTeam'
import { Route, Routes } from 'react-router-dom'

const AuthRouter = () => {
  const width = useWindowSize()
  
  return (
<Routes>
  <Route path="/" element={<MyCard />} />
  <Route path="/myAlbum" element={<MyAlbum />} />
  {width >= 768 
  ?<Route path='/myTeam' element={<WebTeam />} /> 
  :<Route path='/myTeam' element={<AppTeam/>}>
    <Route index  element={<AppTeamList />}/>
    <Route path=':teamId' element={<CardList />}/> 
  </Route>
  }
  <Route path="*" element={<MyCard />} />
</Routes>
  )
}

export default AuthRouter
