/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'

import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userState } from '@stores/user'
import { colors } from '@/styles/colorPalette'
import WebTopBar from './WebMyCardDetail/WebTopBar'
import WebMyCardInfo from './WebMyCardDetail/WebMyCardInfo'
import WebNewlyAddedCard from './WebMyCardDetail/WebNewlyAddedCard'
import WebEmptyBackCard from './WebMyCardDetail/WebEmptyBackCard'
import WebEmptyCard from './WebEmptyCard'
import InfoEdit from '../mobile/MyCard/MyCardDetail/InfoEdit'
import { backCardState, frontCardState } from '@/stores/card'

interface CardInfo {
  card_id: number
  name: string
  company: string
  department: string
  position: string
  rank?: string
  email: string
  landlineNumber: string
  fax_number?: string
  phoneNumber: string
  address?: string
  real_picture: string
  digital_picture: string
  front_back: 'front' | 'back'
  domain_url?: string
}

interface DataProps {
  userId: number
  front: CardInfo
  back?: CardInfo
  list: CardInfo[]
}

function useFetchCardData(userId: number | undefined, isCard: boolean) {
  const [data, setData] = useState<DataProps | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const setFrontCard = useSetRecoilState(frontCardState)
  const setBackCard = useSetRecoilState(backCardState)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://k10s208.p.ssafy.io/read/api/my-card/${userId}`,
        )
        setData(response.data) // 데이터 설정
        setFrontCard(response.data.front)
        setBackCard(response.data.back)
        setLoading(false) // 로딩 상태 해제
      } catch (error) {
        console.error(error)
        setError(true) // 에러 처리
        setLoading(false)
      }
    }

    fetchData()
  }, [userId, isCard, setFrontCard, setBackCard])

  return { data, loading, error }
}

const WebMyCard = ({
  isCard,
  setIsCard,
  setIsEnglish,
}: {
  isCard: boolean
  setIsCard: (isCard: boolean) => void
  setIsEnglish: (isFront: boolean) => void
}) => {
  const userId = useRecoilValue(userState).userId
  const { data, loading, error } = useFetchCardData(userId, isCard)
  const [isFront, setIsFront] = useState(true)
  const [editOpen, setEditOpen] = useState(false)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error loading data!</div>
  if (!data) return <div>No data available</div>
  if (!isFront && data.back === null) {
    setIsEnglish(true)
    return (
      <WebEmptyBackCard
        isFront={isFront}
        setIsFront={setIsFront}
        data={data}
        setIsCard={setIsCard}
      />
    )
  }
  if (isFront && data.front === null) {
    setIsEnglish(false)
    return <WebEmptyCard />
  }
  if (editOpen) return <InfoEdit value={editOpen} setValue={setEditOpen} />
  console.log(data)

  return (
    <>
      <Flex justify="center">
        <Flex direction="column" css={containerStyles}>
          <WebTopBar
            isFront={isFront}
            setIsFront={setIsFront}
            setIsCard={setIsCard}
            setEditOpen={setEditOpen}
          />
          <Spacing size={10} />
          <WebMyCardInfo isFront={isFront} data={data} />
        </Flex>
        <WebNewlyAddedCard list={data.list} />
      </Flex>
    </>
  )
}

export default WebMyCard

const containerStyles = css`
  padding-top: 10px;
  padding-right: 10px;
  border-right: 1px solid ${colors.themeGray};
`
