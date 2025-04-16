


import { useAuth } from "@/modules/auth/contexts/features/useAuth";
import { JSX } from "react";
import AdminRouter from "./AdminRouter";
import GuestRouter from "./GuestRouter";
import ManagerRouter from "./ManagerRouter";

type RoleComponents = {
    [key: string]: JSX.Element;

};
const PrivateRouter = () => {
    const { user } = useAuth()
    const roleComponents: RoleComponents = {
        admin: <AdminRouter />,
        manager: <ManagerRouter />,
    };
    // console.log("user", user)
    // if (user?.role && roleComponents[user.role as keyof RoleComponents]) {
    //     return roleComponents[user.role as keyof RoleComponents];
    // }
    return roleComponents[user?.role.toLowerCase() as keyof RoleComponents] || <GuestRouter />;
    // return <GuestRouter />;
    // return roleComponents[userProfile.data?.data?.role] || <GuestRouter />;
}

export default PrivateRouter