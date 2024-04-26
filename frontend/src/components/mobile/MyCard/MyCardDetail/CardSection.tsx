import { themeState } from '@/stores/common'
import styled from '@emotion/styled'
import { Switch } from '@fluentui/react-components'
import { useCallback, useState } from 'react'
import { useRecoilValue } from 'recoil'

const CardSection = () => {
  const theme = useRecoilValue(themeState)
  const [isRealCard, setIsRealCard] = useState(true)
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRealCard(e.currentTarget.checked)
  }, [])

  return (
    <Container $theme={theme}>
      <SwitchBtn>
        <Switch checked={isRealCard} onChange={onChange} />
      </SwitchBtn>
      <Wrap>
        <Card $isFront={false}>
          <img
            src="https://1drv.ms/i/c/60d1136c8e1eeac5/IQPtHI8a_PwASK5IZLcow2yZAdjLhrrPZqV_cjryVMdkpRA?width=150&height=120"
            alt="frontCard"
          />
        </Card>
        <Card $isFront={true}>
          <img
            src="https://1drv.ms/i/c/60d1136c8e1eeac5/IQPtHI8a_PwASK5IZLcow2yZAdjLhrrPZqV_cjryVMdkpRA?width=150&height=120"
            alt="frontCard"
          />
        </Card>
      </Wrap>
    </Container>
  )
}

export default CardSection

// style

const Container = styled.div<{ $theme: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 240px;
  background: ${props =>
    props.$theme === 'dark'
      ? `linear-gradient(238deg, #286c95 -0.51%, #000 89.73%)`
      : `linear-gradient(246deg, #05507d 0%, #eff9ff 100%)`};
`

const Wrap = styled.div`
  position: relative;
  width: 80%;
  height: 80%;
`

const Card = styled.div<{ $isFront: boolean }>`
  position: absolute;
  width: 245px;
  height: 135px;
  border-radius: 10px;
  ${props =>
    props.$isFront
      ? `left: 0; bottom: 0;`
      : `right: 0; filter: brightness(50%);`}

  img {
    width: 100%;
  }
`

const SwitchBtn = styled.div`
  position: absolute;
  z-index: 10;
  margin: 2%;
  top: 0;
  left: 0;
`
