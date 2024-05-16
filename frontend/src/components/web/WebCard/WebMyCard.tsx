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
import InfoEdit from '../../mobile/MyCard/MyCardDetail/InfoEdit'
import { backCardState, frontCardState } from '@/stores/card'
import { ExternalCardType } from '@/types/ExternalCard'
import { CardType } from '@/types/cardType'

interface DataProps {
  userId: number
  front: ExternalCardType | CardType
  back?: ExternalCardType | CardType
  list: ExternalCardType[] | CardType[]
}

function useFetchCardData(
  userId: number | undefined,
  isCard: boolean,
  editOpen: boolean,
) {
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
  }, [userId, isCard, setFrontCard, setBackCard, editOpen])

  return { data, loading, error }
}

const WebMyCard = ({
  isCard,
  setIsCard,
  setIsEnglish,
  setIsDetail,
}: {
  isCard: boolean
  setIsCard: (isCard: boolean) => void
  setIsEnglish: (isFront: boolean) => void
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const userId = useRecoilValue(userState).userId
  const [editOpen, setEditOpen] = useState(false)
  const { data, loading, error } = useFetchCardData(userId, isCard, editOpen)
  const [isFront, setIsFront] = useState(true)

  if (loading) return <div>Loading...</div>
  // if (error) return <div>Error loading data!</div>
  if (!data) return <div>No data available</div>
  if (!isFront && data.back === null) {
    setIsEnglish(true)
    return (
      <WebEmptyBackCard
        isFront={isFront}
        setIsFront={setIsFront}
        data={data}
        setIsCard={setIsCard}
        setIsDetail={setIsDetail}
      />
    )
  }
  if (isFront && data.front === null) {
    setIsEnglish(false)
    return <WebEmptyCard setIsDetail={setIsDetail} />
  }
  if (editOpen) return <InfoEdit value={editOpen} setValue={setEditOpen} />

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
        <WebNewlyAddedCard list={data.list} setIsDetail={setIsDetail} />
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
