import { createContext, useMemo } from "react";
import { useUserInitialValues } from "../hooks/queries";



export const UserInitialValueDataContext = createContext({
    data: [],
    fetchedData: {},
});

export const UserInitialValueDataContextProvider = ({ children }) => {


    const fetchedData = useUserInitialValues();
    const mData = fetchedData.data?.data ?? [];

    const data = useMemo(() => [...mData], [mData]);

    // if (fetchedData.isLoading) {
    //     return <div className="flex items-center justify-center h-full">
    //         <Loader className="animate-spin" />
    //     </div>
    // }
    if (fetchedData.isError) {
        return <div className="flex flex-col items-center justify-center h-full">
            <p>Error Loading FiscalYear</p>
            <p>Contact your Admin</p>
        </div>
    }
    return (<UserInitialValueDataContext value={
        {
            data, fetchedData,
        }
    }>
        {children}
    </UserInitialValueDataContext>
    );
};

export default UserInitialValueDataContextProvider;