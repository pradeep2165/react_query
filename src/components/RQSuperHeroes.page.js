import React from "react";

import { useQuery } from "react-query";
import axios from "axios";

export const RQSuperHeroesPage = () => {
  const fetchSuperHeroes = () => {
    return axios.get("http://localhost:4000/superheroes");
  };

  const { isLoading, data } = useQuery("super-heroes", fetchSuperHeroes);
  return (
    <div>
      <h1>RQ SuperHeroes Page</h1>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </div>
  );
};
