import { useState } from "react"
import type { FormEvent } from "react"
import styles from "./Pokemon.module.css"
import { pokemonApiSlice } from "./pokemonApiSlice"
import { useAppDispatch } from "../../app/hooks"
import { store } from "../../app/store"

export const Pokemon = () => {
  const dispatch = useAppDispatch()
  const [pokemonQueryString, setPokemonQueryString] = useState('')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const { data: pokemonData } =
      await dispatch(pokemonApiSlice.endpoints.getPokemon.initiate(pokemonQueryString))

    const { data: pokemonSpeciesData } =
      await dispatch(pokemonApiSlice.endpoints.getPokemonSpecies.initiate(pokemonQueryString))

    console.log(store.getState());
  }

    return (
      <div className={styles.container}>
        <form onSubmit={(event) => handleSubmit(event)}>
          <input type="text" onChange={(e) => setPokemonQueryString(e.target.value)}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
}
