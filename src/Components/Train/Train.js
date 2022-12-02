import React, { useEffect } from "react";
import trainImg from "../../Images/train.png";
import styles from "./train.module.css";

const Train = () => {
  useEffect(() => {
    let train = document.getElementById("trainImg");
    if (train) {
      train.style.transform = "translateX(0%)";
    }
  }, []);

  return (
    <div className={styles.train}>
      <img src={trainImg} alt="Train" id="trainImg" />
    </div>
  );
};

export default Train;
