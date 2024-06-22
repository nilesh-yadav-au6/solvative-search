import React, { useState, useEffect } from "react";
import SearchBox from "./components/SearchBox";
import PlaceTable from "./components/Table";
import useDebounce from "./hooks/useDenounce";
import { getSearchPlaces } from "./service/service";

const App: React.FC = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const fetchPlaces = async () => {
      if (!debouncedQuery) {
        setPlaces([]);
        setTotalPages(1);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await getSearchPlaces(
          debouncedQuery,
          limit,
          currentPage
        );
        setPlaces(response.data.data);
        setTotalPages(Math.ceil(response.data.metadata.totalCount / limit));
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [debouncedQuery, limit, currentPage]);

  return (
    <>
      <SearchBox onSearch={setQuery} />
      <PlaceTable
        places={places}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        loading={loading}
        error={error}
        setLimit={setLimit}
      />
    </>
  );
};

export default App;
