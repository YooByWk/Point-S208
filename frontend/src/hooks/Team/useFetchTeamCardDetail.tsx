import {fetchTeamCardDetail} from '@apis/team'
import { useQuery } from "@tanstack/react-query"
import { useRecoilValue } from "recoil";
import { userState } from "@/stores/user";

export const useFetchTeamCardDetail = ({cardId, teamAlbumId}: {cardId: number, teamAlbumId: number | undefined}) => {

  const params = { teamAlbumId, cardId}
  const {data} = useQuery({
    queryKey : ['fetchTeamCardDetail', teamAlbumId, cardId],
    queryFn:() => fetchTeamCardDetail(params),
    enabled: !!teamAlbumId,
  })
  return data
}