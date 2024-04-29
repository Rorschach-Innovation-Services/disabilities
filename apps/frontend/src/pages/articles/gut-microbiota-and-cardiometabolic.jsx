import styles from "./articles.module.css";
import TravelJetlagSmall from "../../assets/images/travel-jetlag-sml.jpg";
import GutHealthLarge from "../../assets/images/gut-health-lg.jpg";
import AfricanOriginSmall from "../../assets/images/african-origin-sml.jpg";
import SedentaryBehaviourAfricanWomanSmall from "../../assets/images/sedentary-behaviour-african-woman-sml.jpg";
import { CustomHeader } from "../../components/header";
import { Footer } from "../../components/footer";

export const GutMicrobiotaAndCardiometabolic = () => {
    return (
        <div>
            <CustomHeader styles={styles} />

            <section className={styles["article-section"]}>
                <a href="/research" className={styles["previous"]}>
                    &#8249; Back to research articles
                </a>

                <div className={styles["heading-date"]}>09 March 2022</div>

                <div className={styles["article-container"]}>
                    <div className={styles["article-img-container"]}>
                        <img src={GutHealthLarge} alt="" />
                    </div>

                    <div className={styles["article-text-container"]}>
                        <h4>Investigators: Prof Dugas, Prof Lambert and Dr Dale Rae</h4>

                        <h5>
                            <u>
                                Sleep timing, gut microbiota and cardiometabolic
                                risk across the Epidemiologic Transition{" "}
                            </u>
                        </h5>

                        <p>
                            Research into our gut health is novel and currently
                            under the microscope, as evidence is emerging to
                            link a healthy gut microbiome to many aspects of our
                            overall health and well-being. From a sleep and
                            circadian rhythms perspective, when we shorten or
                            disrupt sleep, or desynchronise our circadian
                            rhythms, we may interfere with the rhythmicity of
                            the gut microbiome. We are investigating whether
                            sleep timing and circadian rhythmicity is linked to
                            changes in the gut microbiome, and if so, the affect
                            this might have on risk for obesity in adults of
                            African origin in the US, Seychelles, Jamaica, Ghana
                            and South Africa. This study is funded by the NIH
                            through PI Prof Dugas from Loyola University,
                            Chicago (US) and UCT. Other team members: Prof Luke,
                            A/Prof Crowley, Dr Reutrakul, Prof Gilbert, Prof
                            Layden, Prof Lambert, Prof Bove, Prof Forrester,
                            Prof Riesen Prof Korte, Dr Fei, Dr Choo-Kang, Dr
                            Bedu-Addo.
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
                </div>
            </section>
            <Footer />
        </div>
    );
};
