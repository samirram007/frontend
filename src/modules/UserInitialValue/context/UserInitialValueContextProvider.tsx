import { createContext, useState } from "react";
import { useDeleteUserInitialValueMutation, useStoreUserInitialValueMutation, useUpdateUserInitialValueMutation } from "../hooks/mutations";



export const UserInitialValueContext = createContext({
    
    selectedUserInitialValue: null,
    setSelectedUserInitialValue: () => { },
    isModalOpen: false,
    setModalOpen: () => { },
    action: false,
    setAction: () => { },
    isProcessing: false,
    setIsProcessing: () => { },
    handleMutation: () => { },
});

export const UserInitialValueContextProvider = ({ children, entryMode = 'create', selectedData = null }) => {
    const userInitialValueStoreMutation = useStoreUserInitialValueMutation()
    const userInitialValueUpdateMutation = useUpdateUserInitialValueMutation()
    const userInitialValueDeleteMutation = useDeleteUserInitialValueMutation()
    const [isModalOpen, setModalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [action, _setAction] = useState(entryMode)
    const [selectedUserInitialValue, setSelectedUserInitialValue] = useState(selectedData ?? {
        key: 'New Type',
        value: 'New value',
      

    });
    const setAction = (value) => {
        _setAction(value)

    }

    const handleMutation = async (values) => {

        if (action === 'create') {
            userInitialValueStoreMutation.mutateAsync(values)
        } else if (action === 'edit') {
            userInitialValueUpdateMutation.mutateAsync(values).then(() => {
                setModalOpen(false)
                // setSelectedUserInitialValueType(values)
            })
        } else if (action === 'delete') {
            userInitialValueDeleteMutation.mutateAsync(values)
            .then(() => {
                setModalOpen(false)
                // setSelectedUserInitialValueType(values)
            })
        }
        else {
            console.info('Invalid entry mode')
        }
        return Promise.resolve()
    }
    return (<UserInitialValueContext value={
        {
            selectedUserInitialValue, setSelectedUserInitialValue,
            entryMode, action,setAction,
            handleMutation,
            isModalOpen, setModalOpen,
            isProcessing, setIsProcessing,
        }
    }>
        {children}
    </UserInitialValueContext>
    );
};

export default UserInitialValueContextProvider;