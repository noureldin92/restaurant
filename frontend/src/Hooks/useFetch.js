import { useEffect, useState } from "react";

export function useFetch(getdataFn) {
  let [availbleMeals, setAvailbleMeals] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [Error, setError] = useState("");

  useEffect(() => {
    async function fetchMeals() {
      setIsLoading(true);
      try {
        let Meals = await getdataFn();
        setAvailbleMeals(Meals);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }

    fetchMeals();
  }, []);
  return { availbleMeals, isLoading, Error };
}
