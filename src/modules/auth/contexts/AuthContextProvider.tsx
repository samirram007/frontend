import { type User } from "@/core/types/schema";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchUserProfileService, loginService, logoutService } from "../services/apis";
// import { useRefreshToken } from "../hooks/useRefreshToken";
export type LoginProps = {
    email: string;
    password: string;
}
export type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    login: (props: LoginProps) => Promise<void>;
    logout: () => Promise<void>;
    fetchProfile: () => Promise<void>;
}
type Props = { children: React.ReactNode }

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthContextProvider = ({ children }: Props) => {
    const navigavete = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const queryClient = useQueryClient();

    const fetchProfile = async () => {
        try {
            const data = await fetchUserProfileService();
            console.log('profile Data: ', data)
            setUser(data.data);
        } catch (error) {
            console.error("Failed to fetch profile:", error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const login = async ({ email, password }: LoginProps) => {
        setIsLoading(true);
        await loginService({ email, password })
        // axiosClient.get('/cookie-test').then(console.log);
        await fetchProfile();
    };

    const logout = async () => {
        console.log('Logging out...');

        try {
        // Optionally hit a logout endpoint to clear server-side auth
            await logoutService();

            // Clear all client-side cache (e.g. React Query)
            queryClient.clear();

            // Clear user state from context
            setUser(null);

            // Optionally clear auth cookies manually, if not HTTP-only
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=goschool-api.local; secure";
            navigavete("/login");

        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    return (
        <AuthContext
            value={{ user, isLoading, login, logout, fetchProfile }}>
            {children}
        </AuthContext>
    );
};
export default AuthContextProvider

