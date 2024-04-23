import useWindowSize from "@/hooks/useWindowSize"
import WebCard from "./web/WebCard"
import AppCard from "./mobile/AppCard"

const MyCard = () => {
  const width = useWindowSize()
  
  return (
    <div>
      {width >= 768 ? <WebCard /> : <AppCard />}
    </div>
  )
}

export default MyCard