import React from "react";

import { useQuery } from "react-query";
import axios from "axios";

export const RQSuperHeroesPage = () => {
  const fetchSuperHeroes = () => {
    return axios.get("http://localhost:4000/superheroes");
  };
  //callback activity
  const onSuccess = (data) => {
    console.log("perform side effect after data fetching", data);
  };
  const onError = (error) => {
    console.log("perform side effect after encounting error", error);
  };
  //data transform as an array for ui
  //here used map method but can be use filter method to achive the same
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery("super-heroes", fetchSuperHeroes, {
    onSuccess,
    onError,
    select: (data) => {
      const superHeroNames = data.data.map((hero) => hero.name);
      return superHeroNames;
    },
  });

  // console.log(isLoading, isFetching);

  if (isLoading || isFetching) {
    return <h2>Loading....</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      <h1>RQ SuperHeroes Page</h1>
      <button onClick={refetch}>Fetch Heroes</button>
      {/* {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })} */}

      {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })}
    </div>
  );
};
