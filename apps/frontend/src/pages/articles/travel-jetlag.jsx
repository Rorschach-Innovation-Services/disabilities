import styles from "./articles.module.css";
import SedentaryBehaviourAfricanWomanSmall from "../../assets/images/sedentary-behaviour-african-woman-sml.jpg";
import ApnoeaWearableDeviceSmall from "../../assets/images/apnoea-wearable-device-sml.jpg";
import LowSocioEconomicSmall from "../../assets/images/low-socio-economic-sml.jpg";
import TravelJetlagLarge from "../../assets/images/travel-jetlag-lg.jpg";
import { CustomHeader } from "../../components/header";
import { Footer } from "../../components/footer";

export const TravelJetlag = () => {
    return (
        <div>
            <CustomHeader styles={styles} />

            <section className={styles["article-section"]}>
                <a href="/research" className={styles["previous"]}>
                    &#8249; Back to research articles
                </a>

                <div className={styles["heading-date"]}>19 February 2022</div>

                <div className={styles["article-container"]}>
                    <div className={styles["article-img-container"]}>
                        <img src={TravelJetlagLarge} alt="" />
                    </div>

                    <div className={styles["article-text-container"]}>
                        <h4>Investigators: Dr Dale Rae, A/Prof Roden</h4>

                        <h5>
                            <u>
                                Circadian rhythms, transmeridian travel and
                                jetlag{" "}
                            </u>
                        </h5>

                        <p>
                            People respond differently to jetlag when travelling
                            across time zones. For some, the symptoms associated
                            with this transient circadian desynchronization are
                            mild, for others severe, and the time taken to
                            recover varies dramatically too. We hypothesized
                            that this might be in part due to a variant in one
                            of our “clock” genes (PER3), which is associated
                            with our chronotype (i.e. preference for mornings or
                            evenings). We investigated whether this variant
                            impacts circadian resynchronization following jetlag
                            and whether it is associated with match performance,
                            incidence of illness and injury in professional
                            rugby players who undertake transmeridian travel
                            between matches. This work was conducted by PhD
                            graduate, Dr Kunorozva.
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
                    <a href="/articles/sedentary-behaviour-african-woman">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={SedentaryBehaviourAfricanWomanSmall}
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>PIs: A/Prof Draper</h3>

                            <p>
                            Cross-sectional associations between mental health indicators and social vulnerability, with physical activity, sedentary behaviour and sleep in urban African young women
                            </p>

                            <div className={styles["research-date"]}>
                                13 Jan 2022
                            </div>
                        </div>
                    </a>

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
                </div>
            </section>

            <Footer />
        </div>
    );
};
