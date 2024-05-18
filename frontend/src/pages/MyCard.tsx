import useWindowSize from '@/hooks/useWindowSize'
import WebCard from './web/WebCard'
import AppCard from './mobile/AppCard'

const MyCard = () => {
  const width = useWindowSize()

  return <>{width >= 768 ? <WebCard /> : <AppCard />}</>
}

export default MyCard
