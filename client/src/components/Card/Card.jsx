import React from "react";
import styles from "./Card.module.css"

const Card = () => {
    return (
        <div className={`${styles.card} ${styles.pointer}`}>
            <div className={styles.content}>
                <h2 className={styles.title}>Name</h2>
                <p className={styles.info}>hp</p>
                <p className={styles.info}>attack</p>
            </div>
        </div>


    )
}

export default Card;