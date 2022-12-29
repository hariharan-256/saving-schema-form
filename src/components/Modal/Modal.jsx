import React from "react";
import Portal from "../Portal";
import Backdrop from "./Backdrop";
import ModalOverlay from "./ModalOverlay";

const Modal = (props) => {
    return (
        <Portal>
            <Backdrop onClick={props.outerClick} className={props.className} />
            <ModalOverlay className={props.className}>
                {props.children}
            </ModalOverlay>
        </Portal>
    );
};

export default Modal;
