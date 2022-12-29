import React from 'react';
import styles from './index.module.css';

const ModalOverlay = (props) => {
    return (
        <div className={`${styles.Modal} ${styles[props.className]}`}>
            {props.children}
        </div>
    )
}

export default ModalOverlay;