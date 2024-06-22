import React, { useState } from "react";
import styles from "./DateLimitInput.module.css";

interface DataLimitInputProps {
  onLimitChange: (limit: number) => void;
}

const DataLimitInput: React.FC<DataLimitInputProps> = ({ onLimitChange }) => {
  const [limit, setLimit] = useState(5);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    if (newLimit >= 5 && newLimit <= 10) {
      setLimit(newLimit);
      onLimitChange(newLimit);
    } else {
      alert("Limit should be between 5 and 10");
    }
  };

  return (
    <div className={styles.limitInput_container}>
      <p>Limit</p>
      <input
        type="number"
        value={limit}
        onChange={handleChange}
        className={styles.limitInput}
        min="5"
        max="10"
      />
    </div>
  );
};

export default DataLimitInput;
