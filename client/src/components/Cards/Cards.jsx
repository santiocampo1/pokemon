import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons } from "../../redux/actions";
import Card from "../Card/Card";
import styles from "./Cards.module.css"

// El componente Cards recibirá por props un array desde Filters.
const Cards = ({ allPokemons }) => {
    const dispatch = useDispatch()
    const pokemons = allPokemons

    useEffect(() => {
        dispatch(getPokemons());
    }, []);

    return (
        <div className={styles.container}>
            {pokemons?.map((pokemon) => {
                return <Card pokemon={pokemon} />
            })}
        </div>
    )
}

export default Cards;