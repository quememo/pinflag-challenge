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
  const [isFavorite, setIsFavorite] = useState(false);

  const addToFavoriteHandler = () => {
    const favoriteList = JSON.parse(localStorage.getItem("favoriteList"));
    favoriteList.push(name);
    localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
    setIsFavorite(true);
  };

  const removeFromFavoriteHandler = () => {
    let favoriteList = JSON.parse(localStorage.getItem("favoriteList"));
    favoriteList = favoriteList.filter((e) => e !== name);
    localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
    setIsFavorite(false);
  };

  useEffect(() => {
    const favoriteList = JSON.parse(localStorage.getItem("favoriteList"));
    if (!favoriteList) localStorage.setItem("favoriteList", JSON.stringify([]));

    if (favoriteList && favoriteList.includes(name)) setIsFavorite(true);
    if (favoriteList && !favoriteList.includes(name)) setIsFavorite(false);

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
  }, [url, name]);

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
        {isFavorite ? (
          <Button
            onClick={removeFromFavoriteHandler}
            data-testid={`unfavorite-${name}`}
            variant="contained"
            size="small"
            sx={{ borderRadius: 8 }}
            color="error"
          >
            Remove from Favorite
          </Button>
        ) : (
          <Button
            onClick={addToFavoriteHandler}
            data-testid={`favorite-${name}`}
            variant="contained"
            size="small"
            sx={{ borderRadius: 8 }}
          >
            Add to Favorite
          </Button>
        )}

        <Link href={`/pokedex/${pokemonId}`}>
          <Button
            data-testid={`details-${name}`}
            variant="contained"
            size="small"
            sx={{ borderRadius: 8 }}
          >
            Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
