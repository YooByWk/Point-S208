
import useWindowSize from "@/hooks/useWindowSize"
import WebTeam from "./web/WebTeam"
import AppTeam from "./mobile/AppTeam"
import { Outlet, Routes } from "react-router-dom"

/**
 * @deprecated 
 * 이 컴포넌트는 사용되지 않습니다.
 * 삭제 예정입니다.
 * @obsolete
 * 이 컴포넌트는 사용되지 않습니다. 필요한 경우 AppTeam 또는 WebTeam을 사용하세요.
 */ 
const MyTeam = () => {
  const width = useWindowSize()
  
  return (
    <div >
      {width >= 768 ? <WebTeam /> : <AppTeam />}
        {/* <Outlet/> */}
      {/* <Routes> */}
      {/* </Routes> */}
    </div>
  )
}

export default MyTeam

