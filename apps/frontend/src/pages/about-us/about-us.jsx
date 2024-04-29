import styles from "./aboutus.module.css";
import Vision from "../../assets/images/vision-img.png";
import Mission from "../../assets/images/mission-img.png";
import Dale from "../../assets/images/Dale-Rae-sml.png";
import Paula from "../../assets/images/paula-pienaar-sml.png";
import Arron from "../../assets/images/arron-correira-sml.png";
import Philippa from "../../assets/images/philippa-forshaw-sml.png";
import { CustomHeader } from "../../components/header";
import { Footer } from "../../components/footer";

export const AboutUs = () => {
    return (
        <div>
            <CustomHeader styles={styles} />

            <section
                className={styles["vision-section"]}
                id={styles["vision-page"]}
            >
                <div className={styles["vision-container"]}>
                    <div className={styles["row"]}>
                        <div className={styles["column"]}>
                            <div className={styles["vision-image"]}>
                                <img
                                    src={Vision}
                                    alt="arron-correira sleep consultant sleep science"
                                />
                            </div>
                        </div>

                        <div className={styles["column"]}>
                            <div className={styles["vision-text-box"]}>
                                <h3>Vision</h3>

                                <p>
                                    A world where people understand, respect and
                                    achieve healthy sleep.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className={styles["mission-section"]}
                id={styles["mission-page"]}
            >
                <div className={styles["mission-container"]}>
                    <div className={styles["row"]}>
                        <div className={styles["column"]}>
                            <div className={styles["mission-text-box"]}>
                                <h3>Mission</h3>

                                <p>
                                    Our mission is to optimise your health,
                                    wellbeing and performance through
                                    cutting-edge sleep research and
                                    evidence-based, best-practice sleep
                                    education and services.
                                </p>
                            </div>
                        </div>

                        <div className={styles["column"]}>
                            <div className={styles["mission-image"]}>
                                <img
                                    src={Mission}
                                    alt="arron-correira sleep consultant sleep science"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className={styles["team-container"]}
                id={styles["the-team"]}
            >
                <div
                    className={styles["team-wrapper"]}
                    id={styles["team-members"]}
                >
                    <h2>The Sleep Science Team</h2>
                    <p>
                        Our team comprises physiologists and clinicians who have
                        specialised in sleep science, with vast experience in
                        sleep assessments, coaching and education. We work
                        closely with the{" "}
                        <a
                            href="http://www.humanbiology.uct.ac.za/hub/div-physiological-sciences-2021"
                            style={{ color: "white", fontWeight: 300 }}
                        >
                            University of Cape Town
                        </a>{" "}
                        to ensure that our services are evidence-based and up to
                        date with the latest sleep research.
                    </p>

                    <div className={styles["team-grid"]}>
                        <div className={styles["team-grid-box"]}>
                            <div className={styles["team-pic"]}>
                                <img
                                    src={Dale}
                                    width="250"
                                    height="250"
                                    alt="Team member"
                                />

                                <div
                                    className={`${styles["button-overlay"]}  ${styles["image__overlay_blur"]}`}
                                >
                                    <button className={styles["view-profile"]}>
                                        <a href="dale-rae">View profile</a>
                                    </button>
                                </div>
                            </div>

                            <h3>Dale Rae</h3>
                            <h4>PhD</h4>
                            <h4>Director</h4>
                            <p>
                                <a href="mailto:dale@sleepscience.co.za">
                                    dale@sleepscience.co.za
                                </a>
                            </p>
                        </div>

                        <div className={styles["team-grid-box"]}>
                            <div className={styles["team-pic"]}>
                                <img
                                    src={Paula}
                                    width="250"
                                    height="250"
                                    alt="Team member"
                                />

                                <div
                                    className={`${styles["button-overlay"]}  ${styles["image__overlay_blur"]}`}
                                >
                                    <button className={styles["view-profile"]}>
                                        <a href="paula-pienaar">View profile</a>
                                    </button>
                                </div>
                            </div>

                            <h3>Paula Pienaar</h3>
                            <h4>MSc, BSc(Med) Hons Biokinetics</h4>
                            <h4>Sleep consultant</h4>
                            <p>
                                <a href="mailto:PNRPAU001@myuct.ac.za">
                                    PNRPAU001@myuct.ac.za
                                </a>
                            </p>
                        </div>

                        <div className={styles["team-grid-box"]}>
                            <div className={styles["team-pic"]}>
                                <img
                                    src={Philippa}
                                    width="250"
                                    height="250"
                                    alt="Team member"
                                />

                                <div
                                    className={`${styles["button-overlay"]}  ${styles["image__overlay_blur"]}`}
                                >
                                    <button className={styles["view-profile"]}>
                                        <a href="philippa-forshaw">
                                            View profile
                                        </a>
                                    </button>
                                </div>
                            </div>

                            <h3>Philippa Forshaw</h3>
                            <h4>BSc(Med) Hons</h4>
                            <h4>Sleep consultant</h4>
                            <p>
                                <a href="mailto:FRSPHI002@myuct.ac.za">
                                    FRSPHI002@myuct.ac.za
                                </a>
                            </p>
                        </div>

                        <div className={styles["team-grid-box"]}>
                            <div className={styles["team-pic"]}>
                                <img
                                    src={Arron}
                                    width="250"
                                    height="250"
                                    alt="Team member"
                                />

                                <div
                                    className={`${styles["button-overlay"]}  ${styles["image__overlay_blur"]}`}
                                >
                                    <button className={styles["view-profile"]}>
                                        <a href="arron-correira">
                                            View profile
                                        </a>
                                    </button>
                                </div>
                            </div>

                            <h3>Arron Correia</h3>
                            <h4>BSc(Med) Hons</h4>
                            <h4>Sleep consultant</h4>
                            <p>
                                <a href="mailto:CRRARR001@myuct.ac.za">
                                    CRRARR001@myuct.ac.za
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};
