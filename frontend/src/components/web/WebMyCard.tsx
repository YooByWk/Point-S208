/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
  ShareAndroid16Filled,
  ArrowSwap16Filled,
  Delete16Filled,
  Edit16Filled,
  PersonBoard32Filled,
  Phone32Regular,
} from '@fluentui/react-icons'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import TextButton from '@shared/TextButton'
import Spacing from '@shared/Spacing'
import { SearchBox } from '@fluentui/react-components'

import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { userState } from '@stores/user'

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
  list?: CardInfo[]
}

function useFetchCardData(userId: number | undefined, isCard: boolean) {
  const [data, setData] = useState<DataProps | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://k10s208.p.ssafy.io/read/api/my-card/${userId}`,
        )
        setData(response.data) // 데이터 설정
        setLoading(false) // 로딩 상태 해제
      } catch (error) {
        console.error(error)
        setError(true) // 에러 처리
        setLoading(false)
      }
    }

    fetchData()
  }, [userId, isCard])

  return { data, loading, error }
}

const WebMyCard = ({ isCard }: { isCard: boolean }) => {
  const userId = useRecoilValue(userState).userId
  const { data, loading, error } = useFetchCardData(userId, isCard)
  const [isFront, setIsFront] = useState(true)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error loading data!</div>
  if (!data) return <div>No data available</div>
  if (!isFront && data.back === null) return <div>카드 뒷면 입력하세요</div>
  console.log(data)

  return (
    <>
      <Flex justify="center">
        {/* 내명함 */}
        <Flex direction="column" css={containerStyles}>
          {/* 타이틀 바 */}
          <Flex justify="space-between">
            <Text typography="t7">내 명함</Text>
            <Flex>
              <TextButton>
                <ShareAndroid16Filled /> 공유
              </TextButton>
              <Spacing size={10} direction="horizontal" />
              <TextButton onClick={() => setIsFront(!isFront)}>
                <ArrowSwap16Filled /> 전환
              </TextButton>
              <Spacing size={10} direction="horizontal" />
              <TextButton>
                <Edit16Filled /> 수정
              </TextButton>
              <Spacing size={10} direction="horizontal" />
              <TextButton>
                <Delete16Filled /> 삭제
              </TextButton>
            </Flex>
          </Flex>
          <Spacing size={10} />
          {/* 내용 */}
          <Flex direction="column">
            <div css={boxStyles}>사진</div>
            <Spacing size={20} />
            <Flex direction="column" css={container3Styles}>
              <Flex justify="flex-start" align="center">
                <PersonBoard32Filled />
                <Text bold={true}>명함 정보</Text>
              </Flex>
              <Spacing size={20} />
              <Flex>
                <Text>회사</Text>
                <Spacing size={30} direction="horizontal" />
                <Text>{isFront ? data.front.company : data.back!.company}</Text>
              </Flex>
              <Flex>
                <Text>부서</Text>
                <Spacing size={30} direction="horizontal" />
                <Text>
                  {isFront ? data.front.department : data.back!.department}
                </Text>
              </Flex>
              <Flex>
                <Text>직책</Text>
                <Spacing size={30} direction="horizontal" />
                <Text>
                  {isFront ? data.front.position : data.back!.position}
                </Text>
              </Flex>
              <Spacing size={20} />
            </Flex>

            <Spacing size={20} />
            <Flex direction="column">
              <Flex justify="flex-start" align="center">
                <Phone32Regular />
                <Text bold={true}>연락처</Text>
              </Flex>
              <Spacing size={20} />
              <Flex>
                <Text>이메일</Text>
                <Spacing size={30} direction="horizontal" />
                <Text>{isFront ? data.front.email : data.back!.email}</Text>
              </Flex>
              <Flex>
                <Text>유선전화</Text>
                <Spacing size={30} direction="horizontal" />
                <Text>
                  {isFront
                    ? data.front.landlineNumber
                    : data.back!.landlineNumber}
                </Text>
              </Flex>
              <Flex>
                <Text>휴대전화</Text>
                <Spacing size={30} direction="horizontal" />
                <Text>
                  {isFront ? data.front.phoneNumber : data.back!.phoneNumber}
                </Text>
              </Flex>
              <Spacing size={20} />
            </Flex>
          </Flex>
        </Flex>

        {/* 새로 추가된 명함 */}
        <Flex direction="column" css={container2Styles}>
          {/* 타이틀 바 */}
          <Flex justify="space-between">
            <Text typography="t7"> 새로 추가된 명함 </Text>
            <SearchBox
              appearance="underline"
              size="medium"
              placeholder="명함 검색"
            />
          </Flex>
          <Spacing size={10} />
          {/* 내용 */}
          <Flex direction="column">
            {/* for문으로 카드 리스트 돌리기 */}
            <div css={boxStyles}>카드</div>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default WebMyCard

const containerStyles = css`
  padding-top: 10px;
  padding-right: 10px;
  border-right: 1px solid black;
`

const container2Styles = css`
  padding-top: 13px;
  padding-left: 10px;
`

const container3Styles = css`
  border-bottom: 1px solid black;
`

const boxStyles = css`
  width: 48vw;
  height: 45vh;
  border: 1px solid black;
`
