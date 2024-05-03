import {
  PeopleTeam32Regular,
  Filter32Regular,
  ArrowSort28Regular,
} from '@fluentui/react-icons'
import Flex from '@shared/Flex'

interface PeopleFilterSortIconsProps {
  memberIcon?: boolean
  filterIcon?: boolean
  sortIcon?: boolean
  
  /* 클릭 로직 추가 */ 
  
}

const PeopleFilterSortIcons:React.FC<PeopleFilterSortIconsProps> = (
  {memberIcon=true, filterIcon=true, sortIcon=true}
) => {
  return (
    <Flex>
      {memberIcon? <PeopleTeam32Regular
        onClick={() => {
          console.log('사람')
        }}
      />: null}
      {filterIcon? <Filter32Regular
        onClick={() => {
          console.log('필터')
        }}
      />: null}
      {sortIcon ?<ArrowSort28Regular
        onClick={() => {
          console.log('정렬')
        }}
      /> : null}
    </Flex>
  )
}

export default PeopleFilterSortIcons
