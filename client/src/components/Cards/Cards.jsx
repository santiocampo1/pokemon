import React from "react";
import Card from "../Card/Card";
import styles from "./Cards.module.css"


const Cards = ({ allPokemons }) => {

    const pokemons = allPokemons

    return (
        <div className={styles.container}>
            {pokemons?.map((pokemon) => {
                return <Card pokemon={pokemon} />
            })}
        </div>
    )
}

export default Cards;