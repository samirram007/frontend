

import { type User } from "@/core/types/schema";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { fetchUserProfileService, loginService, logoutService } from "../services/apis";
// import { useRefreshToken } from "../hooks/useRefreshToken";

export type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}
type Props = { children: React.ReactNode }
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthContextProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const queryClient = useQueryClient();

    const fetchProfile = async () => {
        try {
            const data = await fetchUserProfileService();
            console.log('profile Data: ', data)
            setUser(data);
        } catch {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        await loginService({ email, password })
        // axiosClient.get('/cookie-test').then(console.log);
        await fetchProfile();
    };

    const logout = async () => {
        await logoutService();
        queryClient.clear();
        setUser(null);
    };
    return (
        <AuthContext
            value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext>
    );
};
export default AuthContextProvider

