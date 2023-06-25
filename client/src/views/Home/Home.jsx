import Navbar from "../../components/Navbar/Navbar"
import Cards from "../../components/Cards/Cards"
import styles from "./Home.module.css"

const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <h1>Estás en el Home</h1>
                <Navbar />
                <Cards />
            </div>
        </div>
    )
}


export default Home