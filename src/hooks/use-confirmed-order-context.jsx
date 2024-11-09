import { useContext } from "react";
import { ConfirmedOrderModalContext } from "../context/confirmed-modal.context";

export const useConfirmedOrderContext = () => useContext(ConfirmedOrderModalContext)