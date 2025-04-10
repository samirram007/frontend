import { fetchUserProfileService } from "@/modules/User/services/apis";
import { useQuery } from "@tanstack/react-query";

export function useAuthUser() {
    return useQuery({
    queryKey: ['user'],
    queryFn: fetchUserProfileService,
    staleTime: Infinity
  })
}