import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router";
import { useAuth } from "../contexts/features/useAuth";
import { refreshTokenService } from "../services/apis";

export function useRefreshToken() {
  const originalUri = window.location.pathname; // Save the current URI
  console.log("refresh Token Mutation called");

  localStorage.setItem('originalUri', originalUri);
  const navigate = useNavigate()
  const { setUser, setToken } = useAuth();
  return useMutation({
    mutationFn: refreshTokenService,
    onSuccess: (data) => {
      setUser(data.data)
      setToken(data.token, data.refreshToken)

      queryClient.invalidateQueries({ queryKey: ['profile'] })
      const originalUri = localStorage.getItem('originalUri') || "/";

      // Navigate to the original URI
      navigate(originalUri);

      // Optionally, remove the original URI from localStorage after using it
      localStorage.removeItem('originalUri');
    },
    onError: () => {

      // toast(error.response.data.message)
      navigate("/login")
    }
  })
}