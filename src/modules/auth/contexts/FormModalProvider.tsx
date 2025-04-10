import React, { createContext, use, useState } from "react";
type FormModalContextType = {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
};
const FormModalContext = createContext<FormModalContextType | undefined>(undefined);

const FormModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const setOpen = (open: boolean) => {
        setIsOpen(open);
    };

    return (
        <FormModalContext value={{ isOpen, setOpen }}>
            {children}
        </FormModalContext>
    );
};
export default FormModalProvider;
export const useFormModal = () => use(FormModalContext);