import React from "react";
import { NavLink } from "react-router-dom"
import styles from "./Card.module.css"

const Card = ({ pokemon }) => {

    // Destructuro la info del pokemon que necesito renderizar.
    const { id, name, image, types } = pokemon
    let key = id

    return (
        <div>
            <div className={styles.card}>
                <NavLink className={styles.nav} to={`/home/${key}`}>
                    <h2 className={styles.title}>{name.toUpperCase()}</h2>
                    <div className={styles.info}>
                        <img className={styles.img} src={image} alt="Pokemon" />
                        {types?.map((tipo) => <p>🍃{tipo}</p>)}
                    </div >
                </NavLink>
            </div >
        </div >


    )
}

export default Card;