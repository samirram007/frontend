import { useQuery } from "@tanstack/react-query";
import { fetchUserProfileService } from "../services/apis";




export function useProfile() {

    return useQuery({
        queryKey: ['profile'],
        queryFn: fetchUserProfileService,
        staleTime: Infinity,
        enabled: false
    })


}