import styles from "./profile.module.css";
import PhilippaLarge from "../../assets/images/philippa-forshaw-lg.jpg";
import { CustomHeader } from "../../components/header";
import { Footer } from "../../components/footer";

export const Philippa = () => {
    return (
        <div>
            <CustomHeader styles={styles} />

            <section className={styles["profile-section"]}>
                <div className={styles["profile-container"]}>
                    <div className={styles["row"]}>
                        <div className={styles["column"]}>
                            <div className={styles["profile-text-box"]}>
                                <h2>Sleep consultant</h2>
                                <h3>Philippa Forshaw</h3>

                                <p>
                                    Ms Forshaw is a consultant at Sleep Science
                                    and an Ph.D. candidate at the University of
                                    Cape Town. Her research focuses on sleep and
                                    cardiometabolic health. She is also
                                    interested in the relationship between sleep
                                    and exercise, while her broader interests
                                    include the pivotal role that sleep plays in
                                    overall physical & mental health. She is
                                    passionate about making research accessible
                                    to the public and curates the Sleep Science
                                    Instagram account.
                                </p>

                                <a href="mailto:FRSPHI002@myuct.ac.za">
                                    <h4>FRSPHI002@myuct.ac.za</h4>
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
                                    src={PhilippaLarge}
                                    alt="arron-correira sleep consultant sleep science"
                                />
                            </div>
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
                            <a href="arron-correira">
                                <button
                                    className={styles.next}
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
