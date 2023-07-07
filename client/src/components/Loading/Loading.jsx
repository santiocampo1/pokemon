import React from 'react'
import styles from "./Loading.module.css"

const Loading = () => {
    return (
        <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Cargando...</p>
        </div>
    );
}

export default Loading