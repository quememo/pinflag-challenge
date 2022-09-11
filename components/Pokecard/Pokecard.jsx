import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./Pokecard.module.css";
import capitalize from "lodash/capitalize";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Pokecard({ name, url }) {
  const [data, setData] = useState(null);
  const [isDataLoading, setImageLoading] = useState(true);
  const [pokemonId, setPokemonId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const pokemonRes = await fetch(url);
      const pokemonJson = await pokemonRes.json();
      setData(pokemonJson);
      setPokemonId(pokemonJson.id);

      setTimeout(() => {
        setImageLoading(false);
      }, 0.2 * 1000);
    };
    fetchData();
  }, [url]);

  return (
    <Card className={styles.pokecard}>
      {isDataLoading ? (
        <div className={styles.loading}>
          <CircularProgress color="primary" />
        </div>
      ) : (
        <CardMedia
          component="img"
          alt={`${name}_image`}
          height="180"
          image={
            data.sprites.front_default ? data.sprites.front_default : "/404.png"
          }
          sx={{ objectFit: "contain" }}
        />
      )}

      <CardContent className={styles["card-content"]}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontSize: 28 }}
        >
          {capitalize(name)}
        </Typography>
      </CardContent>
      <CardActions className={styles["card-buttons"]}>
        <Button variant="contained" size="small" sx={{ borderRadius: 8 }}>
          Favorite
        </Button>
        <Link href={`/pokedex/${pokemonId}`}>
          <Button variant="contained" size="small" sx={{ borderRadius: 8 }}>
            Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
