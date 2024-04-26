import { SwipeableImgType } from '@/types/cameraType'
import styled from '@emotion/styled'
import { useSwipeable } from 'react-swipeable'

const SwipeableImg = (props: SwipeableImgType) => {
  const { frontImgSrc, backImgSrc, isFront, setIsFront } = props

  const handlers = useSwipeable({
    onSwipedLeft: () => setIsFront(false),
    onSwipedRight: () => setIsFront(true),
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  return (
    <Container {...handlers}>
      <Img src={isFront ? frontImgSrc : backImgSrc} alt="Captured" />
    </Container>
  )
}

export default SwipeableImg

// style

const Container = styled.div`
  width: 80%;
`

const Img = styled.img`
  width: 100%;
`
