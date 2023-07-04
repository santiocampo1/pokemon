import { useDispatch, useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import { orderByName, orderByAttack, filterByType, filterByOrigin } from "../../redux/actions";
import { useState } from "react";
import styles from "./Filters.module.css"

const Filters = () => {
    const dispatch = useDispatch();
    const allTypes = useSelector((state) => state.allTypes);
    const orderName = useSelector((state) => state.orderName);
    const pokemonsOrderedByName = useSelector((state) => state.pokemonsOrderedByName);
    const orderAttack = useSelector((state) => state.orderAttack);
    const pokemonsOrderedByAttack = useSelector((state) => state.pokemonsOrderedByAttack);
    const filterType = useSelector((state) => state.filterType);
    const pokemonsFiltered = useSelector((state) => state.pokemonsFiltered);
    const filterOrigin = useSelector((state) => state.filterOrigin);
    const pokemonsByOrigin = useSelector((state) => state.pokemonsByOrigin);
    const allPokemons = useSelector((state) => state.allPokemons);

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
        console.log(event.target.value);
    };

    //* Paginado
    const [currentPage, setCurrentPage] = useState(1)

    const cardsPerPage = 12;

    const indexOfLastCard = currentPage * cardsPerPage
    const indexOfFirstCard = indexOfLastCard - cardsPerPage

    const getCurrentPageCards = (cards) => {
        return cards.slice(indexOfFirstCard, indexOfLastCard)
    }

    return (
        <div>
            <div className={styles.filters}>
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
                        return <option key={tipo.name} value={tipo.name}>{tipo.name}</option>;
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
                {!orderName && !orderAttack && !filterType && !filterOrigin && (
                    <Cards allPokemons={getCurrentPageCards(allPokemons)} />
                )}
            </div>

            <div className={styles.paginado}>
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                    Previous
                </button>

                <button disabled={indexOfLastCard >= allPokemons.length} onClick={() => setCurrentPage(currentPage + 1)}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Filters;
