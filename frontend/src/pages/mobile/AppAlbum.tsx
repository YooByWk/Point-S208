import { Outlet } from 'react-router-dom'

const AppAlbum = () => {
  return (
    <div style={{ height: '100dvh' }}>
      <Outlet />
    </div>
  )
}

export default AppAlbum
