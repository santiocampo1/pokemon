import React from "react";
import styles from "./Navbar.module.css"

const Navbar = ({ handleOnChange, handleOnSubmit }) => {
    return (
        <div className={styles.search}>
            <form onChange={handleOnChange}>
                <input type="search" placeholder="¡tienes que atraparlos!" />
                <button type="submit" onClick={handleOnSubmit}>Buscar</button>
            </form>
        </div>
    )
}

export default Navbar;