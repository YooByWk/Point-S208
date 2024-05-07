import { deleteMyAlbumCards } from "@/apis/album";
import { userState } from "@/stores/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

export const useDeleteAlbumCards = (selectedCards :number[]) => {
  const userId = useRecoilValue(userState).userId 
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationKey: ["deleteMyAlbumCards"],
    mutationFn: () => deleteMyAlbumCards({userId: userId as number, cardIdArray: selectedCards }),
    onSuccess: () => {
      console.log("삭제 성공", selectedCards.length, "개의 명함이 삭제됨");
      queryClient.invalidateQueries({ queryKey: ["fetchMyAlbum"]})    
    },
    onError: (error) => {
      console.log("삭제 실패", error);
      window.alert("삭제에 실패했습니다. 다시 시도해주세요.");
    },
  });
}