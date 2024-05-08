import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AddTeamMemberType } from '@/types/TeamListType';
import { addTeamMember } from '@/apis/team';
import { useRecoilValue } from "recoil";
import { userState } from "@/stores/user";
export const useAddMember = () => {
  
  const userId = useRecoilValue(userState).userId
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey:['AddTeamMember'] ,
    mutationFn:({teamId, data}:AddTeamMemberType) => {
      if (!userId) {
        throw new Error('User ID is not available');
      }
      return addTeamMember({ userId: userId, teamId: teamId, data: data});
    },
    onSuccess: () => {
      console.log('팀 멤버 추가 성공')
      queryClient.invalidateQueries({queryKey:['fetchTeamMember', userId]})
    }
  })
  return mutation
}