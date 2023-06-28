import React from "react"
import { NavLink } from "react-router-dom"
import musicFile from "./audios/PokeSong.mp3"
import styles from "./Landing.module.css"


const Landing = () => {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>PokeApp</h1>
                <div className={styles.buttonContainer}>
                    <NavLink className={styles.button} to="/home">¡Haz click aquí!</NavLink>
                </div>

                <div className={styles.audioContainer}>
                    <audio src={musicFile} preload="none" controls />
                </div>
            </div>

            <div className={styles.social}>
                <a href="https://www.linkedin.com/in/santiocampo/" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.icons8.com/ios-filled/50/linkedin.png" alt="ícono de Linkedin" />
                </a>
                <a href="https://github.com/santiocampo1" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.icons8.com/ios-filled/50/github.png" alt="ícono de GitHub" />
                </a>
            </div>

        </div>
    )
}

export default Landing