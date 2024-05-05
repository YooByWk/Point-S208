import {
  PeopleTeam32Regular,
  PeopleTeam32Filled,
  Filter32Regular,
  ArrowSort28Regular,
} from '@fluentui/react-icons'
import Flex from '@shared/Flex'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { isLookingMemberState } from '@/stores/team'
import { tokens } from '@fluentui/react-components'
import { colors } from '@/styles/colorPalette'

interface PeopleFilterSortIconsProps {
  memberIcon?: boolean
  filterIcon?: boolean
  sortIcon?: boolean
  
  /* 클릭 로직 추가 : 수정하기 */ 
  
}


const PeopleFilterSortIcons:React.FC<PeopleFilterSortIconsProps> = (
  {memberIcon=true, filterIcon=true, sortIcon=true}
) => {
  const [isLookingMember, setIsLookingMember] = useRecoilState(isLookingMemberState)
  
  return (
    <Flex>
      {memberIcon? 
      isLookingMember?
      <PeopleTeam32Filled
        onClick={() => {
          setIsLookingMember(!isLookingMember)
          console.log('isLookingMember: ', isLookingMember);
        }} />
      :<PeopleTeam32Regular
        onClick={() => {
          setIsLookingMember(!isLookingMember)
          console.log('isLookingMember: ', isLookingMember);
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
