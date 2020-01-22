import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const BREEDS = gql`
  {
    breeds
  }
`

type BreedsQuery = {
  breeds: string[]
}

export const BreedSelector = () => {
  const { loading, error, data } = useQuery<BreedsQuery>(BREEDS)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error loading the breeds :(</div>

  return (
    <>
      <label htmlFor="breed">Choose a breed for a cute picture:</label>
      <select name="breed" id="breed">
        <option value="">choose U・ᴥ・U</option>
        {data.breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
    </>
  )
}