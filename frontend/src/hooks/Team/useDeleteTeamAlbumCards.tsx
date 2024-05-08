import { deleteTeamCards } from "@/apis/team";
import { deleteTeamCardArrayType } from "@/types/TeamListType";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTeamAlbumCards = () => {
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationKey: ["deleteTeamCards"],
    mutationFn: ({userId, cardIdArray, teamAlbumId} : deleteTeamCardArrayType) => deleteTeamCards({userId: userId as number, cardIdArray: cardIdArray, teamAlbumId: teamAlbumId as number }),
    onSuccess: () => {
      console.log("삭제 성공");
      queryClient.invalidateQueries({ queryKey: ["fetchTeamCardsList"]})    
    },
    onError: (error) => {
      console.log("삭제 실패", error);
      window.alert("삭제에 실패했습니다. 다시 시도해주세요.");
    },
  });

  return mutation;
}