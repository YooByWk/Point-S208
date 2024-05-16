/** @jsxImportSource @emotion/react */

import {
  PeopleTeam28Regular,
  PeopleTeam28Filled,
  Filter28Regular,
  ArrowSort28Regular,
  Filter28Filled,
} from '@fluentui/react-icons'
import Flex from '@shared/Flex'
import { useRecoilState } from 'recoil'
import { isLookingMemberState } from '@/stores/team'
import FilterIconModal from '@/components/mobile/MyAlbum/Filter/FilterIconModal'
import { tokens } from '@fluentui/react-components'
import { filterState as filterStoreState } from '@/stores/album'
import { css } from '@emotion/react'

interface PeopleFilterSortIconsProps {
  memberIcon?: boolean
  filterIcon?: boolean
  sortIcon?: boolean

  /* 클릭 로직 추가 : 수정하기 */
}

const PeopleFilterSortIcons: React.FC<PeopleFilterSortIconsProps> = ({
  memberIcon = true,
  filterIcon = true,
  sortIcon = true,
}) => {
  const [isLookingMember, setIsLookingMember] =
    useRecoilState(isLookingMemberState)
  const [filterState, setFilterState] = useRecoilState(filterStoreState)

  const handleFilterIconClick = () => {
    setFilterState({ filterId: NaN, filterName: '' })
  }
  return (
    <Flex>
      {memberIcon ? (
        isLookingMember ? (
          <PeopleTeam28Filled
            onClick={() => {
              setIsLookingMember(!isLookingMember)
            }}
          />
        ) : (
          <PeopleTeam28Regular
            onClick={() => {
              setIsLookingMember(!isLookingMember)
            }}
          />
        )
      ) : null}

      {filterIcon ? (
        !isNaN(filterState.filterId) ? (
          <Filter28Filled onClick={handleFilterIconClick} css={activeIcon} />
        ) : (
          <FilterIconModal icon={<Filter28Regular />} dialogTitle="명함 필터" />
        )
      ) : null}
      {sortIcon ? (
        <ArrowSort28Regular
          onClick={() => {
            // console.log('정렬')
          }}
        />
      ) : null}
    </Flex>
  )
}

export default PeopleFilterSortIcons

const activeIcon = css`
  color: ${tokens.colorPaletteNavyBorderActive};
  background-color: ${tokens.colorNeutralBackground2};
  border-radius: 56%;
`
