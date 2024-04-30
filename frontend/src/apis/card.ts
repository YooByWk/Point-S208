import { authRequest } from '@/utils/requestMethod'

const url = '/cud/api/my-card'

// 내 명함 조회
export const fetchMyCard = async (userId: number) => {
  return authRequest
    .get(`${url}/${userId}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}
