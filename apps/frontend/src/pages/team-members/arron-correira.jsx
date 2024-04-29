import styles from "./profile.module.css";
import ArronLarge from "../../assets/images/arron-correira-lg.jpg";
import { CustomHeader } from "../../components/header";
import { Footer } from "../../components/footer";

export const Arron = () => {
    return (
        <div>
            <CustomHeader styles={styles} />

            <section className={styles["profile-section"]}>
                <div className={styles["profile-container"]}>
                    <div className={styles["row"]}>
                        <div className={styles["column"]}>
                            <div className={styles["profile-text-box"]}>
                                <h2>Sleep consultant</h2>
                                <h3>Arron Correia</h3>

                                <p>
                                    Ms. Correia is a consultant at Sleep Science
                                    and a Ph.D. candidate at the University of
                                    Cape Town. Her interests include genetics,
                                    the biochemistry of sleep, and the effect of
                                    sleep on the autonomic nervous system and
                                    mental illness. She also posts on the Sleep
                                    Science Facebook page.
                                </p>

                                <a href="mailto:CRRARR001@myuct.ac.za">
                                    <h4>CRRARR001@myuct.ac.za</h4>
                                </a>

                                <ul className={styles["profile-social-icons"]}>
                                    <li>
                                        <i
                                            className={
                                                "fa-brands fa-facebook-f"
                                            }
                                        ></i>
                                    </li>
                                    <li>
                                        <i className="fa-brands fa-linkedin-in"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles["column"]}>
                            <div className={styles["profile-image"]}>
                                <img
                                    src={ArronLarge}
                                    alt="arron-correira sleep consultant sleep science"
                                />
                            </div>

                            <div className={styles["profile-navigation"]}>
                                <a href="paula-pienaar">
                                    <button
                                        className={styles["previous"]}
                                        style={{ top: 0, left: 0 }}
                                    >
                                        {" "}
                                        &#171;{" "}
                                    </button>
                                </a>
                                <a href="dale-rae">
                                    <button
                                        className={styles["next"]}
                                        style={{ marginLeft: "45px" }}
                                    >
                                        &#187;{" "}
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};
