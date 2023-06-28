import React from "react";
import { NavLink } from "react-router-dom"
import styles from "./Card.module.css"

const Card = ({ pokemon }) => {

    const { id, name, hp, image, attack, defense, speed, height, weight, type } = pokemon



    return (
        <div className={`${styles.content} ${styles.card}`}>
            <div>
                <NavLink to={`/home/${id}`}>
                    <h2 className={styles.title}>{name.toUpperCase()}</h2>
                    <div className={styles.info}>
                        <img className={styles.img} src={image} alt="Pokemon" />
                        {type?.map((tipo) => <p>🍃{tipo}</p>)}
                    </div >
                </NavLink>
            </div >
        </div >


    )
}

export default Card;