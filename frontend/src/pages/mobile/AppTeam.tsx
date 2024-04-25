import {useState} from 'react';
import  SearchBox from '@/components/shared/SearchBox';
import LargeButton from '@/components/shared/LargeButton';
const AppTeam = () => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div>
      {/* 분리예정 */ }
      <SearchBox
      value={searchValue}
      onChange={(e:any) =>{ setSearchValue(e.target.value)
      console.log(searchValue)} }
      memberIcon={false}
      filterIcon={true}
      sortIcon={true}
      placeholder='모바일 팀 명함'
      />
      <LargeButton 
      text = '팀 추가'
      onClick = {() => {console.log('팀 추가')}}
      width='80%'
      />
      {/* 분리예정*/}
    </div>
  );
};

export default AppTeam;