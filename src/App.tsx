import * as React from "react";
import { ApolloProvider } from "@apollo/react-hooks";

import { apolloClient } from "./apolloClient";

import { BreedSelector } from "./BreedSelector";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <ApolloProvider client={apolloClient}>
        <BreedSelector />
      </ApolloProvider>
    </div>
  );
}
