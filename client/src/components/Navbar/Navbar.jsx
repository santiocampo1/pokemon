import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom"
import { getByName } from "../../redux/actions"
import styles from "./Navbar.module.css"

const Navbar = () => {

    const dispatch = useDispatch()

    const [searchString, setSearchString] = useState("");

    const handleOnChange = (event) => {
        event.preventDefault();
        setSearchString(event.target.value);

    };

    const handleOnSubmit = (event) => {
        event.preventDefault();
        dispatch(getByName(searchString));
        setSearchString("")
    };

    return (
        <div>
            <div className={styles.createBoton} >
                <NavLink to="/create">
                    Crear
                </NavLink>
            </div>

            <div className={styles.search}>
                <form>
                    <input value={searchString} onChange={handleOnChange} type="search" placeholder="¡tienes que atraparlos!" />
                    <button type="submit" onClick={handleOnSubmit}>Buscar</button>
                </form>
            </div>
        </div>
    )
}

export default Navbar;