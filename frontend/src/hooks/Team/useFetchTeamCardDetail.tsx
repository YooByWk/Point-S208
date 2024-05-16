import {fetchTeamCardDetail} from '@apis/team'
import { useQuery } from "@tanstack/react-query"

export const useFetchTeamCardDetail = ({cardId, teamAlbumId}: {cardId: number, teamAlbumId: number | undefined}) => {

  const params = { teamAlbumId, cardId}
  const {data} = useQuery({
    queryKey : ['fetchTeamCardDetail', teamAlbumId, cardId],
    queryFn:() => fetchTeamCardDetail(params),
    enabled: !!teamAlbumId,
  })
  return data
}