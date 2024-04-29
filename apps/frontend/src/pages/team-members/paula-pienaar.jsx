import styles from "./profile.module.css";
import PaulaLarge from "../../assets/images/paula-pienaar-lg.jpg";
import { CustomHeader } from "../../components/header";
import { Footer } from "../../components/footer";

export const Paula = () => {
    return (
        <div>
            <CustomHeader styles={styles} />

            <section className={styles["profile-section"]}>
                <div className={styles["profile-container"]}>
                    <div className={styles["row"]}>
                        <div className={styles["column"]}>
                            <div className={styles["profile-text-box"]}>
                                <h2>Sleep consultant</h2>
                                <h3>Paula Pienaar</h3>

                                <p>
                                    Ms. Pienaar is co-founder of Sleep Science,
                                    a registered biokineticist and co-tutelle
                                    PhD candidate at the University of Cape Town
                                    and the Amsterdam Public Health Research
                                    Institute of Vrije University. Her interests
                                    lie in optimising physical, mental and work
                                    performance by enhancing sleep health.
                                </p>

                                <a href="mailto:PNRPAU001@myuct.ac.za">
                                    <h4>PNRPAU001@myuct.ac.za</h4>
                                </a>

                                <ul className={styles["profile-social-icons"]}>
                                    <li>
                                        <i className="fa-brands fa-facebook-f"></i>
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
                                    src={PaulaLarge}
                                    alt="arron-correira sleep consultant sleep science"
                                />
                            </div>
                        </div>

                        <div className={styles["profile-navigation"]}>
                            <a href="dale-rae">
                                <button
                                    className={styles["previous"]}
                                    style={{ top: 0, left: 0 }}
                                >
                                    {" "}
                                    &#171;{" "}
                                </button>
                            </a>
                            <a href="philippa-forshaw">
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
            </section>

            <Footer />
        </div>
    );
};
