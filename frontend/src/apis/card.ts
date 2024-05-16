import {
  deleteCardType,
  EditCardType,
  OcrCardType,
  saveDigitalCardType,
  shareCardType,
  WriteCardType,
} from '@/types/cardInput'
import { authRequest } from '@/utils/requestMethod'

const url = '/cud/api/my-card'
const baseUrl = '/cud/api'
const readUrl = '/read/api/my-card'

// 내 명함 조회
export const fetchMyCard = async (userId: number | undefined) => {
  return authRequest
    .get(`${readUrl}/${userId}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 내 명함 직접 작성 등록
export const writeMyCard = async (params: WriteCardType) => {
  return authRequest
    .post(`${url}/${params.userId}`, params.data)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 내 명함 수정
export const editMyCard = async (params: EditCardType) => {
  return authRequest
    .patch(`${url}/${params.userId}/${params.cardId}`, params.data)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 내 명함 삭제
export const deleteMyCard = async (params: deleteCardType) => {
  return authRequest
    .delete(`${url}/${params.userId}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// OCR 추출
export const postOCR = async (data: FormData) => {
  return authRequest
    .post(`/ocr/process_ocr`, data)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 사진 자르기 (포스코 기준)
export const clipPhotoPosco = async (data: FormData) => {
  return authRequest
    .post(`/ocr/process_image/scanv3/`, data)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 사진 자르기 (포스코 기준)
export const clipPhoto = async (data: FormData) => {
  return authRequest
    .post(`/ocr/process_image/scanv4/`, data)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// OCR 데이터 등록
export const ocrRegMyCard = async (params: OcrCardType) => {
  return authRequest
    .post(`${url}/${params.userId}/ocr`, params.data)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 내 디지털 명함 공유
export const shareMyCard = async (params: shareCardType) => {
  return authRequest
    .post(`${baseUrl}/${params.id}/share/email/digital`, {
      recipientEmail: params.email,
    })
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 디지털 명함 이미지로 저장
export const saveMyDigitalCard = async (params: saveDigitalCardType) => {
  return authRequest
    .post(`${url}/${params.userId}/${params.cardId}/save`, params.file)
    .then(res => res.data)
    .catch(err => console.log(err))
}
