import React from "react"
import musicFile from "./audios/PokeSong.mp3"
import styles from "./Landing.module.css"


const Landing = () => {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>PokeApp</h1>
                <div className={styles.buttonContainer}>
                    <button className={styles.button}>¡Haz click aquí!</button>
                </div>

                <div className={styles.audioContainer}>
                    <audio src={musicFile} preload="none" controls />
                </div>
            </div>

        </div>
    )
}

export default Landing