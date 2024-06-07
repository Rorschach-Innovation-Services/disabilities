import styles from "../research.module.css";
import RuralSleepPatternsSmall from "../../../assets/images/rural-sleep-patterns-sml.jpg";
import GutHealthSmall from "../../../assets/images/gut-health-sml.jpg";
import AfricanOriginSmall from "../../../assets/images/african-origin-sml.jpg";
import TravelJetlagSmall from "../../../assets/images/research/circadian rhythms, transmeridian travel and jetlag.jpg";
import SedentaryBehaviourAfricanWomanSmall from "../../../assets/images/sedentary-behaviour-african-woman-sml.jpg";
import ApnoeaWearableDeviceSmall from "../../../assets/images/apnoea-wearable-device-sml.jpg";
import { Fragment } from "react";

export const SecondPage = ({ setRender }) => {
    return (
        <Fragment>
            <section className={styles["research-container"]}>
                <h1>Our sleep research</h1>
                <div
                    className={styles["research-wrapper"]}
                    id={styles["our-business"]}
                >
                    <a href="/articles/rural-sleep-patterns">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={RuralSleepPatternsSmall}
                                    alt=""
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>
                            Dr Dale Rae and collaborators{" "}
                            </h3>

                            <p>
                                Timing, quality, and physiology of sleep in a
                                deprived rural community cohort in South Africa
                                and their relationship with HIV and
                                non-communicable diseases
                            </p>
                        </div>
                    </a>

                    <a href="/articles/gut-microbiota-and-cardiometabolic">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={GutHealthSmall}
                                    alt=""
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>Dr Dale Rae and collaborators</h3>

                            <p>
                                Sleep timing, gut microbiota and cardiometabolic
                                risk across the Epidemiologic Transition{" "}
                            </p>
                        </div>
                    </a>

                    <a href="/articles/african-origins">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={AfricanOriginSmall}
                                    alt=""
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>Dr Dale Rae and collaborators</h3>

                            <p>
                                Chronotype and sleep patterns in rural and urban
                                South African individuals of African origin
                            </p>
                        </div>
                    </a>

                    <a href="/articles/travel-jetlag">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={TravelJetlagSmall}
                                    alt=""
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>Dr Dale Rae and collaborators</h3>

                            <p>
                                Circadian rhythms, transmeridian travel and
                                jetlag
                            </p>
                        </div>
                    </a>

                    <a href="/articles/sedentary-behaviour-african-woman">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={SedentaryBehaviourAfricanWomanSmall}
                                    alt=""
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>Dr Dale Rae and collaborators</h3>

                            <p>
                            Cross-sectional associations between mental health indicators and social vulnerability, with physical activity, sedentary behaviour and sleep in urban African young women
                            </p>
                        </div>
                    </a>

                    <a href="/articles/apnoea-wearable-device">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={ApnoeaWearableDeviceSmall}
                                    alt=""
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>Dr Dale Rae and collaborators</h3>

                            <p>
                                A validation study of a PPG-derived algorithm to
                                predict sleep architecture, sleep apnoea and
                                breathing rate using a wearable device{" "}
                            </p>
                        </div>
                    </a>
                </div>
            </section>
            <section className={styles["pagination-nav"]}>
                <div className={styles["pagination"]}>
                    <a
                        onClick={() => setRender("first")}
                        style={{ cursor: "pointer" }}
                    >
                        &laquo;
                    </a>
                    <a
                        onClick={() => setRender("first")}
                        style={{ cursor: "pointer" }}
                    >
                        1
                    </a>
                    <a href="#top-section" className={styles["active"]}>
                        2
                    </a>
                </div>
            </section>
        </Fragment>
    );
};
