
import { useNavigate } from 'react-router';


import { queryClient } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from "../contexts/features/useAuth";
import { logoutService } from "../services/apis";

export function useLogout() {

  const navigate = useNavigate()
  const { setUser, setToken } = useAuth();

  return useMutation({
    mutationFn: logoutService,
    onSuccess: () => { 
      setUser({});
      setToken(null, null);
      navigate("/login")
      queryClient.removeQueries()
    },
    onError: (err) => {
     
    }
  })
}