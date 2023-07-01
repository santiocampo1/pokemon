import React from "react";
import { NavLink } from "react-router-dom"
import styles from "./Navbar.module.css"

const Navbar = ({ handleOnChange, handleOnSubmit }) => {
    return (
        <div>
            <div className={styles.createBoton} >
                <NavLink to="/create">
                    Crear
                </NavLink>
            </div>

            <div className={styles.search}>
                <form onChange={handleOnChange}>
                    <input type="search" placeholder="¡tienes que atraparlos!" />
                    <button type="submit" onClick={handleOnSubmit}>Buscar</button>
                </form>
            </div>
        </div>
    )
}

export default Navbar;