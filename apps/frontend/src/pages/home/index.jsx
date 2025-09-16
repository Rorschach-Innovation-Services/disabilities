import React from "react";
import { Link } from "react-router-dom";
import styles from "../style.module.css";

export const Index = () => {
  return (
    <div className={styles["hero-container"]}>
      <div className={styles["hero-heading"]}>
        Welcome to the Pivot App
      </div>

      <div className={styles["hero-text"]}>
        <p>
          Pivot is here to support, connect, and empower individuals with
          tools and resources that make a difference.
        </p>
      </div>

      <Link to="/sign-in">
        <button className={styles["hero-button"]}>Sign In</button>
      </Link>
    </div>
  );
};
export default Index;