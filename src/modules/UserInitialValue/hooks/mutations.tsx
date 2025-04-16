import { useMutation, useQueryClient } from "@tanstack/react-query";


 
import { deleteUserInitialValueService, storeUserInitialValueService, updateUserInitialValueService } from "../services/apis";

import { queryClient } from "@/lib/queryClient";
const moduleQueryKey = 'userInitialValues'
export function useStoreUserInitialValueMutation() {
 
  return useMutation({
    mutationFn: storeUserInitialValueService,
    onSuccess: ({data}) => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
     
   
    },
    onError: (error) => {
      console.log("I am   useStoreUserInitialValueMutation Error")
     // toast.error(error.response.data.message)
    }
  })
}
export function useUpdateUserInitialValueMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserInitialValueService, // This should call your API to update the school
    onSuccess: ({ data: updatedUserInitialValue }) => {
      // Update the specific school in the cache
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
     

      console.log('UserInitialValue updated in cache');
    },
    onError: (error) => {
      console.error('Error updating school:', error);
    },
  });
}
export function useDeleteUserInitialValueMutation() {
 
  return useMutation({
    mutationFn: deleteUserInitialValueService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
     
    },
    onError: (error) => {
      console.log("I am   useDeleteUserInitialValueMutation Error")
    }
  })
}
