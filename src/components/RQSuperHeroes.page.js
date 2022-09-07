import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

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
  //user hooks impematation
  const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroesData(onSuccess, onError);

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
