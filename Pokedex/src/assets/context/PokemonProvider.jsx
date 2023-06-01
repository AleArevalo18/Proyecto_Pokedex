import { useState, useEffect } from "react"
import { PokemonContext } from "./PokemonContext"
import { useForm } from "../components/Hook/useForm"


export const PokemonProvider = ({children}) => {

    // Lógica
    const [offset, setOffset] = useState(0)
    const [allPokemons, setallPokemons] = useState([])
    const [todosPokemons, settodosPokemons] = useState([])

    // CustomHook
    const {valueSearch, onInputChange, onResetForm} = useForm({
        valueSearch: ''
    })


    const [loading, setloading] = useState(true)
    const [active, setActive] = useState(false)

    // Llamar a los 50 primero pokemons
    const getAllPokemons = async(limit = 50) =>{


        // Consumo de la PokeAPI
        const baseUrl = 'https://pokeapi.co/api/v2/';

        const res = await fetch(`${baseUrl}pokemon?limit=${limit}&offset=${offset}`)
        const data = await res.json();
        // console.log(data);

        // Acceso al link propio del Pokemon

        const promises = data.results.map(async pokemon => {
            const res = await fetch(pokemon.url);
            const data = await res.json();
            return data;
        })

        const results = await Promise.all(promises);

        setallPokemons([
            ...allPokemons,
            ...results
        ]);
        setloading(false);
    }


    // Llamado a todos los pokemons
    const getTodosPokemons = async() =>{

        const baseUrl = 'https://pokeapi.co/api/v2/';

        const res = await fetch(
			`${baseUrl}pokemon?limit=100000&offset=0`
		);
		const data = await res.json();

		const promises = data.results.map(async pokemon => {
			const res = await fetch(pokemon.url);
			const data = await res.json();
			return data;
		});
		const results = await Promise.all(promises);

        settodosPokemons(results);
        setloading(false);

    }


    // Buscar por ID
    const getPokemonById = async(id)=>{
        const baseUrl = 'https://pokeapi.co/api/v2/'

        const res = await fetch(`${baseUrl}pokemon/${id}`)
        const data = await res.json();
        return data

    }



    useEffect(() => {
      getAllPokemons()
    },[offset])


    useEffect(() => {
        getTodosPokemons()
    }, [])
    
    // Btn Cargar Más

    const onClickLoadMore = () => {
        setOffset(offset + 50);
    };

    // Filter Function + State

    const [filteredPokemons, setfilteredPokemons] = useState([])
    const [typeSelected, setTypeSelected] = useState({
        grass: false,
		normal: false,
		fighting: false,
		flying: false,
		poison: false,
		ground: false,
		rock: false,
		bug: false,
		ghost: false,
		steel: false,
		fire: false,
		water: false,
		electric: false,
		psychic: false,
		ice: false,
		dragon: false,
		dark: false,
		fairy: false,
		unknow: false,
		shadow: false,
    })


    const handleCheckbox = e =>{
        
        setTypeSelected({
            ...typeSelected,
            [e.target.name]: e.target.checked
        })

        if (e.target.checked) {
			const filteredResults = todosPokemons.filter(pokemon =>
				pokemon.types
					.map(type => type.type.name)
					.includes(e.target.name)
			);
            setfilteredPokemons([...filteredPokemons, ...filteredResults])
        }else{
            const filteredResults = filteredPokemons.filter(pokemon =>
				!pokemon.types
					.map(type => type.type.name)
					.includes(e.target.name)
			);
            setfilteredPokemons([...filteredResults]);
        }
    }



  return (
    <>

        <PokemonContext.Provider value ={{

            valueSearch,
            onInputChange,
            onResetForm,
            allPokemons,
            todosPokemons,
            getPokemonById,
            onClickLoadMore,
            loading,
            active,
            setActive,
            setloading,
            handleCheckbox,
            filteredPokemons

        }}>

            {children}

        </PokemonContext.Provider>

    </>
  )
}
