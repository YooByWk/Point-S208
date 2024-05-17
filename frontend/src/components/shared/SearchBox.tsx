/** @jsxImportSource @emotion/react */
import {
  tokens,
  SearchBox as FluentSearchBox,
} from '@fluentui/react-components'
import { css } from '@emotion/react'
import { useEffect } from 'react'
import Flex from '@/components/shared/Flex'
import PeopleFilterSortIcons from './PeopleFilterSortIcons'
import { SearchRegular } from '@fluentui/react-icons'
import { searchMyAlbumCard } from '@/apis/album'
import { useQuery } from '@tanstack/react-query'
import { ExternalCardListType } from '@/types/ExternalCard'
import { searchTeamCard, searchUser } from '@/apis/team'
import { UserListType } from '@/types/userType'
import { useRecoilValue } from 'recoil'
import { userState } from '@/stores/user'
import { useParams } from 'react-router-dom'

interface SearchBoxProps {
  placeholder?: string
  onChange?: (e: any) => void
  memberIcon?: boolean
  filterIcon?: boolean
  sortIcon?: boolean
  spacing?: boolean
  lefticon?: boolean
  value: string | number
  width?: string
  bgColor?: string
  onSearch: (value: ExternalCardListType | UserListType) => void
  isSearchingMember?: boolean
  isTeam?: boolean
  disabled?: boolean
  size?: 'small' | 'large' | 'medium' | undefined
  buttonSize?: number
}

const SearchBox: React.FC<SearchBoxProps> = ({
  disabled = false,
  placeholder,
  filterIcon,
  memberIcon,
  onChange,
  value, // 검색어
  sortIcon,
  spacing = true,
  width,
  lefticon = true,
  bgColor = '',
  onSearch,
  isSearchingMember = false,
  isTeam = false,
  size = 'large',
}) => {
  const userId = useRecoilValue(userState).userId

  const param = useParams().teamAlbumId
  const teamAlbumId = param ? +param : NaN

  const { data } = useQuery({
    queryKey: isSearchingMember
      ? ['searchUser', value]
      : isTeam
      ? ['searchTeamCard', value]
      : ['searchMyAlbumCard', value],
    queryFn: () => {
      if (isSearchingMember) {
        return searchUser(value)
      } else if (isTeam) {
        return searchTeamCard(teamAlbumId, value)
      } else {
        return userId && searchMyAlbumCard({ id: userId, userInput: value })
      }
    },
    enabled: value !== '',
  })

  useEffect(() => {
    if (data && onSearch) {
      onSearch(data)
    }
  }, [value, data, onSearch])

  return (
    <div>
      <Flex
        justify="space-between"
        align="center"
        direction="row"
        css={mainContainerCss}
      >
        <div css={searchBoxContainerCss(width ? width : '70%')}>
          <FluentSearchBox
            disabled={disabled}
            size={size}
            placeholder={placeholder}
            onChange={onChange}
            css={searchBoxCss(bgColor)}
            appearance="filled-darker"
            contentBefore={lefticon ? <SearchRegular /> : null}
          />
        </div>
        <PeopleFilterSortIcons
          memberIcon={memberIcon}
          filterIcon={filterIcon}
          sortIcon={sortIcon}
        />
      </Flex>
    </div>
  )
}

export default SearchBox

const mainContainerCss = css`
  padding-left: 5%;
  padding-right: 5%;
  background-color: ${tokens.colorNeutralBackground1};
`

const searchBoxCss = (bg: string) => css`
  background-color: ${bg
    ? 'tokens.' + bg
    : tokens.colorNeutralBackground1} !important;
  font-size: 16px !important;
  .ms-SearchBox-clearButton {
    position: absolute;
    right: 0;
  }
  border: none;
  border-bottom: none;
  width: 100%;
  background-color: ${tokens.colorNeutralBackground2};
`

const searchBoxContainerCss = (width: string) => css`
  min-width: 220px;
  background-color: ${tokens.colorNeutralBackground2};
  width: ${width} !important;
`
