/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { RegisterOtherCard } from '@/apis/album'
import Text from '@/components/shared/Text'
import { userState } from '@/stores/user'
import { CardType } from '@/types/cardType'
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Popover,
  PopoverSurface,
  PopoverTrigger,
} from '@fluentui/react-components'
import { ArrowUpload24Filled } from '@fluentui/react-icons'
import { useMutation } from '@tanstack/react-query'

import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import * as XLSX from 'xlsx'
import { isRefreshedAlbumState } from '@/stores/card'

const WebUploadFromFile = () => {
  const userId = useRecoilValue(userState).userId
  const [file, setFile] = useState<File>()
  const [upLoadModalOpen, setUpLoadModalOpen] = useState(false)
  const [isRefreshed, setIsRefreshed] = useRecoilState(isRefreshedAlbumState)

  const { mutate } = useMutation({
    mutationKey: ['RegisterOtherCard'],
    mutationFn: RegisterOtherCard,
    onSuccess(result) {
      console.log('등록 성공', result)
    },
    onError(error) {
      console.error('등록 실패:', error)
    },
  })

  const convertExcelToCardType = (excelData: any[]): CardType[] => {
    const cardTypes: CardType[] = []

    for (let i = 1; i < excelData.length; i++) {
      const row = excelData[i]

      const card: CardType = {
        cardId: i,
        name: row[0],
        company: row[2],
        position: row[4],
        rank: '',
        department: row[3],
        email: row[5],
        landlineNumber: row[6],
        faxNumber: row[7],
        phoneNumber: row[1],
        address: row[8],
        realPicture: '',
        digitalPicture: '',
        frontBack: 'FRONT',
        domainUrl: '',
        memo: row[11],
      }

      cardTypes.push(card)
    }

    return cardTypes
  }

  const handleExcelFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = e => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer)
      const workbook = XLSX.read(data, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const excelJsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
      const cardTypes = convertExcelToCardType(excelJsonData)

      for (const card of cardTypes) {
        mutate({ userId: userId, data: card })
      }
    }
    reader.readAsArrayBuffer(file)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      setFile(file)
    }
  }

  const handleSubmit = () => {
    if (file) {
      handleExcelFile(file)
    }
    setUpLoadModalOpen(false)
    setIsRefreshed(!isRefreshed)
  }

  return (
    <Dialog modalType="alert" open={upLoadModalOpen}>
      <DialogTrigger disableButtonEnhancement>
        <Popover openOnHover={true} mouseLeaveDelay={0.1}>
          <PopoverTrigger disableButtonEnhancement>
            <Button
              appearance="transparent"
              size="small"
              css={buttonStyles}
              onClick={() => setUpLoadModalOpen(true)}
            >
              <ArrowUpload24Filled />
            </Button>
          </PopoverTrigger>
          <PopoverSurface tabIndex={-1}>
            <Text typography="t9">엑셀로 불러오기</Text>
          </PopoverSurface>
        </Popover>
      </DialogTrigger>
      <DialogSurface aria-describedby={undefined}>
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <DialogTitle>리멤버에서 다운받은 엑셀로 명함 등록하기</DialogTitle>
            <DialogContent>
              <input type="file" onChange={handleFileChange} />
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button
                  appearance="secondary"
                  onClick={() => setUpLoadModalOpen(false)}
                >
                  취소
                </Button>
              </DialogTrigger>
              <Button type="submit" appearance="primary">
                확인
              </Button>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  )
}

export default WebUploadFromFile

const buttonStyles = css`
  padding: 0;
  margin: 0;
`
