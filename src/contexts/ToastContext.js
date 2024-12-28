import { createContext, useContext } from "react";
import { useState } from "react";
import MySnackBar from "../components/MySnackBar";

const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {

    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState("");

    function showHideToast(message) {
        setMessage(message);
        setOpenToast(true);
        setTimeout(() => {
            setOpenToast(false)
        }, 3000)
    }

    return (
        <ToastContext.Provider value={{ showHideToast }}>
            <MySnackBar open={openToast} message={message} />
            {children}
        </ToastContext.Provider>
    )
}

export const useToast = () => {
    return useContext(ToastContext);
}