import React from "react";
import styles from './error.module.css'

const Error = (props) => {
  const { errorMessage, setShowError } = props;
  console.log(errorMessage);
  return (
    <div className={styles.container}>
      <h1>{errorMessage}</h1>
      <button onClick={() => setShowError(false)}>Close</button>
    </div>
  );
};

export default Error;
