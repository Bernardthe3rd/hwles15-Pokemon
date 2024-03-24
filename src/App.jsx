import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";
import PokemonCard from "./components/pokemonCard.jsx";

function App() {
    const [pokemonId, setPokemonId] = useState([])
    const [forwardPage, setForwardPage] = useState("")
    // const [prevPage, setPrevPage] = useState("")
    // const [loading, setLoading] = useState("")

    useEffect(() => {
        async function fetchPokemons () {
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon/")
                setPokemonId(response.data.results)
            } catch (e) {
                console.log(e.message)
            }
        }
        return fetchPokemons;
    },[])

    async function nextPage () {
        try {
            const responsePage = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20")
            setForwardPage(responsePage.data.next)
        } catch (e) {
            console.log(e.message)
        }
    }

    console.log(forwardPage)


  return (
    <>
        <header className="container">
            <h1>Gotta catch em all!</h1>
        </header>
        <div className="container buttons">
            <button type="button">Vorige</button>
            <button type="button" onClick={nextPage}>Volgende</button>
        </div>
        <div className="container">
            <ul className="card-overview">
                {pokemonId.map((url) =>{
                    return <li key={url.name}><PokemonCard giveUrl={url.url}/></li>
                })}

            </ul>

        </div>
    </>
  )
}

export default App
