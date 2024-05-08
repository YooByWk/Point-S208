/** @jsxImportSource @emotion/react */
import {  tokens, SearchBox as FluentSearchBox } from '@fluentui/react-components'
import { css } from '@emotion/react'
import { useEffect } from 'react'

import Flex from '@/components/shared/Flex'
import PeopleFilterSortIcons from '@/components/shared/PeopleFilterSortIcons';

import { SearchRegular } from '@fluentui/react-icons';
import { searchMyAlbumCard } from '@/apis/album';
import { useQuery } from '@tanstack/react-query';
import { ExternalCardListType } from '@/types/ExternalCard';
import { searchUser } from '@/apis/team';
import { UserListType } from '@/types/userType';
import { useRecoilValue } from 'recoil';
import { userState } from '@/stores/user';
import { TeamListType } from '@/types/TeamListType';
interface SearchBoxProps {
  placeholder?: string
  onChange?: (e: any) => void
  sortIcon?: boolean
  spacing? : boolean
  lefticon?: boolean
  value: string | number
  width?: string
  bgColor?: string
  onSearch?: (value: ExternalCardListType | UserListType ) => void
  isSearchingMember?: boolean
  isInTeam?: boolean
  teams: TeamListType[]
  searchResult: TeamListType[];
  setSearchResult: React.Dispatch<React.SetStateAction<TeamListType[]>>;
}

const TeamListSearchBox: React.FC<SearchBoxProps> = ({
  placeholder,
  onChange,
  teams,
  value, // 검색어
  sortIcon,
  spacing = true,
  width,
  lefticon=true,
  bgColor='',
  onSearch,
  isSearchingMember=false,
  isInTeam=false,
  searchResult,
  setSearchResult
}) => {
  const userId = useRecoilValue(userState).userId
  
  
  useEffect(() => {
    if (value.toString().trim().length > 0) {
      const results = teams.filter((team) => 
        team.teamName.toLowerCase().includes(value.toString().toLowerCase())
      )
      setSearchResult(results)
       console.log(results)
    } else {
      setSearchResult(teams)
    }
  }, [value, teams, setSearchResult])
  
  return (
    <div>
      <Flex justify="space-between" align="center" direction="row"
      css={mainContainerCss}>
        <div  css={searchBoxContainerCss(width? width : '70%')}>
          <FluentSearchBox
            size='large'
            placeholder={placeholder}
            // onKeyDown={handleKeyDown}
            onChange={onChange}
            css={searchBoxCss(bgColor)}
            appearance='filled-darker'
            contentBefore={lefticon? <SearchRegular/>: null}
          />
        </div>
        <PeopleFilterSortIcons
         memberIcon={false}
         filterIcon={false}
         sortIcon={sortIcon}
        />
      </Flex>
    </div>
  )
}

export default TeamListSearchBox

// 사용 예
/**
 *
 *   const [searchValue, setSearchValue] = useState('');
 * return (
 *   <div>
 *     모바일 팀 명함
 *     <p></p>
 *     <TeamListSearchBox
 *     value={searchValue}
 *     onChange={(e:any) =>{ setSearchValue(e.target.value)
 *     console.log(searchValue)} }
 *
 *     />
 *   </div>
 * );
 */

const mainContainerCss = css`
  padding-left: 5%;
  padding-right: 5%;
  background-color: ${tokens.colorNeutralBackground1};
`

const searchBoxCss = (bg: string) => css`
  background-color: ${bg?  'tokens.'+ bg :tokens.colorNeutralBackground1 } !important;
  font-size: 16px !important;
.ms-TeamListSearchBox-clearButton {
  position: absolute;
    right: 0;
}
  border: none;
  border-bottom: none;
  width: 100%;
  background-color: ${tokens.colorNeutralBackground2};
`
const searchBoxContainerCss =(width: string) =>  css`
  min-width: 220px;
  background-color: ${tokens.colorNeutralBackground2};
  width: ${width} !important;
`