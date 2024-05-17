import BackArrow from '@/components/shared/BackArrow'
import CardList from '@/components/shared/CardList'
import { CardType } from '@/types/cardType'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { pageChanged } from '@stores/team'
import AddCard from '@/components/mobile/MyAlbum/AddCard'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchTeamCardsList } from '@/apis/team'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Flex from '@/components/shared/Flex'
import LargeButton from '@/components/shared/LargeButton'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import { isLookingMemberState } from '@/stores/team'
import TeamMember from '@/components/mobile/Team/TeamDetail/TeamMember'
import { TeamListType } from '@/types/TeamListType'
import { isAlbumState } from '@/stores/emptyCard'
import SearchBox from '@/components/shared/SearchBox'

const TeamDetail = () => {
  const isPageChanged = useRecoilValue(pageChanged)
  const [isAddCard, setIsAddCard] = useState(false)
  const { teamAlbumId } = useParams()

  const teamInfo: TeamListType = useLocation().state
  const teamAlbumIdNumber = teamAlbumId ? +teamAlbumId : 0
  const navigate = useNavigate()
  const isLookingMember = useRecoilValue(isLookingMemberState)
  const setIsAlbum = useSetRecoilState(isAlbumState)

  const hadnleAdd = () => {
    setIsAddCard(!isAddCard)
    setIsAlbum(false)
  }

  useEffect(() => {
    if (teamAlbumId === undefined) {
      alert('팀이 선택되지 않았습니다.')
      navigate(-1)
      return
    }
  }, [teamAlbumId])

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['fetchTeamCardsList', teamAlbumIdNumber, 0],
      queryFn: ({ pageParam = 0 }) =>
        fetchTeamCardsList(teamAlbumIdNumber, pageParam),
      getNextPageParam: (lastPage, allPages) => {
        return Array.isArray(lastPage.data_body) &&
          lastPage.data_body.length > 0
          ? allPages.length
          : undefined
      },
      initialPageParam: 0,
    })

  let teamCardList: CardType[] =
    data?.pages.flatMap(page => page.data_body) || []

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (hasNextPage) {
          fetchNextPage()
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [fetchNextPage, hasNextPage, data])

  if (isAddCard) {
    return (
      <>
        <AddCard
          isAddCard={isAddCard}
          setIsAddCard={setIsAddCard}
          teamInfo={teamInfo}
        />
      </>
    )
  }

  if (isLookingMember) {
    return <TeamMember team={teamInfo} />
  }

  if (!isLoading && (!data || teamCardList.length === 0)) {
    return (
      <>
        <BackArrow />
        <SearchBox
          isTeam={true}
          value={''}
          onSearch={() => {}}
          disabled={true}
          filterIcon={false}
          sortIcon={false}
        />

        <Flex
          direction="column"
          justify="center"
          align="center"
          style={{ height: '70vh' }}
        >
          <Text>팀에 명함이 없습니다. </Text>
          <Text>명함을 추가해주세요. </Text>
          <Spacing size={20} direction="vertical"></Spacing>
          <LargeButton text="명함 추가" onClick={hadnleAdd} />
        </Flex>
      </>
    )
  }

  return (
    <>
      <div>
        {!isPageChanged && <BackArrow />}
        {teamCardList[0] !== undefined && teamCardList.length > 0 ? (
          <CardList
            cards={teamCardList}
            isTeam={true}
            handleAdd={hadnleAdd}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
          />
        ) : (
          <></>
        )}
      </div>
      {isAddCard && (
        <AddCard isAddCard={isAddCard} setIsAddCard={setIsAddCard} />
      )}
    </>
  )
}

export default TeamDetail
