import axios from "axios";

export const getSearchPlaces = async (
  debouncedQuery: string,
  limit: number,
  currentPage: number
) => {
  return await axios.get(import.meta.env.VITE_BASE_URL, {
    params: {
      debouncedQuery,
      limit,
      offset: (currentPage - 1) * limit,
    },
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
      "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    },
  });
};
