import React from "react";
import styles from "./Navbar.module.css"

const Navbar = () => {
    return (
        <div className={styles.search}>
            <form action="">
                <input type="text" placeholder="¡tienes que atraparlos!" />
                <button>Buscar</button>
            </form>
        </div>
    )
}

export default Navbar;