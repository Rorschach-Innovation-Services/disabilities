import styles from "./articles.module.css";
import TravelJetlagSmall from "../../assets/images/travel-jetlag-sml.jpg";
import AfricanOriginSmall from "../../assets/images/african-origin-sml.jpg";
import RuralSleepPatternsLarge from "../../assets/images/rural-sleep-patterns-lg.jpg";
import GutHealthSmall from "../../assets/images/gut-health-sml.jpg";
import { CustomHeader } from "../../components/header";
import { Footer } from "../../components/footer";

export const RuralSleepPatterns = () => {
    return (
        <div>
            <CustomHeader styles={styles} />

            <section className={styles["article-section"]}>
                <a href="/research" className={styles["previous"]}>
                    &#8249; Back to research articles
                </a>

                <div className={styles["heading-date"]}>12 April 2022</div>

                <div className={styles["article-container"]}>
                    <div className={styles["article-img-container"]}>
                        <img src={RuralSleepPatternsLarge} alt="" />
                    </div>

                    <div className={styles["article-text-container"]}>
                        <h4>
                        Investigators: A/Prof Gómez-Olivé, Prof von Schantz, Dr Scheuremaier, Dr Dale Rae
                        </h4>

                        <h5>
                            <u>
                                Timing, quality, and physiology of sleep in a
                                deprived rural community cohort in South Africa
                                and their relationship with HIV and
                                non-communicable diseases{" "}
                            </u>
                        </h5>

                        <p>
                            {" "}
                            The sleep habits we observe today among the general
                            population are understood to be influenced by
                            societal and environmental factors such as needing
                            to be at school or work at set times, commuting
                            time, artificial light-at-night in our cities and
                            homes, the distraction of electronic devices and
                            their associated social platforms. Looking at the
                            sleep patterns in a rural community, where not all
                            homes are electrified, for example, allows for
                            insight to pre-industrialised sleep patterns and
                            associations with HIV, obesity, hypertension and
                            diabetes.
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
                    <a href="/articles/gut-microbiota-and-cardiometabolic">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={GutHealthSmall}
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>PIs: Dr Dale Rae and Prof Dugas</h3>

                            <p>
                                Sleep timing, gut microbiota and cardiometabolic
                                risk across the Epidemiologic Transition{" "}
                            </p>

                            <div className={styles["research-date"]}>
                                09 Mar 2022
                            </div>
                        </div>
                    </a>

                    <a href="/articles/african-origins">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={AfricanOriginSmall}
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>PIs: Dr Rae and Dr O’Brien</h3>

                            <p>
                                Chronotype and sleep patterns in rural and urban
                                South African individuals of African origin
                            </p>

                            <div className={styles["research-date"]}>
                                26 Feb 2022
                            </div>
                        </div>
                    </a>

                    <a href="/articles/travel-jetlag">
                        <div className={styles["research-box"]}>
                            <div className={styles["research-image"]}>
                                <img
                                    src={TravelJetlagSmall}
                                    width="50px"
                                    height="50px"
                                />
                            </div>

                            <h3>PIs: Dr Dale Rae, A/Prof Roden</h3>

                            <p>
                                Circadian rhythms, transmeridian travel and
                                jetlag
                            </p>

                            <div className={styles["research-date"]}>
                                19 Feb 2022
                            </div>
                        </div>
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
};
