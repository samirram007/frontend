import { useMutation } from "@tanstack/react-query";





import { queryClient } from "@/services/queryClient";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/features/useAuth";
import { loginService } from "../services/apis";


export function useLogin() {
  const navigate = useNavigate()
  const { setUser, setToken } = useAuth();
  return useMutation({
    mutationFn: loginService,
    onSuccess: (response) => {

      setUser(response.data)
      setToken(response.data.token, response.data.refreshToken)
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      navigate("/dashboard")
      // toast.success("Login Successful");

    },
    onError: (error) => {
      console.log("login error", error);
    },
    retry: false,
  })
}