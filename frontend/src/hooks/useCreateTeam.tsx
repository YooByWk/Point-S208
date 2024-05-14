import { CreateTeam } from "@/apis/team";
import { userState } from "@/stores/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

export const useCreateTeam = () => {
  const userId = useRecoilValue(userState).userId 
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationKey: ["CreateTeam"],
    mutationFn: ({teamName, userList}: {teamName: string, userList: number[]}) => CreateTeam({userId: userId as number, data: {teamName, userList} }),
    onSuccess: () => {
      console.log(" 멤버 포함 팀 생성 성공");
      queryClient.invalidateQueries({ queryKey: ["fetchTeamList", userId]})
    },
    onError: (error) => {
      console.log("팀 생성 실패", error);
      window.alert("팀 생성에 실패했습니다. 다시 시도해주세요.");
    },
  });

  return mutation;
}
