import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons, getTypes } from "../../redux/actions";
import Navbar from "../../components/Navbar/Navbar";
import Filters from "../../components/Filters/Filters";
import styles from "./Home.module.css";


const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <h1>PokeHome</h1>
                <Navbar />
                <Filters />
            </div>
        </div>
    );
};

export default Home;
