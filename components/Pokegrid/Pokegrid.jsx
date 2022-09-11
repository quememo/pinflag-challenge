import Grid from "@mui/material/Grid";
import Pokecard from "../Pokecard/Pokecard";
import range from "lodash/range";

export default function Pokegrid({
  pokemonJSON,
  pokemonList,
  remain,
  fillMap,
}) {
  return (
    <Grid
      data-testid="mainGrid"
      container
      columns={15}
      rowGap={5}
      direction="row"
      justifyContent="space-around"
    >
      {pokemonList.map(({ name, url }) => (
        <Grid key={name} item sm={4} sx={{ minWidth: 250 }}>
          <Pokecard name={name} url={url} />
        </Grid>
      ))}

      {!pokemonJSON.null
        ? range(fillMap[remain]).map((i) => (
            <Grid key={`filler_${i}`} item sm={4} sx={{ minWidth: 250 }} />
          ))
        : null}
    </Grid>
  );
}
