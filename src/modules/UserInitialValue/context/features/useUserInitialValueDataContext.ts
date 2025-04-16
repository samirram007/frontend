import { use } from "react";
import { UserInitialValueDataContext } from "../UserInitialValueDataContextProvider";
 



export const useUserInitialValueDataContext = () => {
    return use(UserInitialValueDataContext);
};