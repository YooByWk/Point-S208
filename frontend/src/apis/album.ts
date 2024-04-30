import { authRequest } from '@/utils/requestMethod'

const CudUrl = '/cud/api/my-album'
const ReadUrl = '/read/api/my-album'


export const fetchMyAlbum = async (userId: number,page: number) => {
  console.log('페이지: ', page)
    return authRequest
    // .get(`${ReadUrl}/list/${userId}/${page}`)
    .get(`${ReadUrl}/list/${userId}/${page}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}
