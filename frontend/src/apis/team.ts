import { AddTeamMemberType, CreateTeamSkipType, CreateTeamType, RegisterTeammCardType, deleteTeamAlbumCardType, deleteTeamCardArrayType } from '@/types/TeamListType'
import { editTeamMemoType } from '@/types/cardInput'
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
 * @param userInput
 * @returns 팀 명함 검색 목록
 */
export const fetchTeamCardsList = async (teamAlbumId: number, page: number) => {
  return authRequest
    .get(`${ReadUrl}/list/${teamAlbumId}/${page}`)
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
    .post(`${CudUrl}/${params.userId}/create`, params.data)
    .then(res => res.data)
    .catch(err => console.log(err))
}
// 팀 멤버 조회
export const fetchTeamMember = async (teamAlbumId: number, userId: number) => {
  return authRequest
    .get(`${ReadUrl}/${userId}/member/${teamAlbumId}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}
// 팀
export const RegisterTeamCard = async (params: RegisterTeammCardType) => {
  console.log(params.data, typeof params.data)
  return authRequest
    .post(`${CudUrl}/${params.userId}/${params.teamId}/card`, params.data)
    .then(res => { console.log(res, '팀카드등록'); return res.data })
    .catch(err => console.log(err))
}
// 팀 카드 검색
export const searchTeamCard = async (teamAlbumId: number, userInput: string | number) => {
  return authRequest
    .get(`${ReadUrl}/${teamAlbumId}/search`, {
      params: { info: typeof userInput === 'string' ? userInput.toLowerCase() : userInput },
    })
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 팀 멤버 추가
export const addTeamMember = async (params: AddTeamMemberType) => {
  if (params.data.userList === undefined) {
    console.log(params.data.userList, typeof params.data.userList)
    return
  }
  return authRequest
    .post(`${CudUrl}/${params.userId}/${params.teamId}/member`, params.data)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 팀 카드 삭제
export const deleteTeamCard = async (params: deleteTeamAlbumCardType) => {
  return authRequest
    .delete(`${CudUrl}/${params.userId}/${params.teamAlbumId}/card/${params.cardId}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

export const deleteTeamCards = async (params: deleteTeamCardArrayType) => {
  console.log(params.cardIdArray, params.userId, params.teamAlbumId, 'params')
  if (!params.cardIdArray || !params.userId || !params.teamAlbumId) return

  const deleteRequests = params.cardIdArray.map(cardId =>
    authRequest
      .delete(`${CudUrl}/${params.userId}/${params.teamAlbumId}/card/${cardId}`)
      .then(res => res.data)
      .catch(err => console.log(err))
  )
  console.log(`${CudUrl}/${params.userId}/${params.teamAlbumId}/card/${params.cardIdArray}`)
  return Promise.all(deleteRequests)
}


// export const fetchTeamCardFilter = async (teamAlbumId: number, filter: string) => {
//   return authRequest
//     .get(`${ReadUrl}/${teamAlbumId}/filter/${filter}`)
//     .then(res => res.data)
//     .catch(err => console.log(err))
// }

// 팀 내 명함 OCR 등록
export const ocrRegTeamCard = async (params: any) => {
  return authRequest
    .post(`${CudUrl}/${params.userId}/${params.teamAlbumId}/ocr`, params.data)
    .then(res => res.data)
    .catch(err => console.log(err))
}
export const editTeamAlbumMemo = async (params: editTeamMemoType) => {
  console.log(params)
  return authRequest
  .post(`${CudUrl}/${params.userId}/${params.teamAlbumId}/${params.cardId}/memo`, params.data)
  .then(res => res.data)
  .catch(err => console.log(err))
}


export const editTeamCard = async (params: any) => {
  console.log(params,'팀카드 수정 파람')
  return authRequest
  .patch(`${CudUrl}/${params.userId}/${params.teamAlbumId}/card/${params.cardId}`, params.data)
  .then(res => res.data)
  .catch(err => console.log(err))
}