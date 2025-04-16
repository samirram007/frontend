

export const AppContextProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <>
        {children}
    </>
    // <UserInitialValueDataContextProvider>
    //     <GlobalDataContextProvider>
    //         <UserFiscalYearContextProvider>
    //             <SidebarContextProvider>
    //                 <FiscalYearContextProvider>
    // </FiscalYearContextProvider>
    //             </SidebarContextProvider>
    //         </UserFiscalYearContextProvider>
    //     </GlobalDataContextProvider>
    // </UserInitialValueDataContextProvider>
);