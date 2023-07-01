import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { postPokemon, getTypes } from "../../redux/actions"
import styles from "./Create.module.css"

const Create = () => {

    // Función despachadora.
    const dispatch = useDispatch()
    // Me traigo los types.
    const allTypes = useSelector((state) => state.allTypes)

    // Cuándo el componente se monta, me traigo todos los types.
    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    // El estado input guarda los valores de entrada del formulario.
    const [input, setInput] = useState({
        name: "",
        image: "",
        hp: null,
        attack: null,
        defense: null,
        speed: null,
        height: null,
        weight: null,
        type: ""
    })

    // El estado error almacena los posibles errores relacionados con los campos del formulario.
    const [error, setError] = useState({
        name: "",
        image: "",
        hp: null,
        attack: null,
        defense: null,
        speed: null,
        height: null,
        weight: null,
        type: ""
    })

    // El estado selectedTypes almacena los types seleccionados en forma de array.
    const [selectedTypes, setSelectedTypes] = useState([])

    // La función validate realiza la validación de los campos.
    const validate = (input) => {

        const errors = {
            name: "",
            image: "",
            hp: null,
            attack: null,
            defense: null,
            speed: null,
            height: null,
            weight: null,
            type: "",
        }

        if (!/^[a-z0-9]{1,15}$/.test(input.name)) {
            errors.name = "Name inválido";
        }

        if (!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*\/?$/.test(input.image)) {
            errors.image = "Imagen inválida";
        }

        if (!/^(?=.*[0-9])\d*$/.test(input.hp)) {
            errors.hp = "HP inválido. Debe ser un número.";
        }

        if (!/^(?=.*[0-9])\d*$/.test(input.attack)) {
            errors.attack = "Attack inválido. Debe ser un número.";
        }

        if (!/^(?=.*[0-9])\d*$/.test(input.defense)) {
            errors.defense = "Defense inválida. Debe ser un número.";
        }

        if (!/^\d+$/.test(input.speed)) {
            errors.speed = "Speed inválido. Debe ser un número";
        }

        if (!/^\d+$/.test(input.height)) {
            errors.height = "Height inválido. Debe ser un número.";
        }

        if (!/^\d+$/.test(input.weight)) {
            errors.weight = "Weight inválido. Debe ser un número";
        }

        setError(errors);
    }


    // La función handleOnChange se utiliza para manejar los cambios en los campos del formulario.
    const handleOnChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })

        validate({
            ...input,
            [event.target.name]: event.target.value
        })

    }

    // La función handleOnSubmit despacha la información que el usuario proporciona.
    const handleOnSubmit = (event) => {
        event.preventDefault()
        dispatch(postPokemon(input))
    }


    return (

        <div className={styles.container}>

            <NavLink to="/home" className={styles.botonBack} >
                Volver
            </NavLink>

            <h1>PokeCreate</h1>

            <form onSubmit={handleOnSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        name="name"
                        id="name"
                        value={input.name}
                        className={styles.input}
                        onChange={handleOnChange}
                    />
                    {error.name && <span>{error.name}</span>}
                </div>

                <div>
                    <label htmlFor="image">Image</label>
                    <input
                        name="image"
                        id="image"
                        value={input.image}
                        className={styles.input}
                        onChange={handleOnChange}
                    />
                    {error.image && <span>{error.image}</span>}
                </div>

                <div>
                    <label htmlFor="hp">HP</label>
                    <input
                        name="hp"
                        id="hp"
                        value={input.hp}
                        className={styles.input}
                        onChange={handleOnChange}
                    />
                    {error.hp && <span>{error.hp}</span>}
                </div>

                <div>
                    <label htmlFor="attack">Attack</label>
                    <input
                        name="attack"
                        id="attack"
                        value={input.attack}
                        className={styles.input}
                        onChange={handleOnChange}
                    />
                    {error.attack && <span>{error.attack}</span>}
                </div>

                <div>
                    <label htmlFor="defense">Defense</label>
                    <input
                        name="defense"
                        id="defense"
                        value={input.defense}
                        className={styles.input}
                        onChange={handleOnChange}
                    />
                    {error.defense && <span>{error.defense}</span>}
                </div>

                <div>
                    <label htmlFor="speed">Speed</label>
                    <input
                        name="speed"
                        id="speed"
                        value={input.speed}
                        className={styles.input}
                        onChange={handleOnChange}
                    />
                    {error.speed && <span>{error.speed}</span>}
                </div>

                <div>
                    <label htmlFor="height">Height</label>
                    <input
                        name="height"
                        id="height"
                        value={input.height}
                        className={styles.input}
                        onChange={handleOnChange}
                    />
                    {error.height && <span>{error.height}</span>}
                </div>

                <div>
                    <label htmlFor="weight">Weight</label>
                    <input
                        name="weight"
                        id="weight"
                        value={input.weight}
                        className={styles.input}
                        onChange={handleOnChange}
                    />
                    {error.weight && <span>{error.weight}</span>}
                </div>

                <div>
                    <label className={styles.label}>
                        Types
                    </label>
                    <div className={styles.checkboxContainer}>
                        {allTypes?.map((type) => (
                            <div key={type.name} className={styles.checkboxItem}>
                                <label htmlFor={type.name} className={styles.checkboxLabel}>
                                    {type.name}
                                </label>
                                <input
                                    type="checkbox"
                                    id={type.name}
                                    name={type.name}
                                    value={type.name}
                                    onChange={handleOnChange}
                                    className={styles.checkboxInput}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <button disabled={!input.name || !input.image || !input.hp || !input.attack || !input.defense || error.name || error.image || error.hp || error.attack || error.defense} className={styles.createButton}>Crear</button>
            </form>
        </div>
    );
};


export default Create;