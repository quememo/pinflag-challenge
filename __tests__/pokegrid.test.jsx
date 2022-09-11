import { render, screen } from "@testing-library/react";
import Pokegrid from "../components/Pokegrid/Pokegrid";
import "@testing-library/jest-dom";
import fetch from "isomorphic-unfetch";

const pokemonJSON = {
  count: 1154,
  next: "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
  previous: null,
  results: [
    { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
    { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
    { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
    { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
    { name: "charmeleon", url: "https://pokeapi.co/api/v2/pokemon/5/" },
    { name: "charizard", url: "https://pokeapi.co/api/v2/pokemon/6/" },
    { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/" },
    { name: "wartortle", url: "https://pokeapi.co/api/v2/pokemon/8/" },
    { name: "blastoise", url: "https://pokeapi.co/api/v2/pokemon/9/" },
    { name: "caterpie", url: "https://pokeapi.co/api/v2/pokemon/10/" },
    { name: "metapod", url: "https://pokeapi.co/api/v2/pokemon/11/" },
    { name: "butterfree", url: "https://pokeapi.co/api/v2/pokemon/12/" },
    { name: "weedle", url: "https://pokeapi.co/api/v2/pokemon/13/" },
    { name: "kakuna", url: "https://pokeapi.co/api/v2/pokemon/14/" },
    { name: "beedrill", url: "https://pokeapi.co/api/v2/pokemon/15/" },
    { name: "pidgey", url: "https://pokeapi.co/api/v2/pokemon/16/" },
    { name: "pidgeotto", url: "https://pokeapi.co/api/v2/pokemon/17/" },
    { name: "pidgeot", url: "https://pokeapi.co/api/v2/pokemon/18/" },
    { name: "rattata", url: "https://pokeapi.co/api/v2/pokemon/19/" },
    { name: "raticate", url: "https://pokeapi.co/api/v2/pokemon/20/" },
  ],
};

describe("Pokegrid", () => {
  it("renders a Pokegrid", () => {
    const pokemonList = pokemonJSON.results;
    const remain = pokemonJSON.count % 3;
    const fillMap = { 0: 0, 1: 2, 2: 1 };
    render(
      <Pokegrid
        pokemonJSON={pokemonJSON}
        pokemonList={pokemonList}
        remain={remain}
        fillMap={fillMap}
      />
    );

    const grid = screen.getByTestId("mainGrid");
    expect(grid).toBeInTheDocument();
  });
});

describe("Pokegrid", () => {
  it("renders a Bulbasaur details button", () => {
    const pokemonList = pokemonJSON.results;
    const remain = pokemonJSON.count % 3;
    const fillMap = { 0: 0, 1: 2, 2: 1 };
    render(
      <Pokegrid
        pokemonJSON={pokemonJSON}
        pokemonList={pokemonList}
        remain={remain}
        fillMap={fillMap}
      />
    );

    const bulbasaurDetailsBtn = screen.getByTestId("details-bulbasaur");
    expect(bulbasaurDetailsBtn).toBeInTheDocument();
  });
});

describe("Pokegrid", () => {
  it("renders a Bulbasaur favorite button", () => {
    const pokemonList = pokemonJSON.results;
    const remain = pokemonJSON.count % 3;
    const fillMap = { 0: 0, 1: 2, 2: 1 };
    render(
      <Pokegrid
        pokemonJSON={pokemonJSON}
        pokemonList={pokemonList}
        remain={remain}
        fillMap={fillMap}
      />
    );

    const bulbasaurFavoriteBtn = screen.getByTestId("favorite-bulbasaur");
    expect(bulbasaurFavoriteBtn).toBeInTheDocument();
  });
});
