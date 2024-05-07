import { CreateTeamSkipType, CreateTeamType } from '@/types/TeamListType'
import { authRequest } from '@/utils/requestMethod'

const CudUrl = '/cud/api/teams'
const ReadUrl = '/read/api/teams'
const userSearchUrl = '/read/api/user/search'
/**
 * 유저 검색 - 주로 멤버 추가에서 사용
 * @param  userInput
 */
export const searchUser = async (userInput: string | number) => {
  return authRequest
    .get(userSearchUrl, { params: { info: userInput } })
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 팀 리스트 조회
export const fetchTeamList = async (userId: number) => {
  return authRequest
    .get(`${ReadUrl}/${userId}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

/**
 *
 * @param userInput
 * @returns 팀 명함 검색 목록
 */
export const fetchTeamCardsList = async (teamAlbumId: number, page: number) => {
  return authRequest
    .get(`${ReadUrl}/${teamAlbumId}/${page}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 팀 건너뛰기 생성
export const CreateTeamSkip = async (params: CreateTeamSkipType) => {
  return authRequest
    .post(`${CudUrl}/${params.userId}/skip`, params.data)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 팀 멤버포함 생성
export const CreateTeam = async (params: CreateTeamType) => {
  return authRequest
    .post(`${CudUrl}/${params.userId}`, params.data)
    .then(res => res.data)
    .catch(err => console.log(err))
}

export const fetchTeamMember = async (teamAlbumId: number, userId: number) => {
  return authRequest
    .get(`${ReadUrl}/${userId}/member/${teamAlbumId}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}
