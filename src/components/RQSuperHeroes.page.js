import React, { useState } from "react";
// import axios from "axios";
import { useAddSuperHeroData, useSuperHeroesData } from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";

export const RQSuperHeroesPage = () => {
  // const fetchSuperHeroes = () => {
  //   return axios.get("http://localhost:4000/superheroes");
  // };
  //callback activity
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");
  const onSuccess = (data) => {
    console.log("perform side effect after data fetching", data);
  };
  const onError = (error) => {
    console.log("perform side effect after encounting error", error);
  };
  //user hooks impematation
  const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroesData(onSuccess, onError);

  // console.log(isLoading, isFetching);
  const { mutate: addHero } = useAddSuperHeroData();

  const handleAddHeroClick = () => {
    console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    addHero(hero);
  };

  if (isLoading || isFetching) {
    return <h2>Loading....</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      <h1>RQ SuperHeroes Page</h1>
      <div>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" value={alterEgo} onChange={(e) => setAlterEgo(e.target.value)} />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.name}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}

      {/* {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
    </div>
  );
};
