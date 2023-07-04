import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getByName, getPokemons, getTypes } from "../../redux/actions";
import Navbar from "../../components/Navbar/Navbar";
import Filters from "../../components/Filters/Filters";
import styles from "./Home.module.css";


const Home = () => {
    const dispatch = useDispatch();
    const [searchString, setSearchString] = useState("");

    const handleOnChange = (event) => {
        event.preventDefault();
        setSearchString(event.target.value);

    };

    const handleOnSubmit = (event) => {
        event.preventDefault();
        dispatch(getByName(searchString))
        console.log(searchString);

    };

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <h1>PokeHome</h1>
                <Navbar handleOnChange={handleOnChange} handleOnSubmit={handleOnSubmit} />
                <Filters />
            </div>
        </div>
    );
};

export default Home;
