import * as React from "react";
import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const BREEDS = gql`
  {
    dogs {
      id
      breed
    }
  }
`;

const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;

interface BreedVar {
  breed: string;
}

type BreedsQuery = {
  dogs: BreedVar;
};

function DogPhoto({ breed }) {
  const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
    variables: { breed }
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <img
      alt={data.dog.id}
      src={data.dog.displayImage}
      style={{ height: 100, width: 100 }}
    />
  );
}

export const BreedSelector = () => {
  const { loading, error, data } = useQuery(BREEDS);
  const [imgSrc, setimgSrc] = useState("");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading the breeds :(</div>;

  return (
    <>
      <label htmlFor="breed">Choose a breed for a cute picture:</label>
      <select name="breed" id="breed" onChange={e => setimgSrc(e.target.value)}>
        {data.dogs.map(dog => (
          <option key={dog.id} value={dog.breed}>
            {dog.breed}
          </option>
        ))}
      </select>
      <DogPhoto breed={imgSrc} />
    </>
  );
};
