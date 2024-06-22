import React from "react";
import styles from "./Pagination.module.css";
import DataLimitInput from "../DateLimitInput";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  setLimit: (limit: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  setLimit,
}) => {
  const siblingCount = 1;
  const totalPageNumbers = siblingCount * 2 + 5;

  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  const getPages = () => {
    if (totalPages <= totalPageNumbers) {
      return range(1, totalPages);
    }

    const startPage = Math.max(2, currentPage - siblingCount);
    const endPage = Math.min(totalPages - 1, currentPage + siblingCount);

    const pages: Array<number | string> = [1];

    if (startPage > 2) {
      pages.push("...");
    }

    pages.push(...range(startPage, endPage));

    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  return (
    <div className={styles.pagination}>
      <div>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.btn}
        >
          Previous
        </button>
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            className={`${styles.btn} ${currentPage === page ? styles.active : ""}`}
            disabled={typeof page !== "number"}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.btn}
        >
          Next
        </button>
      </div>
      <div>
        <DataLimitInput onLimitChange={setLimit} />
      </div>
    </div>
  );
};

export default Pagination;
