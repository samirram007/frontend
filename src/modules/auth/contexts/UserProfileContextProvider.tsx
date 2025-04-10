import { User } from "@/types/schema";
import { createContext, Dispatch, SetStateAction, use, useEffect, useState } from "react";

import { Loader } from "lucide-react";
import { useProfile } from "../hooks/useProfile";

type UserProfileContextType = {
    profile: User | null;
    setProfile: Dispatch<SetStateAction<User | null>>;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined)

const UserProfileContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const fetchedData = useProfile()
    // const { token, user } = useAuth()
    const [profile, setProfile] = useState<User | null>(null)

    // ✅ Extract data safely
    const data = fetchedData.data?.data || [];

    // ✅ Set profile correctly inside useEffect (Prevents infinite re-render)
    useEffect(() => {
        setProfile(data[0] || null);
    }, [data]); // ✅ Only updates when `data` changes

    if (fetchedData.isLoading) {
        return <div className="flex items-center justify-center h-full">
            <Loader className="animate-spin" />
        </div>
    }
    if (fetchedData.status === "error") {
        return <div className="flex flex-col items-center justify-center h-full">
            <p>Error Loading Profile</p>
            <p>Contact your Admin</p>
        </div>
    }
    return (
        <UserProfileContext value={{ profile, setProfile }}>{children}</UserProfileContext>
    )
}

export default UserProfileContextProvider
export const useProfileContext = () => use(UserProfileContext);