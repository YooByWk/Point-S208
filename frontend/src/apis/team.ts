import { authRequest } from "@/utils/requestMethod"

const CudUrl = '/cud/api/teams'
const ReadUrl = '/read/api/teams'
const userSearchUrl = '/read/api/user/search'
/**
 * 유저 검색 - 주로 멤버 추가에서 사용
 * @param  userInput 
 */
export const searchUser = async (userInput: string | number) => {
  return authRequest
  .get(userSearchUrl, {params: {'info':userInput}})
  .then(res => res.data)
  .catch(err => console.log(err))
}


// 팀 리스트 조회
export const fetchTeamList = async (userId:number) => {
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
export const fetchTeamCards = async ( teamAlbumId:number, page:number) => {
  return authRequest
  .get(`${ReadUrl}/card/${teamAlbumId}/${page}` )
  .then(res => res.data)
  .catch(err => console.log(err))
}


export const CreateTeam = async (params: any) => {
  return authRequest
  .post(`/cud/api/team`, params)
  .then(res => res.data)
  .catch(err => console.log(err))
}