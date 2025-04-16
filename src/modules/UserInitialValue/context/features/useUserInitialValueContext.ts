import { use } from "react";
import { UserInitialValueContext } from "../UserInitialValueContextProvider";
 



export const useUserInitialValueContext = () => {
    return use(UserInitialValueContext);
};