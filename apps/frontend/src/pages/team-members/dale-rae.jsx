import styles from "./profile.module.css";
import DaleLarge from "../../assets/images/dale-rae-lg.jpg";
import { CustomHeader } from "../../components/header";
import { Footer } from "../../components/footer";

export const Dale = () => {
    return (
        <div>
            <CustomHeader styles={styles} />

            <section className={styles["profile-section"]}>
                <div className={styles["profile-container"]}>
                    <div className={styles["row"]}>
                        <div className={styles["column"]}>
                            <div className={styles["profile-text-box"]}>
                                <h2>Director</h2>
                                <h3>Dale Rae</h3>

                                <p>
                                    Dr Rae is the Director of Sleep Science and
                                    a Senior Lecturer at the University of Cape
                                    Town. Her research focuses on sleep and
                                    circadian rhythms (i.e. the body’s 24h
                                    clock). She is particularly interested in
                                    how sleep is associated with health, disease
                                    and obesity, and the relationship between
                                    sleep, the body clock, athletic and
                                    work-place performance.
                                </p>

                                <a href="mailto:dale.rae@uct.ac.za">
                                    <h4>dale.rae@uct.ac.za</h4>
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
                                    src={DaleLarge}
                                    alt="Dale sleep consultant sleep science"
                                />
                            </div>
                        </div>

                        <div className={styles["profile-navigation"]}>
                            <a href="arron-correira">
                                <button
                                    className={styles["previous"]}
                                    style={{ top: 0, left: 0 }}
                                >
                                    {" "}
                                    &#171;{" "}
                                </button>
                            </a>
                            <a href="paula-pienaar">
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
