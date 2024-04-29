import WebEmptyCard from '@components/web/WebEmptyCard'

const WebCard = () => {
  const renderContent = () => {
    return <WebEmptyCard />
  }

  return <>{renderContent()}</>
}

export default WebCard
