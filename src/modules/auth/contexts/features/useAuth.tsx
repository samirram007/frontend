import { use } from "react";
import { AuthContext, AuthContextType } from "../AuthContextProvider";

// export const useAuth = () => use(AuthContext);

export const useAuth = (): AuthContextType => {
    const context = use(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};