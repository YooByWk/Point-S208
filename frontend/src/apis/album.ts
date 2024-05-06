import { CreateFilterType } from '@/types/FilterType'
import {
  deleteAlbumCardType,
  editAlbumCardType,
  editMemoType,
  WriteCardType,
} from '@/types/cardInput'
import { authRequest } from '@/utils/requestMethod'

const CudUrl = '/cud/api/my-album'
const ReadUrl = '/read/api/my-album'
const CardSearchUrl = '/read/api/card/search'

export const fetchMyAlbum = async (userId: number, page: number) => {
  console.log('페이지: ', page)
  return (
    authRequest
      // .get(`${ReadUrl}/list/${userId}/${page}`)
      .get(`${ReadUrl}/list/${userId}/${page}`)
      .then(res => res.data)
      .catch(err => console.log(err))
  )
}

// 명함 등록
export const RegisterOtherCard = async (params: WriteCardType) => {
  return authRequest
    .post(`${CudUrl}/${params.userId}`, params.data)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 내 명함지갑 명함 검색
export const searchMyAlbumCard = async (userInput: string | number) => {
  return authRequest
    .get(`${CardSearchUrl}`, { params: { info: userInput } })
    .then(res => {
      console.log(res)
      return res.data
    })
    .catch(err => console.log(err))
}

// 명함 상세 수정
export const editMyAlbumCard = async (params: editAlbumCardType) => {
  return authRequest
    .patch(`${CudUrl}/${params.userId}/${params.cardId}`, params.data)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 명함지갑 내 명함 삭제
export const deleteMyAlbumCard = async (params: deleteAlbumCardType) => {
  return authRequest
    .delete(`${CudUrl}/${params.userId}/${params.cardId}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

export const fetchFilter = async (userId: number) => {
  return authRequest
    .get(`${ReadUrl}/${userId}/filter`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

export const createFilter = async (params: CreateFilterType) => {
  return authRequest
    .post(`${CudUrl}/${params.userId}/filter`, {
      filterName: params.filterName,
    })
    .then(res => res.data)
    .catch(err => console.log(err))
}

//
export const fetchCardByFilter = async (userId: number, filterId: number) => {
  return authRequest
    .get(`${ReadUrl}/${userId}/filter/${filterId}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 내 명함지갑 중 한개 명함이 가지고있는 필터는 어떻게?

export const addFilterToCard = async (
  userId: number,
  cardId: number,
  filterId: number,
) => {
  return authRequest
    .post(`${CudUrl}/${userId}/${cardId}`, { params: { filterId } })
    .then(res => res.data)
    .catch(err => console.log(err))
}

export const editFilter = async (
  userId: number,
  filterId: number,
  filterName: string,
) => {
  return authRequest
    .patch(`${CudUrl}/${userId}/filter/${filterId}`, { filterName: filterName })
    .then(res => res.data)
    .catch(err => console.log(err))
}

export const deleteFilter = async (userId: number, filterId: number) => {
  return authRequest
    .delete(`${CudUrl}/${userId}/filter/${filterId}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 명함에 메모 등록 및 수정
export const editMyAlbumMemo = async (params: editMemoType) => {
  return authRequest
    .post(`${CudUrl}/${params.userId}/${params.cardId}/memo`, params.data)
    .then(res => res.data)
    .catch(err => console.log(err))
}
