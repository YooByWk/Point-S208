import { deleteMyAlbumCard } from "@/apis/album";
import { userState } from "@/stores/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

export const useDeleteAlbumCard = () => {
  const userId = useRecoilValue(userState).userId 
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationKey: ["deleteMyAlbumCard"],
    mutationFn: (cardId: number) => deleteMyAlbumCard({userId: userId as number, cardId }),
    onSuccess: () => {
      console.log("삭제 성공");
      queryClient.invalidateQueries({ queryKey: ["fetchMyAlbum"]})
      window.location.reload() 
    },
    onError: (error) => {
      console.log("삭제 실패", error);
      window.alert("삭제에 실패했습니다. 다시 시도해주세요.");
    },
  });

  return mutation;
}