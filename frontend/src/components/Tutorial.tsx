import { BooleanStateType } from '@/types/commonType'
import styled from '@emotion/styled'
import { colors } from '@/styles/colorPalette'
import { useMutation } from '@tanstack/react-query'
import { userReg } from '@/apis/auth'
import { useRecoilState } from 'recoil'
import { userState } from '@/stores/user'
import { setLocalStorage } from '@/utils/localStorage'

const Tutorial = (props: BooleanStateType) => {
  const { setValue } = props
  const [user, setUser] = useRecoilState(userState)

  const { mutate } = useMutation({
    mutationKey: ['userReg'],
    mutationFn: userReg,
    onSuccess(result) {
      console.log('등록 성공', result)
      // setUser(prev => ({ ...prev, id: result.data.id }))
      // setLocalStorage('User', {
      //   id: result.data.id,
      //   name: user.name,
      //   email: user.email,
      // })
      // setValue(true)
    },
    onError(error) {
      console.error('등록 실패:', error)
    },
  })

  const HandleUserReg = () => {
    let userData = {
      name: user.name,
      email: user.email,
    }

    mutate(userData)
  }

  return (
    <Container>
      <Box>
        <p>환영합니다</p>
        <p>BizCard 명합 관리 앱을 시작합니다</p>
        <Button onClick={() => HandleUserReg()}>시작하기</Button>
      </Box>
    </Container>
  )
}

export default Tutorial

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    position: relative;
    text-align: center;
    padding: 30px;
  }

  div::before {
    content: '';
    opacity: 0.3;
    position: absolute;
    background-color: ${colors.themeText};
    border-radius: 20px;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }

  p {
    position: relative;
    color: #fff;
    margin-bottom: 20px;
  }
`

const Button = styled.button`
  position: relative;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: ${colors.teamsBG6};
  color: #fff;
`

const Box = styled.div``
