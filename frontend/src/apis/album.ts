import { CreateFilterType } from '@/types/FilterType'
import {
  deleteAlbumCardArrayType,
  deleteAlbumCardType,
  editAlbumCardType,
  editMemoType,
  shareCardType,
  OcrCardType,
  WriteCardType,
} from '@/types/cardInput'
import { searchType } from '@/types/searchType'
import { authRequest } from '@/utils/requestMethod'

const CudUrl = '/cud/api/my-album'
const cudBaseUrl = '/cud/api'
const ReadUrl = '/read/api/my-album'

// 내 명함지갑에서 목록 조회
export const fetchMyAlbum = async (userId: number, page: number) => {
  console.log('페이지: ', page)
  return authRequest
    .get(`${ReadUrl}/list/${userId}/${page}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 엑셀로 내보내기용 명함지갑 목록 조회
export const fetchAllAlbum = async ({
  userId,
}: {
  userId: number | undefined
}) => {
  return authRequest
    .get(`${ReadUrl}/list/${userId}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 명함 상세 조회
export const getAlbumDetail = async ({
  userId,
  cardId,
}: {
  userId: number | undefined
  cardId: number
}) => {
  return authRequest
    .get(`${ReadUrl}/${userId}/${cardId}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 명함 등록
export const RegisterOtherCard = async (params: WriteCardType) => {
  return authRequest
    .post(`${CudUrl}/${params.userId}`, params.data)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// OCR 데이터 등록
export const ocrRegOtherCard = async (params: OcrCardType) => {
  return authRequest
    .post(`${CudUrl}/${params.userId}/ocr`, params.data)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 내 명함지갑 명함 검색
export const searchMyAlbumCard = async (params: searchType) => {
  return authRequest
    .get(`${ReadUrl}/${params.id}/search`, {
      params: { info: params.userInput },
    })
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

// 명함지갑 내 명함 공유
export const shareCard = async (params: shareCardType) => {
  return authRequest
    .post(`${cudBaseUrl}/${params.id}/share/email`, {
      recipientEmail: params.email,
    })
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

export const editMyAlbumMemo = async (params: editMemoType) => {
  return authRequest
    .post(`${CudUrl}/${params.userId}/${params.cardId}/memo`, params.data)
    .then(res => res.data)
    .catch(err => console.log(err))
}

export const deleteMyAlbumCards = async (params: deleteAlbumCardArrayType) => {
  console.log(params.cardIdArray, params.userId, 'params')
  if (!params.cardIdArray || !params.userId) return

  const deleteRequests = params.cardIdArray.map(cardId =>
    authRequest
      .delete(`${CudUrl}/${params.userId}/${cardId}`)
      .then(res => res.data)
      .catch(err => console.log(err)),
  )

  return Promise.all(deleteRequests)
}

// export const fetchFilterByCard = async() => {
// return authRequest
// .get(`${ReadUrl}/${userId}/filter`)
// }
