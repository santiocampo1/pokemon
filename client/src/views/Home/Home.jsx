import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getByName, getPokemons } from "../../redux/actions"
import Navbar from "../../components/Navbar/Navbar"
import Cards from "../../components/Cards/Cards"
import styles from "./Home.module.css"


const Home = () => {

    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.allPokemons)  // Con useSelector le estoy indicando al componente a qué estado quiero estar pendiente, a quién estar suscripto
    const [searchString, setSearchString] = useState("")


    const handleOnChange = (event) => {
        event.preventDefault()  // sirve para que la página no se refresque.
        setSearchString(event.target.value.toUpperCase())
    }

    //! FILTRO CON EL BACKEND
    const handleOnSubmit = (event) => {
        event.preventDefault()
        dispatch(getByName(searchString))
    }



    //! FILTRO CON EL ESTADO
    // const [filtered, setFiltered] = useState(allPokemons)


    // const handleOnSubmit = (event) => {
    //     event.preventDefault()

    //     const filtered = allPokemons.filter(pokemon => pokemon.name.toLowerCase() === searchString)

    //     setFiltered(filtered)
    // }


    useEffect(() => {
        dispatch(getPokemons())
        //todo  Tener en cuenta el siguiente código. Debe borrar toda la info para que no quede guardada cuando el componente se desmonte. Lo van a preguntar en el PI si no realizo esta función
        // return (() => {   
        //     clearInfo() 
        // })
    }, [dispatch])

    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <h1>PokeHome</h1>
                <Navbar handleOnChange={handleOnChange} handleOnSubmit={handleOnSubmit} />
                <Cards allPokemons={allPokemons} />
            </div>
        </div>
    )
}


export default Home;