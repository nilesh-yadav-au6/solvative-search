import React from "react";
import styles from "./Table.module.css";
import Pagination from "../Pagination";

interface Place {
  id: number;
  city: string;
  country: string;
  countryCode: string;
}

interface TableProps {
  places: Place[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  setLimit: (limit: number) => void;
}

const Table: React.FC<TableProps> = ({
  places,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
  setLimit,
}) => {
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <>
      {loading ? <div className={styles.spinner}>Loading...</div> : null}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Place Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {places?.length > 0 ? (
            places.map((place, index) => (
              <tr key={place?.id}>
                <td>{index + 1}</td>
                <td>{place?.city}</td>
                <td className={styles.image_td}>
                  <img
                    src={`https://flagsapi.com/${place?.countryCode}/flat/32.png`}
                    alt={place?.country}
                  />
                  <span>{place?.country}</span>
                </td>
              </tr>
            ))
          ) : (
            <div className={styles.searching}>Start searching</div>
          )}
        </tbody>
      </table>
      {places.length > 0 ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          setLimit={setLimit}
        />
      ) : null}
    </>
  );
};

export default Table;
