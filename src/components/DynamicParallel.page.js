import { useQueries } from "react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const DynamicParallelPage = ({ heroIds }) => {
  //   console.log(heroIds);
  const queryResults = useQueries(
    heroIds.map((id) => {
      return {
        querykey: ["super-hero", id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );
  console.log({ queryResults });
  return <div>Dynamic parallel page</div>;
};
