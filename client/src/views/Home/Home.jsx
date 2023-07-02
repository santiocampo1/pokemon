import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getByName, getPokemons, getTypes, orderByName, orderByAttack, filterByType, filterByOrigin } from "../../redux/actions"
import Navbar from "../../components/Navbar/Navbar"
import Cards from "../../components/Cards/Cards"
import styles from "./Home.module.css"


const Home = () => {

    // Función despachadora.
    const dispatch = useDispatch()

    // Suscripción a los estados globales con los que trabajará Home.
    const allPokemons = useSelector((state) => state.allPokemons)
    const allTypes = useSelector((state) => state.allTypes)
    const pokemonsOrderedByName = useSelector((state) => state.pokemonsOrderedByName)
    const pokemonsOrderedByAttack = useSelector((state) => state.pokemonsOrderedByAttack)
    const pokemonsFiltered = useSelector((state) => state.pokemonsFiltered)
    const pokemonsByOrigin = useSelector((state) => state.pokemonsByOrigin)
    const orderName = useSelector((state) => state.orderName)
    const orderAttack = useSelector((state) => state.orderAttack)
    const filterType = useSelector((state) => state.filterType)
    const filterOrigen = useSelector((state) => state.filterOrigen)

    // Estado local searchString que inicializo como un string vacío.
    const [searchString, setSearchString] = useState("")

    // Función handleOnChange que seta el string que el usuario escribe y lo transforma en upperCase.
    const handleOnChange = (event) => {
        event.preventDefault()
        setSearchString(event.target.value.toUpperCase())
    }

    // Función handleOnSubmit que despacha la action, con el valor de búsqueda.
    const handleOnSubmit = (event) => {
        event.preventDefault()
        dispatch(getByName(searchString))
    }

    // Cuando el componente se monta, se despacha la action getPokemons. Cada vez que el dispatch se actualiza, el componente se re-renderiza.
    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
    }, [dispatch])


    // Función handleOrder que despacha la action.
    const handleOrderByName = (event) => {
        dispatch(orderByName(event.target.value))
    }

    const handleOrderByAttack = (event) => {
        dispatch(orderByAttack(event.target.value))
    }

    const handleFilterByType = (event) => {
        // console.log(event.target.value);
        dispatch(filterByType(event.target.value))
    }

    const handleFilterByOrigin = (event) => {
        dispatch(filterByOrigin(event.target.value))
    }

    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <h1>PokeHome</h1>
                <label>Ordenar pokemons según su nombre</label>
                <select onChange={handleOrderByName}>
                    <option defaultChecked value="-">-</option>
                    <option value="descendente">A-Z</option>
                    <option value="ascendente">Z-A</option>
                </select>
                <label>Ordenar pokemons según su valor de ataque</label>
                <select onChange={handleOrderByAttack}>
                    <option defaultChecked value="-">-</option>
                    <option value="descendente">De menos a más</option>
                    <option value="ascendente">De más a menos</option>
                </select>
                <label>Filtrar por Tipo</label>
                <select onChange={handleFilterByType}>
                    <option defaultChecked value="-">-</option>
                    {allTypes.map((tipo) => {
                        return (
                            <option value={tipo.name}>{tipo.name}</option>
                        )
                    })}
                </select>
                <label>Filtrar por Origen</label>
                <select onChange={handleFilterByOrigin}>
                    <option value="-">-</option>
                    <option value="Base de datos">Base de datos</option>
                    <option value="API">API</option>
                </select>
                {orderName && <Cards allPokemons={pokemonsOrderedByName} />}
                {orderAttack && <Cards allPokemons={pokemonsOrderedByAttack} />}
                {filterType && <Cards allPokemons={pokemonsFiltered} />}
                {filterOrigen && <Cards allPokemons={pokemonsByOrigin} />}
                <Navbar handleOnChange={handleOnChange} handleOnSubmit={handleOnSubmit} />
                {!orderName && !orderAttack && !filterType && !filterOrigen && <Cards allPokemons={allPokemons} />}
            </div>
        </div>
    )
}


export default Home;