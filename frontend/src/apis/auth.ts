import { UserType } from '@/types/userType'
import { authRequest } from '@/utils/requestMethod'

const url = '/read/api'

// user 등록
export const userReg = async (params: UserType) => {
  return authRequest
    .post(`${url}/tutorial`, params)
    .then(res => res)
    .catch(err => console.log(err))
}
