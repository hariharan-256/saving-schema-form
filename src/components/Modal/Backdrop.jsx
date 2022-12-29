import React from "react";
import styles from './index.module.css';

const Backdrop = (props) => {
    return (
        <div onClick={props.onClick} className={`${styles.backdrop} ${styles[props.className]}`}></div>
    )
}

export default Backdrop;