import { useQuery } from "@tanstack/react-query";
import { fetchUserInitialValueByKeyService, fetchUserInitialValuesService } from "../services/apis";
const moduleQueryKey = 'userInitialValues'
 
export function useUserInitialValues(key) {
  if (!key) {
    
    return useQuery({
      queryKey: [moduleQueryKey],
      queryFn: fetchUserInitialValuesService,
      refetchOnMount: true,
      enabled: true,
      staleTime: Infinity // keep data fresh for this period (1 min.)
    })
  }
  
    return useQuery({
      queryKey: [moduleQueryKey, { key }],
      queryFn: () => fetchUserInitialValueByKeyService(key),
      refetchOnMount: true,
      enabled: !!key,
      staleTime: Infinity
    })
 
}
