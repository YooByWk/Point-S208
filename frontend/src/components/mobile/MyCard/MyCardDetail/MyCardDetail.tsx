import styled from '@emotion/styled'
import CardSection from './CardSection'
import InfoSection from './InfoSection'

const MyCardDetail = () => {
  return (
    <Container>
      <CardSection />
      <InfoSection />
    </Container>
  )
}

export default MyCardDetail

// style

const Container = styled.div`
  height: 100vh;
`
