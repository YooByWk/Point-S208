/** @jsxImportSource @emotion/react */

import { useState } from 'react'
import SearchBox from '@/components/shared/SearchBox'
import LargeButton from '@/components/shared/LargeButton'
import type { CardType } from '@/types/cardType'
import { useRecoilValue } from 'recoil'

import { dummyCard } from '@/assets/data/dummyCard'
import { dummyTeamList } from '@/assets/data/dummyTeamList'

import MyDigitalCard from './../../components/mobile/MyCard/MyDigitalCard'
import TeamCard from './../../components/mobile/Team/TeamCard'
import Spacing from '@/components/shared/Spacing'
import { tokens } from '@fluentui/react-components'
import { css } from '@emotion/react'

const AppTeam = () => {
  const [searchValue, setSearchValue] = useState('')
  const CardDummy: CardType = dummyCard[0]

  return (
    <div css={bg}>
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

      {/* <MyDigitalCard  cardInfo={CardDummy} scale={1} /> */}
      {/*  for문으로 팀을 만들겠지? */}
      {dummyTeamList.map(team => {
        return <TeamCard teamInfo={team} />
      })}

      <Spacing size={30} direction="vertical" />
      <LargeButton
        text="팀 추가"
        onClick={() => {
          console.log('팀 추가')
        }}
        width="80%"
      />
      {/* 분리예정*/}
    </div>
  )
}

export default AppTeam

const bg = css`
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
  &::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
    background: transparent !important;
    -webkit-appearance: none !important;
  }

`
