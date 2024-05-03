/** @jsxImportSource @emotion/react */
import { Field, tokens, SearchBox as FluentSearchBox } from '@fluentui/react-components'
import { css } from '@emotion/react'
import { useState, useEffect } from 'react'

import Flex from './Flex'
import PeopleFilterSortIcons from './PeopleFilterSortIcons';
import { colors } from '@/styles/colorPalette';
import Spacing  from '@/components/shared/Spacing';
import { SearchRegular } from '@fluentui/react-icons';
import { searchMyAlbumCard } from '@/apis/album';
import { useQuery } from '@tanstack/react-query';
import { ExternalCardListType } from '@/types/ExternalCard';
interface SearchBoxProps {
  placeholder?: string
  onChange?: (e: any) => void
  memberIcon?: boolean
  filterIcon?: boolean
  sortIcon?: boolean
  spacing? : boolean
  lefticon?: boolean
  value: string | number
  width?: string
  bgColor?: string
  onSearch: (value: ExternalCardListType ) => void
}


/**
 *
 * [searchValue, setSearchValue] = useState('');를
 * 각각 value와 onChange로 받아서 사용
 */
const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder,
  filterIcon,
  memberIcon,
  onChange,
  value, // 검색어
  sortIcon,
  spacing = true,
  width,
  lefticon=true,
  bgColor='',
  onSearch,
}) => {
  // const handleKeyDown = (e: any): void => {
  //   if (e.key === 'Enter') {
  //     // console.log('submit', value)
  //     // handleSubmit()
  //   } else {
  //     // console.log('not enter', value)
  //   }
  // }
  
// 검색 로직
 const { data } = useQuery({
  queryKey: ['searchMyAlbumCard', value],
  queryFn: () => searchMyAlbumCard(value),
  enabled: value !== '',
 })
 
  useEffect(() => {
    console.log('검색어', value)
    console.log('검색결과', data)
    if (data && onSearch) {
      onSearch(data)
    } 
    
  }, [value, data, onSearch])
  
  
  return (
    <div>
      {/* <p>{data?data:'없는디'}</p> */}
      {/* <Spacing size={10} direction='vertical'/> */}
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
         memberIcon={memberIcon}
         filterIcon={filterIcon}
         sortIcon={sortIcon}
        />
      </Flex>
      
    </div>
    
  )
}

export default SearchBox

// 사용 예
/**
 *
 *   const [searchValue, setSearchValue] = useState('');
 * return (
 *   <div>
 *     모바일 팀 명함
 *     <p></p>
 *     <SearchBox
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
.ms-SearchBox-clearButton {
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