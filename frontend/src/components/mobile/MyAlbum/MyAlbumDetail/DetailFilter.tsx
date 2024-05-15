/** @jsxImportSource @emotion/react */

import { FilterListType, FilterType } from '@/types/FilterType'
import { css } from '@emotion/react'
// import { useQuery } from '@tanstack/react-query'
// import  { useState } from 'react'
import Flex from '@shared/Flex'
import { tokens } from '@fluentui/react-components'
import { Dismiss16Filled, Add16Filled } from '@fluentui/react-icons'
import { colors } from '@/styles/colorPalette'
import DetailAddFilterModal from '@/components/mobile/MyAlbum/MyAlbumDetail/DetailAddFilterModal'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userState } from '@/stores/user'
import { useQuery } from '@tanstack/react-query'
import { fetchCardsFilter } from '@/apis/album'

const DetailFilter = ({ cardId }: { cardId: number }) => {
  const [filters, setFilters] = useState<string[]>([])
  // 필터 정보 불러오는 곳 - useQuery 사용 : 수정하기
  const userId = useRecoilValue(userState).userId
  const params = useParams()
  console.log(params)
  
  /**/
  // 우선 더미 데이터로 대체
  const dummyData: FilterListType = [
    {
      filterId: 1,
      filterName: 'Filter 1asdasdasdasd',
    },
    {
      filterId: 2,
      filterName: 'Filter 2',
    },
    {
      filterId: 3,
      filterName: 'Filter 3',
    },
  ]

  const {data} = useQuery({
    queryKey: ['fetchCardsFilterList', cardId],
    queryFn: () => fetchCardsFilter(userId as number, cardId),
  }) 
  const filter = data?.data.data_body || []
  console.log(filter,'로그로그로그')
  // 필터 추가하는 곳 - useMutation 사용
  /**/
  
  return (
    <Flex direction="column" align="center">
      <Flex justify="flex-start" align="center" css={container}>
        {filter.map((filter: FilterType, index: number) => {
          return (
            <Flex
              align="center"
              key={index}
              css={tagStyle}
              justify="space-between"
            >
              <Dismiss16Filled
                css={iconCss}
                onClick={() => {}}
              />
              {filter.filterName}
            </Flex>
          )
        })}
        <div css={addIconCss}>
          <DetailAddFilterModal
            icon={<Add16Filled />}
            cardId={cardId}
            onClick={() => {
              console.log('필터 목록 보여주기: 수정하기')
            }}
            dialogTitle="명함에 추가할 태그를 선택해주세요"
          />
        </div>
      </Flex>
    </Flex>
  )
}

export default DetailFilter

const container = css`
  /* margin-bottom: 5vh; */
  background-color: ${tokens.colorNeutralBackground2};
  height: fit-content;
  border-radius: 10px;
  margin: 5%;
  width: 95vw;
`
const addIconCss = css`
  margin-left: 2.5vw;
  border-radius: 100%;
  background-color: ${tokens.colorNeutralBackground3Selected};
  color: ${colors.themeText};
`
const iconCss = css`
  min-width: 16px;
`
const tagStyle = css`
  background-color: ${tokens.colorNeutralBackground3Selected};
  color: ${colors.themeText};
  margin: 5px;
  padding: 5px;
  border: 0.5px solid ${tokens.colorNeutralBackground3Hover};
  border-radius: 15px;
  width: 10ch;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
`
