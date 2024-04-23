import useWindowSize from "@/hooks/useWindowSize"
import WebTeam from "./web/WebTeam"
import AppTeam from "./mobile/AppTeam"

const MyTeam = () => {
  const width = useWindowSize()
  
  return (
    <div>
      {width >= 768 ? <WebTeam /> : <AppTeam />}
    </div>
  )
}

export default MyTeam