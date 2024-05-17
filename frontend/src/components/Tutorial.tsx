import { useMutation } from '@tanstack/react-query'
import { userReg } from '@/apis/auth'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { isUserinStorageState, userState } from '@/stores/user'
import { useContext, useEffect } from 'react'
import { TeamsFxContext } from './Context'
import { useData } from '@microsoft/teamsfx-react'
import { Spinner } from '@fluentui/react-spinner'

const Tutorial = () => {
  const setIsUserinStorage = useSetRecoilState(isUserinStorageState)
  const [user, setUser] = useRecoilState(userState)

  // 유저 정보 조회
  const { teamsUserCredential } = useContext(TeamsFxContext)
  useData(async () => {
    if (teamsUserCredential) {
      const userInfo = await teamsUserCredential.getUserInfo()
      setUser({
        name: userInfo.displayName,
        email: userInfo.preferredUserName,
      })
      return userInfo
    }
  })

  // 유저 등록
  const { mutate } = useMutation({
    mutationKey: ['userReg'],
    mutationFn: userReg,
    onSuccess(result) {
      setUser(prev => ({ ...prev, userId: result.data_body }))
      console.log('등록 성공:', result)
    },
    onError(error) {
      console.error('등록 실패:', error)
    },
  })

  useEffect(() => {
    let userData = {
      name: user.name,
      email: user.email,
    }

    mutate(userData)
    setIsUserinStorage(true)
  }, [mutate, user])

  return <Spinner label="로딩 중..." style={{ height: '100vh' }} />
}

export default Tutorial
