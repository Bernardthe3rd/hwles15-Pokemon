import axios from "axios";
import {useEffect, useState} from "react";


const PokemonCard = ({giveUrl}) => {
    const [pokemon, setPokemon] = useState({})
    const [pokemonImage, setPokemonImage] = useState({})
    const [pokemonMove, setPokemonMove] = useState([])
    const [pokemonAbilities, setPokemonAbilities] = useState([])

    useEffect(() => {
        async function fetchPokemon () {
            try {
                const response = await axios.get(giveUrl)
                setPokemon(response.data)
                setPokemonImage(response.data.sprites)
                setPokemonMove(response.data.moves)
                setPokemonAbilities(response.data.abilities)
            } catch (e) {
                console.log(e.message)
            }
        }
        return fetchPokemon
    },[giveUrl])

    return (
        <>
            <article className="card">
                <h2>{pokemon.name}</h2>
                <span>
                    <img src={pokemonImage.front_default} alt="pokemon image"/>
                </span>
                <p>Moves: {pokemonMove.length}</p>
                <p>Weight: {pokemon.weight}</p>
                {/*<p>Abilities:</p>*/}
                <ul>Abilities:
                    {pokemonAbilities.map((ability) => {
                        return <li key={ability.slot} className="abilities">{ability.ability.name}</li>
                    })}
                </ul>
            </article>
        </>
    );
};

export default PokemonCard;