import React from "react";

import { useQuery } from "react-query";
import axios from "axios";

export const RQSuperHeroesPage = () => {
  const fetchSuperHeroes = () => {
    return axios.get("http://localhost:4000/superheroes");
  };
  //enabled is for stop fetching info and waiting for click event for fetch info
  const { isLoading, data, isError, error, isFetching } = useQuery("super-heroes", fetchSuperHeroes, {
    enabled: false,
  });

  console.log(isLoading, isFetching);
  if (isLoading) {
    return <h2>Loading....</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      <h1>RQ SuperHeroes Page</h1>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </div>
  );
};
