import { WriteCardType } from '@/types/cardInput'
import { authRequest } from '@/utils/requestMethod'

const url = '/cud/api/my-card'
const readUrl = '/read/api/my-card'

// 내 명함 조회
export const fetchMyCard = async (userId: number) => {
  return authRequest
    .get(`${readUrl}/${userId}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 내 명함 등록
export const writeMyCard = async (params: WriteCardType) => {
  return authRequest
    .post(`${url}/${params.userId}`, params.data)
    .then(res => res.data)
    .catch(err => console.log(err))
}
