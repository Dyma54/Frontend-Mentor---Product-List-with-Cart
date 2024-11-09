import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ConfirmedOrderModalContext = createContext({
    isOpen: false,
    onOpen: () => {},
    onClose: () => {}
});

export default function ConfirmedOrderModalContextProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => setIsOpen(true);
    const onClose = () => {
        setIsOpen(false)
    }

    return (
        <ConfirmedOrderModalContext.Provider value={{ isOpen, onOpen, onClose }}>
            {children}
        </ConfirmedOrderModalContext.Provider>
    );
}

ConfirmedOrderModalContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};
