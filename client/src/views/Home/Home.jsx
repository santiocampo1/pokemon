import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getByName, getPokemons, getTypes, order, filterTypes } from "../../redux/actions"
import Navbar from "../../components/Navbar/Navbar"
import Cards from "../../components/Cards/Cards"
import styles from "./Home.module.css"


const Home = () => {

    // Función despachadora.
    const dispatch = useDispatch()

    // Suscripción a los estados globales con los que trabajará Home.
    const allPokemons = useSelector((state) => state.allPokemons)
    const allTypes = useSelector((state) => state.allTypes)
    const pokemonsOrdered = useSelector((state) => state.pokemonsOrdered)
    const pokemonsFiltered = useSelector((state) => state.pokemonsFiltered)
    const orders = useSelector((state) => state.orders)
    const filters = useSelector((state) => state.filters)

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
    const handleOrder = (event) => {
        dispatch(order(event.target.value))
    }

    const handleType = (event) => {
        dispatch(filterTypes(event.target.value))
    }



    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <h1>PokeHome</h1>
                <label>Ordenar según nombre y ataque</label>
                <select onChange={handleOrder} name="" id="">
                    <option defaultChecked value="0">-</option>
                    <option value="ascendente">ascendente</option>
                    <option value="descendente">descendente</option>
                </select>
                <label>Filtrar por Tipo</label>
                <select onChange={handleType} name="" id="">
                    {allTypes.map((tipo) => {
                        return (
                            <option value={tipo.name}>{tipo.name}</option>
                        )
                    })}
                </select>
                {orders && <Cards allPokemons={pokemonsOrdered} />}
                {filters && <Cards allPokemons={pokemonsFiltered} />}
                <Navbar handleOnChange={handleOnChange} handleOnSubmit={handleOnSubmit} />
                <Cards allPokemons={allPokemons} />
            </div>
        </div>
    )
}


export default Home;