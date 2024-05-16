/** @jsxImportSource @emotion/react */
import { FilterType } from '@/types/FilterType'
import { css } from '@emotion/react'
import Flex from '@shared/Flex'
import { tokens } from '@fluentui/react-components'
import { Dismiss16Filled, Add16Filled } from '@fluentui/react-icons'
import { colors } from '@/styles/colorPalette'
import DetailAddFilterModal from '@/components/mobile/MyAlbum/MyAlbumDetail/DetailAddFilterModal'
import { useRecoilValue } from 'recoil'
import { userState } from '@/stores/user'
import { useQuery } from '@tanstack/react-query'
import { fetchCardsFilter } from '@/apis/album'

const DetailFilter = ({ cardId }: { cardId: number }) => {
  // const [filters, setFilters] = useState<string[]>([])
  const userId = useRecoilValue(userState).userId

  const { data } = useQuery({
    queryKey: ['fetchCardsFilterList', cardId],
    queryFn: () => fetchCardsFilter(userId as number, cardId),
  })
  const filter = data?.data.data_body || []

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
              <Dismiss16Filled css={iconCss} onClick={() => {}} />
              {filter.filterName}
            </Flex>
          )
        })}
        <div css={addIconCss}>
          <DetailAddFilterModal
            icon={<Add16Filled />}
            cardId={cardId}
            onClick={() => {
              // console.log('필터 목록 보여주기: 수정하기')
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
