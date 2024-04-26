import { useState } from 'react'
import SearchBox from '@/components/shared/SearchBox'
import LargeButton from '@/components/shared/LargeButton'

import { useRecoilValue } from 'recoil'
import MyDigitalCard from './../../components/mobile/MyCard/MyDigitalCard'

import { dummyCard } from '@/assets/data/dummyCard'
import type { CardType } from '@/types/cardType';


const AppTeam = () => {
  const [searchValue, setSearchValue] = useState('')
  const CardDummy: CardType = dummyCard[0]
  return (
    <div>
      {/* 분리예정 */}
      <SearchBox
        value={searchValue}
        onChange={(e: any) => {
          setSearchValue(e.target.value)
          console.log(searchValue)
        }}
        memberIcon={false}
        filterIcon={true}
        sortIcon={true}
        placeholder="모바일 팀 명함"
      />
      <LargeButton
        text="팀 추가"
        onClick={() => {
          console.log('팀 추가')
        }}
        width="80%"
      />
      <MyDigitalCard  cardInfo={CardDummy} scale={1} />
      
      {/* 분리예정*/}
    </div>
  )
}

export default AppTeam
