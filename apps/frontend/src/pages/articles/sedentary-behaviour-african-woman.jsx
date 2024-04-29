import styles from "./articles.module.css";
import LowIncomeSmall from "../../assets/images/low-income-sml.jpg";
import LowSocioEconomicSmall from "../../assets/images/low-socio-economic-sml.jpg";
import SedentaryBehaviourAfricanWomanLarge from "../../assets/images/sedentary-behaviour-african-woman-lg.jpg";
import ApnoeaWearableDeviceSmall from "../../assets/images/apnoea-wearable-device-sml.jpg";
import { CustomHeader } from "../../components/header";
import { Footer } from "../../components/footer";

export const SedentaryBehaviourAfricanWoman = () => {
    return (
        <div>
            <CustomHeader styles={styles} />

            <section className={styles["article-section"]}>
                <a href="/research" className={styles["previous"]}>
                    &#8249; Back to research articles
                </a>

                <div className={styles["heading-date"]}>13 January 2022</div>

                <div className={styles["article-container"]}>
                    <div className={styles["article-img-container"]}>
                        <img src={SedentaryBehaviourAfricanWomanLarge} alt="" />
                    </div>

                    <div className={styles["article-text-container"]}>
                        <h4>Investigators: A/Prof Draper, Dr Dale Rae</h4>

                        <h5>
                            <u>
                                Cross-sectional associations between mental
                                health indicators and social vulnerability, with
                                physical activity, sedentary behaviour and sleep
                                in urban African young women{" "}
                            </u>
                        </h5>

                        <p>
                            This is part of a larger multi-country study
                            entitled, Healthy Life Trajectories Initiative
                            (HeLTI) aiming to generate evidence to guide future
                            interventions in young women’s physical and mental
                            health, to establish healthier trajectories for
                            themselves and future offspring. This is
                            particularly relevant in a low-income setting, where
                            young people are exposed to societal and
                            environmental stressors (adverse childhood
                            experiences, harmful alcohol use, social
                            vulnerability) which make attaining sufficient
                            physical activity or good quality sleep difficult.
                            Other team members: Prof Norris, Dr Cook, Dr
                            Redinger, Dr Rochat, Dr Prioreschi, Dr Ware, Dr Lye.
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles["research-container"]}>
                <h5>Other studies you might like</h5>

                <div
                    className={styles["research-wrapper"]}
                    id={styles["our-business"]}
                >
                    <a href="/articles/apnoea-wearable-device">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={ApnoeaWearableDeviceSmall}
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>PI: Dr Rae</h3>

                            <p>
                                A validation study of a PPG-derived algorithm to
                                predict sleep architecture, sleep apnoea and
                                breathing rate using a wearable device{" "}
                            </p>

                            <div className={styles["research-date"]}>
                                13 Dec 2021
                            </div>
                        </div>
                    </a>

                    <a href="/articles/low-socio-economic">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={LowSocioEconomicSmall}
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>PhD candidate: Arron Correia</h3>

                            <p>
                                Investigating the relationship between sleep,
                                autonomic nervous system function and
                                psychiatric disorders in South Africans living
                                in a low socio-economic environment
                            </p>

                            <div className={styles["research-date"]}>
                                {" "}
                                11 May 2022
                            </div>
                        </div>
                    </a>

                    <a href="/articles/low-income">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={LowIncomeSmall}
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>PhD candidate: Phillipa Forshaw</h3>

                            <p>
                                Understanding the relationship between sleep and
                                cardiovascular disease in low-income South
                                African adults (PhD candidate: Philippa Forshaw){" "}
                            </p>

                            <div className={styles["research-date"]}>
                                01 May 2022
                            </div>
                        </div>
                    </a>
                </div>
            </section>
            <Footer />
        </div>
    );
};
