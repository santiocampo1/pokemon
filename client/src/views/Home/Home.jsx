import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemons, getTypes } from "../../redux/actions";
import Navbar from "../../components/Navbar/Navbar";
import Filters from "../../components/Filters/Filters";
import Loading from "../../components/Loading/Loading";
import styles from "./Home.module.css";


const Home = () => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch]);

    return (
        <div className={styles.container}>
            {isLoading ? (
                <Loading />
            ) : (
                <div className={styles.contentWrapper}>
                    <h1>PokeHome</h1>
                    <Navbar />
                    <Filters />
                </div>
            )}
        </div>

    );
};

export default Home;