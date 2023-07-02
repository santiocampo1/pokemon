import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByName, getPokemons, getTypes, orderByName, orderByAttack, filterByType, filterByOrigin } from "../../redux/actions";
import Navbar from "../../components/Navbar/Navbar";
import Cards from "../../components/Cards/Cards";
import styles from "./Home.module.css";

const Home = () => {
    const dispatch = useDispatch();

    const allPokemons = useSelector((state) => state.allPokemons);
    const allTypes = useSelector((state) => state.allTypes);
    const pokemonsOrderedByName = useSelector((state) => state.pokemonsOrderedByName);
    const pokemonsOrderedByAttack = useSelector((state) => state.pokemonsOrderedByAttack);
    const pokemonsFiltered = useSelector((state) => state.pokemonsFiltered);
    const pokemonsByOrigin = useSelector((state) => state.pokemonsByOrigin);
    const orderName = useSelector((state) => state.orderName);
    const orderAttack = useSelector((state) => state.orderAttack);
    const filterType = useSelector((state) => state.filterType);
    const filterOrigin = useSelector((state) => state.filterOrigin);

    const [searchString, setSearchString] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const handleOnChange = (event) => {
        event.preventDefault();
        setSearchString(event.target.value.toUpperCase());
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();
        dispatch(getByName(searchString));
    };

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch]);

    const handleOrderByName = (event) => {
        dispatch(orderByName(event.target.value));
    };

    const handleOrderByAttack = (event) => {
        dispatch(orderByAttack(event.target.value));
    };

    const handleFilterByType = (event) => {
        dispatch(filterByType(event.target.value));
    };

    const handleFilterByOrigin = (event) => {
        dispatch(filterByOrigin(event.target.value));
    };

    //! PAGINADO
    // Cantidad de Cards por página
    const cardsPerPage = 12;

    // Calcular los índices de inicio y fin para mostrar las Cards
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;

    // Obtener las Cards correspondientes a la página actual
    const getCurrentPageCards = (cards) => {
        return cards.slice(indexOfFirstCard, indexOfLastCard);
    };

    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <h1>PokeHome</h1>
                <label>Ordenar pokemons según su nombre</label>
                <select onChange={handleOrderByName}>
                    <option defaultChecked value="-">
                        -
                    </option>
                    <option value="descendente">A-Z</option>
                    <option value="ascendente">Z-A</option>
                </select>
                <label>Ordenar pokemons según su valor de ataque</label>
                <select onChange={handleOrderByAttack}>
                    <option defaultChecked value="-">
                        -
                    </option>
                    <option value="descendente">De menos a más</option>
                    <option value="ascendente">De más a menos</option>
                </select>
                <label>Filtrar por Tipo</label>
                <select onChange={handleFilterByType}>
                    <option defaultChecked value="-">
                        -
                    </option>
                    {allTypes.map((tipo) => {
                        return <option value={tipo.name}>{tipo.name}</option>;
                    })}
                </select>
                <label>Filtrar por Origen</label>
                <select onChange={handleFilterByOrigin}>
                    <option value="-">-</option>
                    <option value="Base de datos">Base de datos</option>
                    <option value="API">API</option>
                </select>
                {orderName && <Cards allPokemons={getCurrentPageCards(pokemonsOrderedByName)} />}
                {orderAttack && <Cards allPokemons={getCurrentPageCards(pokemonsOrderedByAttack)} />}
                {filterType && <Cards allPokemons={getCurrentPageCards(pokemonsFiltered)} />}
                {filterOrigin && <Cards allPokemons={getCurrentPageCards(pokemonsByOrigin)} />}
                <Navbar handleOnChange={handleOnChange} handleOnSubmit={handleOnSubmit} />
                {!orderName && !orderAttack && !filterType && !filterOrigin && (
                    <Cards allPokemons={getCurrentPageCards(allPokemons)} />
                )}
                {/* Paginación */}
                <div className={styles.pagination}>
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                        Previous
                    </button>
                    <button
                        disabled={indexOfLastCard >= allPokemons.length}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
