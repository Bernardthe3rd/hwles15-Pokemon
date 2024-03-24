import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";
import PokemonCard from "./components/pokemonCard.jsx";

function App() {
    const [pokemonId, setPokemonId] = useState([])
    const [forwardPage, setForwardPage] = useState("")
    const [prevPage, setPrevPage] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const abortController = new AbortController();
        async function fetchPokemons () {
            setLoading(true);
            setError(false);
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon/",
                    {signal:abortController.signal,
                })
                setPokemonId(response.data.results)
                setForwardPage(response.data.next)
                setPrevPage(response.data.previous)
            } catch (e) {
                setError(true)
                console.error(e.message)
            }
            setLoading(false)
        }

        void fetchPokemons();

        // return () => {
        //     abortController.abort()
        // } Hij gebruikt deze abortcontroller te vroeg wanneer je dit aanzet.. Krijg je bij mount direct een cancel. How?
    },[]);

    async function fetchNextPage () {
        setLoading(true)
        setError(false);
        try {
            const responsePage = await axios.get(forwardPage)
            setPokemonId(responsePage.data.results)
            setForwardPage(responsePage.data.next)
            setPrevPage(responsePage.data.previous)
        } catch (e) {
            setError(true)
            console.error(e.message)
        }
        setLoading(false)
    }

    async function fetchPrevPage () {
        setLoading(true);
        setError(false);
        try {
            const responsePage = await axios.get(prevPage)
            setPokemonId(responsePage.data.results)
            setForwardPage(responsePage.data.next)
            setPrevPage(responsePage.data.previous)
        } catch (e) {
            setError(true);
            console.error(e.message)
        }
        setLoading(false)
    }


  return (
    <>
        <header className="container">
            <h1>Gotta catch em all!</h1>
        </header>
        <div className="container buttons">
            <button type="button" onClick={fetchPrevPage} disabled={!prevPage || loading}>Vorige</button>
            <button type="button" onClick={fetchNextPage} disabled={!forwardPage || loading}>Volgende</button>
        </div>
        {loading && !error ? <p>Loading ...</p> : error ? <p>Er ging iets mis, please try again later</p>
            :
            <div className="container">
                <ul className="card-overview">
                    {pokemonId.map((url) =>{
                        return <li key={url.name}><PokemonCard giveUrl={url.url}/></li>
                    })}
                </ul>

            </div>
        }
    </>
  )
}

export default App
