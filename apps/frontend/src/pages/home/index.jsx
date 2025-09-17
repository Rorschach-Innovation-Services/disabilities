import React from "react";
import { Link } from "react-router-dom"
import PivotLogo from "../../assets/logos/Pivot-Logo-6.png";
import styles from "../style.module.css";

export const Index = () => {
  return (
    <section className={styles["hero-container"]}>
      <div className={styles.hero}>
        <div className={styles["text-container"]}>
          <img
            src={PivotLogo}
            alt="Pivot logo"
            className={styles["hero-logo"]}
          />
          <h1 className={styles["hero-heading"]}>Welcome to the Pivot App</h1>
          <p className={styles["hero-subheading"]}>It&apos;s time to make a change.</p>
          <div className={styles["hero-text"]}>
            <p>What you share today shapes what others experience tomorrow.</p>
          </div>
          <Link to="/sign-in">
            <button className={styles["hero-button"]}>Sign In</button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Index;
