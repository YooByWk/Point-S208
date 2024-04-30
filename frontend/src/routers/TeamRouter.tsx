import { Route, Routes, useParams } from 'react-router-dom'

import CardList from '@/components/shared/CardList'


const TeamRouter = () => {
  const { teamId } = useParams()
  return (
    <Routes>
      {/* <Route path="/" element={<CardList />} /> */}
      {/* <Route path="/:teamId" element={<CardList />} /> */}
    </Routes>
  )
}

export default TeamRouter
