import styles from "./Detail.module.css"
import { NavLink, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getById } from "../../redux/actions"


const Detail = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const pokemonDetail = useSelector((state) => state.pokemonDetail)

    useEffect(() => {
        dispatch(getById(id))
    }, [dispatch, id])


    const { name, image, hp, attack, defense, speed, height, weight, types } = pokemonDetail
    const key = id

    return (

        <div className={styles.detail}>

            <NavLink to="/home">
                Volver
            </NavLink>

            <h1>Name: {name}</h1>
            <img src={image} alt="" />
            <h3>Id: {key}</h3>
            <h3>HP: {hp}</h3>
            <h3>Attack: {attack}</h3>
            <h3>Defense: {defense}</h3>
            <h3>Speed: {speed}</h3>
            <h3>Height: {height}</h3>
            <h3>Weight: {weight}</h3>
            <h3>Types: {types?.join(", ")}</h3>
        </div>
    )
}

export default Detail